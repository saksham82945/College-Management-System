"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.submitReport = exports.getMyProject = exports.getAllProjects = exports.createProject = void 0;
const Project_1 = require("../models/Project");
const User_1 = require("../models/User");
const Teacher_1 = require("../models/Teacher");
const errors_1 = require("../utils/errors");
const project_constants_1 = require("../constants/project.constants");
/**
 * Helper function to check if user is a member of the project
 */
const checkProjectMembership = (project, userId) => {
    return project.studentIds.some((id) => id.toString() === userId.toString());
};
/**
 * Helper function to validate status transitions
 */
const isValidStatusTransition = (currentStatus, newStatus) => {
    const allowedTransitions = project_constants_1.PROJECT_CONSTANTS.ALLOWED_STATUS_TRANSITIONS[currentStatus];
    return allowedTransitions ? allowedTransitions.includes(newStatus) : false;
};
/**
 * 1. CREATE PROJECT (Student proposes a new project)
 * Authorization: STUDENT role
 * Validation: Applied via middleware
 */
const createProject = async (req, res) => {
    try {
        const { title, description, batch, domain, studentIds, mentorId } = req.body;
        const currentUserId = req.user.userId;
        // Ensure current user is included in studentIds
        if (!studentIds.includes(currentUserId)) {
            studentIds.push(currentUserId);
        }
        // Validate that all students exist
        const students = await User_1.User.find({ _id: { $in: studentIds } });
        if (students.length !== studentIds.length) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.STUDENT_NOT_FOUND, 400, 'INVALID_STUDENTS');
        }
        // Validate mentor if provided
        if (mentorId) {
            const mentor = await Teacher_1.Teacher.findOne({ userId: mentorId });
            if (!mentor) {
                throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.MENTOR_NOT_FOUND, 400, 'INVALID_MENTOR');
            }
        }
        // Check for duplicate projects (same title + batch)
        const existingProject = await Project_1.Project.findOne({ title, batch });
        if (existingProject) {
            throw new errors_1.AppError('A project with this title already exists for this batch', 400, 'DUPLICATE_PROJECT');
        }
        const project = await Project_1.Project.create({
            title,
            description,
            batch,
            domain,
            studentIds,
            mentorId,
            status: Project_1.ProjectStatus.PROPOSED,
            createdBy: currentUserId
        });
        // Populate for response
        await project.populate([
            { path: 'studentIds', select: 'fullName email' },
            { path: 'mentorId', select: 'firstName lastName' }
        ]);
        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Create Project Error:', error);
            res.status(500).json({ success: false, message: 'Failed to create project' });
        }
    }
};
exports.createProject = createProject;
/**
 * 2. GET ALL PROJECTS (Faculty "Total View")
 * Authorization: ADMIN, TEACHER roles
 * Features: Filtering, pagination, sorting
 */
const getAllProjects = async (req, res) => {
    try {
        const { batch, status, domain, page = 1, limit = project_constants_1.PROJECT_CONSTANTS.DEFAULT_PAGE_SIZE, sort = 'updatedAt', order = 'desc' } = req.query;
        const filter = {};
        if (batch)
            filter.batch = batch;
        if (status)
            filter.status = status;
        if (domain)
            filter.domain = { $in: [domain] };
        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const sortOrder = order === 'asc' ? 1 : -1;
        // Execute query with pagination
        const [projects, total] = await Promise.all([
            Project_1.Project.find(filter)
                .populate('studentIds', 'fullName email')
                .populate('mentorId', 'firstName lastName')
                .sort({ [sort]: sortOrder })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            Project_1.Project.countDocuments(filter)
        ]);
        // Calculate statistics
        const stats = await Project_1.Project.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json({
            success: true,
            data: projects,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            },
            stats: stats.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {})
        });
    }
    catch (error) {
        console.error('Get All Projects Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
};
exports.getAllProjects = getAllProjects;
/**
 * 3. GET MY PROJECT (Student views their own project)
 * Authorization: Any authenticated user (filtered by userId)
 */
const getMyProject = async (req, res) => {
    try {
        const userId = req.user.userId;
        const project = await Project_1.Project.findOne({ studentIds: userId })
            .populate('studentIds', 'fullName email')
            .populate('mentorId', 'firstName lastName')
            .populate('grading.gradedBy', 'firstName lastName');
        if (!project) {
            return res.status(404).json({
                success: false,
                message: project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND
            });
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        console.error('Get My Project Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch project' });
    }
};
exports.getMyProject = getMyProject;
/**
 * 4. SUBMIT REPORT (Student uploads final report)
 * Authorization: Project member only
 * Validation: Applied via middleware
 */
const submitReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileUrl, originalName, mimeType, size, pageCount } = req.body;
        const userId = req.user.userId;
        // Validate project exists
        const project = await Project_1.Project.findById(id);
        if (!project) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND, 404, 'NOT_FOUND');
        }
        // Authorization: Check if user is a project member
        if (!checkProjectMembership(project, userId)) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS, 403, 'FORBIDDEN');
        }
        /* Removed ALREADY_GRADED check */
        // Validate status transition
        if (project.status !== Project_1.ProjectStatus.IN_PROGRESS && project.status !== Project_1.ProjectStatus.CHANGES_REQUESTED && project.status !== Project_1.ProjectStatus.PROPOSED) {
            throw new errors_1.AppError('Project must be in progress before submission', 400, 'INVALID_STATUS');
        }
        // Update submission details
        project.submission = {
            fileUrl,
            originalName,
            mimeType,
            size,
            pageCount,
            submittedAt: new Date(),
            plagiarismScore: Math.floor(Math.random() * 20) // Mock plagiarism check (TODO: integrate real service)
        };
        project.status = Project_1.ProjectStatus.SUBMITTED;
        await project.save();
        res.json({
            success: true,
            message: 'Report submitted successfully',
            data: project
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Submit Report Error:', error);
            res.status(500).json({ success: false, message: 'Failed to submit report' });
        }
    }
};
exports.submitReport = submitReport;
/* Removed gradeProject function */
/**
 * 6. GET PROJECT BY ID (General fetch)
 * Authorization: Admin/Teacher for all, Students for their own
 */
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const userRole = req.user.role;
        const project = await Project_1.Project.findById(id)
            .populate('studentIds', 'fullName email')
            .populate('mentorId', 'firstName lastName')
            .populate('grading.gradedBy', 'firstName lastName');
        if (!project) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.PROJECT_NOT_FOUND, 404, 'NOT_FOUND');
        }
        // Authorization: Students can only view their own projects
        if (userRole === 'STUDENT' && !checkProjectMembership(project, userId)) {
            throw new errors_1.AppError(project_constants_1.ERROR_MESSAGES.UNAUTHORIZED_ACCESS, 403, 'FORBIDDEN');
        }
        res.json({ success: true, data: project });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ success: false, message: error.message, code: error.errorCode });
        }
        else {
            console.error('Get Project By ID Error:', error);
            res.status(500).json({ success: false, message: 'Failed to fetch project' });
        }
    }
};
exports.getProjectById = getProjectById;

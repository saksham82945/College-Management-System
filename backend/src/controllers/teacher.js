"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.getTeacherById = exports.getAllTeachers = exports.createTeacher = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const Teacher_1 = require("../models/Teacher");
const bcryptjs_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../utils/errors");
const createTeacher = async (req, res) => {
    // Transaction removed for standalone support
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        const { firstName, lastName, email, employeeId, department, designation, qualification, experience, joiningDate, salary, contactInfo } = req.body;
        console.log('CREATE TEACHER BODY:', JSON.stringify(req.body, null, 2));
        // 1. Create User
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }
        // Get Teacher Role
        const teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        if (!teacherRole) {
            throw new errors_1.AppError('Teacher role configuration missing', 500, 'ROLE_CONFIG_ERROR');
        }
        const passwordToUse = req.body.password || 'Teacher@123';
        const hashedPassword = await bcryptjs_1.default.hash(passwordToUse, 10);
        const user = await User_1.User.create([{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                fullName: `${firstName} ${lastName}`,
                phone: (contactInfo === null || contactInfo === void 0 ? void 0 : contactInfo.phone) || req.body.phone,
                roleAssignments: [{
                        roleId: teacherRole._id,
                        assignedAt: new Date()
                    }],
                username: email.split('@')[0],
            }]);
        // 2. Create Teacher Profile
        const teacher = await Teacher_1.Teacher.create([{
                userId: user[0]._id,
                employeeId,
                department,
                designation,
                qualification: Array.isArray(qualification) ? qualification : [qualification],
                experience: Number(experience),
                joiningDate: new Date(joiningDate),
                salary: typeof salary === 'number' || typeof salary === 'string'
                    ? { base: Number(salary), allowances: 0, deductions: 0 }
                    : salary,
                contactInfo: contactInfo || {
                    phone: req.body.phone,
                    address: req.body.address
                }
            }]);
        // await session.commitTransaction();
        res.status(201).json({
            success: true,
            data: {
                teacher: teacher[0],
                user: user[0]
            }
        });
    }
    catch (error) {
        // Manual rollback since transactions are disabled
        // If we have a user object created in this scope (from line 36), try to delete it
        // We need to check if 'user' variable is available. Since it's block scoped, we might need to move declaration up
        // However, user is defined in try block. Let's move let user; up.
        // For now, simpler: we can't easily access 'user' here due to scope. 
        // BUT, we can catch the error and do a best-effort cleanup if we can identify the user.
        // Better strategy: move `user` declaration outside try, or just use the email to cleanup.
        // Only perform rollback if the error is NOT that the user already exists
        // This prevents deleting an unrelated existing user when we try to create a duplicate
        const isEmailExistsError = error instanceof errors_1.AppError && error.errorCode === 'EMAIL_EXISTS';
        if (req.body.email && !isEmailExistsError) {
            await User_1.User.deleteOne({ email: req.body.email }).catch(err => console.error('Rollback failed', err));
        }
        // await session.abortTransaction();
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Create Teacher Error:', error);
            res.status(500).json({ message: 'Failed to create teacher' });
        }
    }
    finally {
        // session.endSession();
    }
};
exports.createTeacher = createTeacher;
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher_1.Teacher.find()
            .populate('userId', '-password')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: teachers });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teachers' });
    }
};
exports.getAllTeachers = getAllTeachers;
const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher_1.Teacher.findById(req.params.id).populate('userId', '-password');
        if (!teacher)
            throw new errors_1.AppError('Teacher not found', 404, 'NOT_FOUND');
        res.json({ success: true, data: teacher });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getTeacherById = getTeacherById;
const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const teacher = await Teacher_1.Teacher.findByIdAndUpdate(id, updates, { new: true });
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        if (updates.firstName || updates.lastName) {
            const userUpdates = {};
            if (updates.firstName)
                userUpdates.firstName = updates.firstName;
            if (updates.lastName)
                userUpdates.lastName = updates.lastName;
            await User_1.User.findByIdAndUpdate(teacher.userId, userUpdates);
        }
        res.status(200).json({ success: true, data: teacher });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update teacher', error });
    }
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher_1.Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        await User_1.User.findByIdAndDelete(teacher.userId);
        await Teacher_1.Teacher.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete teacher', error });
    }
};
exports.deleteTeacher = deleteTeacher;

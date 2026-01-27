"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function (o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentFullProfile = exports.promoteStudent = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = void 0;
const Student_1 = require("../models/Student");
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const errors_1 = require("../utils/errors");
const getAllStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 25;
        const course = req.query.course;
        const status = req.query.status;
        const skip = (page - 1) * size;
        const filter = {};
        if (course)
            filter.course = course;
        if (status)
            filter.status = status;
        const students = await Student_1.Student.find(filter)
            .populate('userId', 'email fullName phone')
            .skip(skip)
            .limit(size)
            .lean();
        const total = await Student_1.Student.countDocuments(filter);
        res.json({
            data: {
                total,
                page,
                size,
                students: students.map((s) => ({
                    id: s._id,
                    name: s.userId ? s.userId.fullName : 'N/A',
                    email: s.userId ? s.userId.email : 'N/A',
                    phone: s.userId ? s.userId.phone : 'N/A',
                    rollNo: s.rollNo,
                    course: s.course,
                    semester: s.semester,
                    section: s.section,
                    status: s.status,
                })),
            },
        });
    }
    catch (error) {
        console.error('Get All Students Error:', error);
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id)
            .populate('userId', 'email fullName phone')
            .lean();
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        res.json({
            data: {
                id: student._id,
                name: student.userId ? student.userId.fullName : 'N/A',
                email: student.userId ? student.userId.email : 'N/A',
                phone: student.userId ? student.userId.phone : 'N/A',
                rollNo: student.rollNo,
                course: student.course,
                semester: student.semester,
                section: student.section,
                dateOfBirth: student.dateOfBirth,
                guardianInfo: student.guardianInfo,
                address: student.address,
                status: student.status,
            },
        });
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
exports.getStudentById = getStudentById;
const createStudent = async (req, res) => {
    let createdUser = null;
    let createdParent = null;
    try {
        const { email, password, fullName, phone, rollNo, course, semester, section, dateOfBirth, guardianInfo, address } = req.body;
        if (!email || !password || !fullName || !rollNo) {
            throw new errors_1.AppError('Missing required fields', 400, 'MISSING_FIELDS');
        }

        // Check if user with same email already exists
        const existingUser = await User_1.User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new errors_1.AppError('Email already exists', 400, 'EMAIL_EXISTS');
        }

        // Check if student with same roll number exists
        const existingStudent = await Student_1.Student.findOne({ rollNo });
        if (existingStudent) {
            throw new errors_1.AppError('Roll number already exists', 400, 'ROLLNO_EXISTS');
        }

        // Validate guardian info
        if (!guardianInfo || !guardianInfo.fatherName || !guardianInfo.fatherPhone) {
            throw new errors_1.AppError('Guardian information (father name and phone) is required', 400, 'GUARDIAN_INFO_REQUIRED');
        }

        // 1. Create User for Student
        const hashedPassword = await (0, password_1.hashPassword)(password);
        const user = await User_1.User.create([{
            email,
            password: hashedPassword,
            fullName,
            phone,
            roles: ['STUDENT']
        }]);
        createdUser = user[0];

        // 2. Handle Parent (Create or Find)
        const parent = await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m => m.Parent.create([{
            fatherName: guardianInfo.fatherName,
            motherName: guardianInfo.motherName || '',
            fatherPhone: guardianInfo.fatherPhone,
            motherPhone: guardianInfo.motherPhone || '',
            primaryEmail: guardianInfo.primaryEmail || email,
            address: address || {},
        }]));
        createdParent = parent[0];

        // 3. Create student
        const student = await Student_1.Student.create([{
            userId: user[0]._id,
            parentId: parent[0]._id,
            rollNo,
            course,
            semester,
            section,
            dateOfBirth,
            guardianInfo: {
                fatherName: guardianInfo.fatherName,
                motherName: guardianInfo.motherName,
                fatherPhone: guardianInfo.fatherPhone
            },
            address,
            enrollmentYear: new Date().getFullYear(),
        }]);

        // Link student to parent
        await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m => m.Parent.findByIdAndUpdate(parent[0]._id, {
            $push: { children: student[0]._id }
        }));

        res.status(201).json({
            message: 'Student created successfully',
            data: {
                id: student[0]._id,
                rollNo: student[0].rollNo,
            },
        });
    }
    catch (error) {
        // Cleanup on failure
        if (createdUser) {
            await User_1.User.findByIdAndDelete(createdUser._id).catch(err => console.error('Cleanup error:', err));
        }
        if (createdParent) {
            await Promise.resolve().then(() => __importStar(require('../models/Parent.js'))).then(m =>
                m.Parent.findByIdAndDelete(createdParent._id).catch(err => console.error('Cleanup error:', err))
            );
        }

        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
                errorCode: 'DUPLICATE_ENTRY'
            });
        }
        else {
            console.error('Create Student Error:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                name: error.name,
                stack: error.stack
            });
            res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }
    finally {
        // session.endSession();
    }
};
exports.createStudent = createStudent;
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const student = await Student_1.Student.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        res.json({
            message: 'Student updated successfully',
            data: { id: student._id },
        });
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
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id);
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Soft delete
        student.status = 'inactive';
        await student.save();
        res.json({ message: 'Student deleted successfully' });
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
exports.deleteStudent = deleteStudent;
const promoteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { newCourse, newSection } = req.body;
        const student = await Student_1.Student.findById(id);
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Update student
        student.course = newCourse;
        student.section = newSection || student.section;
        await student.save();
        // In a real system, we might archive previous year's record here
        res.json({
            success: true,
            message: 'Student promoted successfully',
            data: {
                id: student._id,
                newCourse: student.course,
                newSection: student.section
            }
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error promoted' });
        }
    }
};
exports.promoteStudent = promoteStudent;
const getStudentFullProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student_1.Student.findById(id)
            .populate('userId', '-password')
            .populate('parentId')
            .lean();
        if (!student) {
            throw new errors_1.AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
        }
        // Fetch related data
        const fees = await Promise.resolve().then(() => __importStar(require('../models/StudentFee.js'))).then(m => m.StudentFee.find({ studentId: id }).populate('feeTypeId'));
        res.json({
            success: true,
            data: {
                student,
                stats: {
                    attendancePercentage: 0,
                    totalAttendance: 0,
                    pendingFees: 0, // Calculate from fees
                },
                financials: fees
            }
        });
    }
    catch (error) {
        console.error('Profile Error', error);
        res.status(500).json({ message: 'Failed to fetch full profile' });
    }
};
exports.getStudentFullProfile = getStudentFullProfile;

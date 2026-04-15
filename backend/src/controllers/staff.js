"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.getStaffById = exports.getAllStaff = exports.createStaff = void 0;

const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const Staff_1 = require("../models/Staff");
const bcryptjs_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../utils/errors");

const createStaff = async (req, res) => {
    try {
        const { firstName, lastName, email, employeeId, role, department, joiningDate, salary, contactInfo } = req.body;

        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }

        // Get Staff Role
        const staffRole = await Role_1.Role.findOne({ name: 'STAFF' });
        if (!staffRole) {
            throw new errors_1.AppError('Staff role configuration missing', 500, 'ROLE_CONFIG_ERROR');
        }

        const passwordToUse = req.body.password || 'Staff@123';
        const hashedPassword = await bcryptjs_1.default.hash(passwordToUse, 10);

        const user = await User_1.User.create([{
            firstName,
            lastName,
            email,
            password: hashedPassword,
            fullName: `${firstName} ${lastName}`,
            phone: contactInfo?.phone || req.body.phone,
            roleAssignments: [{
                roleId: staffRole._id,
                assignedAt: new Date()
            }],
            username: email.split('@')[0],
        }]);

        // Create Staff Profile
        const staff = await Staff_1.Staff.create([{
            userId: user[0]._id,
            employeeId,
            role,
            department,
            joiningDate: new Date(joiningDate),
            salary: typeof salary === 'number' || typeof salary === 'string'
                ? { base: Number(salary), allowances: 0, deductions: 0 }
                : salary,
            contactInfo: contactInfo || {
                phone: req.body.phone,
                address: req.body.address
            }
        }]);

        res.status(201).json({
            success: true,
            data: {
                staff: staff[0],
                user: user[0]
            }
        });
    } catch (error) {
        const isEmailExistsError = error instanceof errors_1.AppError && error.errorCode === 'EMAIL_EXISTS';
        if (req.body.email && !isEmailExistsError) {
            await User_1.User.deleteOne({ email: req.body.email }).catch(err => console.error('Rollback failed', err));
        }

        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Create Staff Error:', error);
            res.status(500).json({ message: 'Failed to create staff' });
        }
    }
};
exports.createStaff = createStaff;

const getAllStaff = async (req, res) => {
    try {
        const staff = await Staff_1.Staff.find()
            .populate('userId', '-password')
            .sort({ createdAt: -1 });
        res.json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch staff' });
    }
};
exports.getAllStaff = getAllStaff;

const getStaffById = async (req, res) => {
    try {
        const staff = await Staff_1.Staff.findById(req.params.id).populate('userId', '-password');
        if (!staff) throw new errors_1.AppError('Staff not found', 404, 'NOT_FOUND');
        res.json({ success: true, data: staff });
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getStaffById = getStaffById;

const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const staff = await Staff_1.Staff.findByIdAndUpdate(id, updates, { new: true });
        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        if (updates.firstName || updates.lastName) {
            const userUpdates = {};
            if (updates.firstName) userUpdates.firstName = updates.firstName;
            if (updates.lastName) userUpdates.lastName = updates.lastName;
            await User_1.User.findByIdAndUpdate(staff.userId, userUpdates);
        }

        res.status(200).json({ success: true, data: staff });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update staff', error });
    }
};
exports.updateStaff = updateStaff;

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff_1.Staff.findById(id);

        if (!staff) {
            return res.status(404).json({ success: false, message: 'Staff not found' });
        }

        await User_1.User.findByIdAndDelete(staff.userId);
        await Staff_1.Staff.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete staff', error });
    }
};
exports.deleteStaff = deleteStaff;

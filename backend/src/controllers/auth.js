"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.authRefresh = exports.authLogin = exports.authRegister = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authRegister = async (req, res) => {
    try {
        const { email, password, fullName, phone, roleName = 'ADMIN' } = req.body;
        // Disallow registration of unrecognized roles
        const allowedRoles = ['ADMIN', 'STUDENT'];
        if (!allowedRoles.includes(roleName)) {
            throw new errors_1.AppError('Only Administrator and Student registrations are allowed', 403, 'ROLE_RESTRICTED');
        }
        // Validate email format
        const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new errors_1.AppError('Invalid email format', 400, 'INVALID_EMAIL');
        }
        // Check if user exists
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.AppError('User already exists', 400, 'USER_EXISTS');
        }
        // Hash password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Get role
        let role = await Role_1.Role.findOne({ name: roleName });
        if (!role) {
            throw new errors_1.AppError('Role not found', 400, 'ROLE_NOT_FOUND');
        }
        // Create user
        const user = await User_1.User.create({
            email,
            password: hashedPassword,
            fullName,
            phone,
            roleAssignments: [
                {
                    roleId: role._id,
                    assignedAt: new Date(),
                },
            ],
        });
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles: [roleName],
        });
        res.status(201).json({
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
                tokens,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else if (error.code === 11000) {
            res.status(400).json({ message: 'User already exists', errorCode: 'USER_EXISTS' });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authRegister = authRegister;
const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        // Find user
        console.log(`[DEBUG] Login request for email: '${email}'`);
        const user = await User_1.User.findOne({ email }).populate({
            path: 'roleAssignments.roleId',
            model: 'Role',
        });
        if (!user) {
            console.log(`[DEBUG] User NOT found in DB for email: '${email}'`);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        console.log(`[DEBUG] User found: ${user.email}, Role count: ${user.roleAssignments.length}`);
        const isMatch = await (0, password_1.comparePassword)(password, user.password);
        console.log(`[DEBUG] Password comparison result: ${isMatch}`);
        if (!isMatch) {
            console.log(`[DEBUG] Password mismatch for: ${email}`);
            console.log(`[DEBUG] Provided password length: ${password.length}`);
            console.log(`[DEBUG] Stored hash length: ${user.password.length}`);
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        // Extract roles
        const roles = user.roleAssignments.map((ra) => ra.roleId.name);
        // Validate user has at least one recognized role
        const allowedRoles = ['ADMIN', 'TEACHER', 'STUDENT'];
        const validRoles = roles.filter(r => allowedRoles.includes(r));
        if (validRoles.length === 0) {
            console.log(`[SECURITY] Blocked login for user with no valid roles: ${email} (roles: ${roles.join(', ')})`);
            return res.status(403).json({
                success: false,
                message: 'Access denied. No valid role assigned to this account.',
            });
        }
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles,
        });
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        res.json({
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    roles,
                },
                tokens,
            },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authLogin = authLogin;
const authRefresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new errors_1.AppError('Refresh token is required', 400, 'REFRESH_TOKEN_REQUIRED');
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            throw new errors_1.AppError('Invalid refresh token', 401, 'INVALID_REFRESH_TOKEN');
        }
        const user = await User_1.User.findById(decoded.userId).populate('roleAssignments.roleId');
        if (!user) {
            throw new errors_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }
        const roles = user.roleAssignments.map((ra) => ra.roleId.name);
        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles,
        });
        res.json({
            message: 'Token refreshed successfully',
            data: { tokens },
        });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authRefresh = authRefresh;
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Email and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account found with this email address' });
        }
        const hashedPassword = await (0, password_1.hashPassword)(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.json({ success: true, message: 'Password has been reset successfully' });
    }
    catch (error) {
        console.error('Reset Password Error:', error);
        res.status(500).json({ success: false, message: 'Failed to reset password' });
    }
};
exports.resetPassword = resetPassword;

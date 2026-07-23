"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePreferences = exports.resetPassword = exports.authRefresh = exports.authLogin = exports.authRegister = void 0;
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");

const authRegister = async (req, res) => {
    try {
        const { email, password, fullName, phone, roleName = 'ADMIN' } = req.body;

        // Validate required fields
        if (!email || !password || !fullName) {
            throw new errors_1.AppError('Email, password, and full name are required', 400, 'MISSING_FIELDS');
        }

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

        // Validate password strength (minimum 8 chars)
        if (password.length < 8) {
            throw new errors_1.AppError('Password must be at least 8 characters long', 400, 'WEAK_PASSWORD');
        }

        // Check if user already exists
        const existingUser = await User_1.User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new errors_1.AppError('User already exists', 400, 'USER_EXISTS');
        }

        // Hash password
        const hashedPassword = await (0, password_1.hashPassword)(password);

        // Get role
        const role = await Role_1.Role.findOne({ name: roleName });
        if (!role) {
            throw new errors_1.AppError('Role not found. Please ensure the system is initialized.', 400, 'ROLE_NOT_FOUND');
        }

        // Determine tenant ID
        let tenantIdToUse;
        const { tenantStorage } = require("../utils/tenantContext");

        if (roleName === 'ADMIN') {
            let { organizationName, subdomain } = req.body;
            if (!organizationName || !subdomain) {
                if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
                    organizationName = organizationName || 'Test College';
                    subdomain = subdomain || 'test-' + Math.random().toString(36).substring(7);
                } else {
                    throw new errors_1.AppError('Organization name and subdomain are required for Administrator registration', 400, 'ORGANIZATION_REQUIRED');
                }
            }

            const Organization_1 = require("../models/Organization");
            const existingOrg = await Organization_1.Organization.findOne({ subdomain: subdomain.toLowerCase() });
            if (existingOrg) {
                throw new errors_1.AppError('Subdomain already in use', 400, 'SUBDOMAIN_EXISTS');
            }

            const org = await Organization_1.Organization.create({
                name: organizationName,
                subdomain: subdomain.toLowerCase(),
                status: 'trial'
            });
            tenantIdToUse = org._id;
        } else {
            const store = tenantStorage.getStore();
            if (!store || !store.tenantId) {
                throw new errors_1.AppError('Registration must occur within a valid college context subdomain', 400, 'NO_TENANT_CONTEXT');
            }
            tenantIdToUse = store.tenantId;
        }

        // Create user scoped inside the tenant context
        let user;
        await tenantStorage.run({ tenantId: tenantIdToUse }, async () => {
            user = await User_1.User.create({
                email: email.toLowerCase(),
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
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        } else if (error.code === 11000) {
            res.status(400).json({ message: 'User already exists', errorCode: 'USER_EXISTS' });
        } else {
            console.error('[Auth] Register error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.authRegister = authRegister;

const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find user — NOTE: We use a generic error message to prevent user enumeration
        const user = await User_1.User.findOne({ email: email.toLowerCase() }).populate({
            path: 'roleAssignments.roleId',
            model: 'Role',
        });

        if (!user) {
            // Use same error message as wrong password to prevent user enumeration
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await (0, password_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Extract and validate roles
        const roles = user.roleAssignments
            .filter(ra => ra.roleId && ra.roleId.name)
            .map((ra) => ra.roleId.name);

        const allowedRoles = ['ADMIN', 'TEACHER', 'STUDENT'];
        const validRoles = roles.filter(r => allowedRoles.includes(r));

        if (validRoles.length === 0) {
            console.warn(`[SECURITY] Login blocked for user with no valid roles: ${email}`);
            return res.status(403).json({
                success: false,
                message: 'Access denied. No valid role assigned to this account.',
            });
        }

        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles: validRoles,
        });

        // Update last login timestamp
        user.lastLogin = new Date();
        await user.save();

        res.json({
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    roles: validRoles,
                },
                tokens,
            },
        });
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        } else {
            console.error('[Auth] Login error:', error.message);
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
            throw new errors_1.AppError('Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN');
        }

        const user = await User_1.User.findById(decoded.userId).populate('roleAssignments.roleId');
        if (!user) {
            throw new errors_1.AppError('User not found', 404, 'USER_NOT_FOUND');
        }

        if (user.status !== 'active') {
            throw new errors_1.AppError('Account is inactive or suspended', 403, 'ACCOUNT_INACTIVE');
        }

        const roles = user.roleAssignments
            .filter(ra => ra.roleId && ra.roleId.name)
            .map((ra) => ra.roleId.name);

        const tokens = (0, jwt_1.generateTokens)({
            userId: user._id.toString(),
            email: user.email,
            roles,
        });

        res.json({
            message: 'Token refreshed successfully',
            data: { tokens },
        });
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        } else {
            console.error('[Auth] Refresh error:', error.message);
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

        // Enforce minimum password strength
        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
        }

        const user = await User_1.User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Deliberately vague to prevent user enumeration
            return res.status(200).json({
                success: true,
                message: 'If an account exists with this email, the password has been reset.',
            });
        }

        const hashedPassword = await (0, password_1.hashPassword)(newPassword);
        user.password = hashedPassword;
        await user.save();

        console.info(`[Auth] Password reset completed for: ${email}`);

        res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('[Auth] Reset password error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to reset password' });
    }
};
exports.resetPassword = resetPassword;

const updatePreferences = async (req, res) => {
    try {
        const userId = req.user?.id || req.user?.userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const { phone, emailNotifications, smsNotifications } = req.body;

        const user = await User_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (phone !== undefined) user.phone = phone;
        
        if (user.preferences) {
            if (emailNotifications !== undefined) user.preferences.emailNotifications = emailNotifications;
            if (smsNotifications !== undefined) user.preferences.smsNotifications = smsNotifications;
        } else {
            user.preferences = {
                emailNotifications: emailNotifications !== undefined ? emailNotifications : true,
                smsNotifications: smsNotifications !== undefined ? smsNotifications : false
            };
        }

        await user.save();

        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: {
                phone: user.phone,
                preferences: user.preferences
            }
        });
    } catch (error) {
        console.error('[Auth] Update preferences error:', error.message);
        res.status(500).json({ success: false, message: 'Failed to update preferences' });
    }
};
exports.updatePreferences = updatePreferences;

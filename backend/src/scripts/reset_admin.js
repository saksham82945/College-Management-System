"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const bcryptjs_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const resetAdmin = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const email = 'admin@college.com';
        const password = 'admin123';
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Ensure Admin Role exists
        let adminRole = await Role_1.Role.findOne({ name: 'ADMIN' });
        if (!adminRole) {
            console.log('Admin role not found, creating it...');
            adminRole = await Role_1.Role.create({
                name: 'ADMIN',
                permissions: ['ALL_ACCESS']
            });
        }
        let user = await User_1.User.findOne({ email });
        if (user) {
            console.log('Admin user found. Updating password...');
            user.password = hashedPassword;
            user.fullName = 'System Admin'; // Ensure name is correct
            // Ensure role is assigned
            const hasRole = user.roleAssignments.some((ra) => ra.roleId.toString() === adminRole._id.toString());
            if (!hasRole) {
                user.roleAssignments.push({
                    roleId: adminRole._id,
                    assignedAt: new Date()
                });
            }
            // Ensure status is active
            user.status = 'active';
            await user.save();
            console.log('Admin password updated successfully.');
        }
        else {
            console.log('Admin user NOT found. Creating new admin...');
            await User_1.User.create({
                email,
                password: hashedPassword,
                fullName: 'System Admin',
                phone: '0000000000',
                roleAssignments: [{
                        roleId: adminRole._id,
                        assignedAt: new Date()
                    }],
                status: 'active'
            });
            console.log('Admin user created successfully.');
        }
        console.log('=================================');
        console.log('CREDENTIALS VERIFIED');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('=================================');
        process.exit(0);
    }
    catch (error) {
        console.error('Reset failed:', error);
        process.exit(1);
    }
};
resetAdmin();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const repairRoles = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const roles = await Role_1.Role.find();
        const roleMap = roles.reduce((acc, r) => {
            acc[r.name] = r._id;
            return acc;
        }, {});
        console.log('Role IDs:', roleMap);
        const users = await User_1.User.find();
        for (const user of users) {
            let roleName = 'STUDENT'; // Default
            if (user.email.includes('admin'))
                roleName = 'ADMIN';
            else if (user.email.includes('teacher') || user.email.includes('professor') || user.email.endsWith('@college.edu'))
                roleName = 'TEACHER';
            else if (user.email.includes('student'))
                roleName = 'STUDENT';
            const newRoleId = roleMap[roleName];
            if (newRoleId) {
                user.roleAssignments = [{
                        roleId: newRoleId,
                        assignedAt: new Date()
                    }];
                await user.save();
                console.log(`Updated ${user.email} -> ${roleName}`);
            }
            else {
                console.log(`Skipping ${user.email} (Role ${roleName} not found)`);
            }
        }
        console.log('Role repair complete.');
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
repairRoles();

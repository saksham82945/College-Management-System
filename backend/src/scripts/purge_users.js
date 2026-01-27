"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const purgeData = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB');
        // Find role IDs for STUDENT and TEACHER
        const studentRole = await Role_1.Role.findOne({ name: 'STUDENT' });
        const teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        const rolesToDelete = [];
        if (studentRole)
            rolesToDelete.push(studentRole._id);
        if (teacherRole)
            rolesToDelete.push(teacherRole._id);
        if (rolesToDelete.length > 0) {
            // Delete all users whose primary role or any assigned role is STUDENT or TEACHER
            // Note: roleAssignments is an array of objects with roleId
            const result = await User_1.User.deleteMany({
                'roleAssignments.roleId': { $in: rolesToDelete }
            });
            console.log(`✓ Deleted ${result.deletedCount} users with Student/Teacher roles.`);
        }
        else {
            console.log('No Student or Teacher roles found in DB.');
        }
        // Also delete any users with these emails specifically just in case
        const emailPurge = await User_1.User.deleteMany({
            email: { $in: ['student@college.com', 'teacher@college.com'] }
        });
        console.log(`✓ Purged ${emailPurge.deletedCount} specific test emails.`);
        // Optionally delete the roles themselves if you want them totally gone from the system
        // But seed.ts usually re-creates them. Let's keep them for structural integrity but empty.
        console.log('Purge completed successfully.');
        process.exit(0);
    }
    catch (error) {
        console.error('Purge failed:', error);
        process.exit(1);
    }
};
purgeData();

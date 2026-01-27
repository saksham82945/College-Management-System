"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const checkStudent = async () => {
    var _a, _b;
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB\n');
        const email = 'student@college.com';
        const user = await User_1.User.findOne({ email });
        if (!user) {
            console.log('❌ Student user NOT found!');
            process.exit(1);
        }
        console.log('✓ Student user found:');
        console.log(`  Email: ${user.email}`);
        console.log(`  Name: ${user.fullName}`);
        console.log(`  Password hash length: ${((_a = user.password) === null || _a === void 0 ? void 0 : _a.length) || 0}`);
        console.log(`  Role assignments: ${((_b = user.roleAssignments) === null || _b === void 0 ? void 0 : _b.length) || 0}`);
        // Check roles
        for (const ra of user.roleAssignments) {
            const role = await Role_1.Role.findById(ra.roleId);
            console.log(`  Role: ${(role === null || role === void 0 ? void 0 : role.name) || 'Unknown'}`);
        }
        console.log('\n✓ Everything looks good! Try logging in with:');
        console.log(`  Email: student@college.com`);
        console.log(`  Password: student123`);
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};
checkStudent();

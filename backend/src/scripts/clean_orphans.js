"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Teacher_1 = require("../models/Teacher");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
// Force schema registration
try {
    mongoose_1.default.model('User');
}
catch (_a) {
    // If not registered, strict import should have handled it, but let's be safe
    require('../models/User');
}
const cleanOrphans = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const teachers = await Teacher_1.Teacher.find().populate('userId');
        console.log(`Found ${teachers.length} teachers.`);
        let deletedCount = 0;
        for (const teacher of teachers) {
            if (!teacher.userId) {
                console.log(`❌ Found Orphan Teacher (No User): ID ${teacher._id} / EmpID ${teacher.employeeId}`);
                await Teacher_1.Teacher.findByIdAndDelete(teacher._id);
                deletedCount++;
                console.log('   -> Deleted.');
            }
            else {
                console.log(`✅ Valid Teacher: ${teacher.userId.email}`);
            }
        }
        console.log(`Cleanup Complete. Deleted ${deletedCount} orphan records.`);
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
cleanOrphans();

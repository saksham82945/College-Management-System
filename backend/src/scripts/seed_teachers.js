"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Teacher_1 = require("../models/Teacher");
const Role_1 = require("../models/Role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const teachers = [
    {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        email: 'rajesh.kumar@college.edu',
        password: 'Password@123',
        department: 'Computer Science',
        designation: 'Senior Professor',
        qualification: ['Ph.D. in AI', 'M.Tech in CS'],
        experience: 15,
        employeeId: 'TCH-001',
        phone: '9876543210',
        joiningDate: '2015-06-15',
        address: {
            street: '123, Tech Park Road',
            city: 'Bangalore',
            state: 'Karnataka',
            pinCode: '560001',
            country: 'India'
        }
    },
    {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@college.edu',
        password: 'Password@123',
        department: 'Physics',
        designation: 'Associate Professor',
        qualification: ['Ph.D. in Quantum Physics', 'M.Sc Physics'],
        experience: 8,
        employeeId: 'TCH-002',
        phone: '9876543211',
        joiningDate: '2019-08-20',
        address: {
            street: '45, Science City',
            city: 'Mumbai',
            state: 'Maharashtra',
            pinCode: '400001',
            country: 'India'
        }
    },
    {
        firstName: 'Amit',
        lastName: 'Patel',
        email: 'amit.patel@college.edu',
        password: 'Password@123',
        department: 'Mathematics',
        designation: 'Assistant Professor',
        qualification: ['M.Sc Mathematics', 'B.Ed'],
        experience: 5,
        employeeId: 'TCH-003',
        phone: '9876543212',
        joiningDate: '2021-01-10',
        address: {
            street: '78, Education Hub',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pinCode: '380001',
            country: 'India'
        }
    }
];
const seedTeachers = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        // Ensure Teacher Role exists
        let teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        if (!teacherRole) {
            console.log('Teacher role not found, creating it...');
            teacherRole = await Role_1.Role.create({
                name: 'TEACHER',
                permissions: ['VIEW_DASHBOARD', 'VIEW_CLASSES', 'MARK_ATTENDANCE']
            });
        }
        else {
            console.log('Teacher role exists.');
        }
        // Drop legacy index if exists
        try {
            await Teacher_1.Teacher.collection.dropIndex('employeeNo_1');
            console.log('Dropped legacy index employeeNo_1');
        }
        catch (e) {
            // Ignore if index not found
            console.log('Legacy index employeeNo_1 not found or already dropped.');
        }
        for (const t of teachers) {
            console.log(`Processing ${t.email}...`);
            let user = await User_1.User.findOne({ email: t.email });
            if (!user) {
                console.log('Creating user because not found...');
                const hashedPassword = await bcryptjs_1.default.hash(t.password, 10);
                // Create User
                user = await User_1.User.create({
                    fullName: `${t.firstName} ${t.lastName}`,
                    email: t.email,
                    password: hashedPassword,
                    phone: t.phone,
                    roleAssignments: [{
                        roleId: teacherRole._id,
                        assignedAt: new Date()
                    }],
                    status: 'active'
                });
                console.log(`Created user: ${t.firstName} ${t.lastName}`);
            }
            else {
                console.log(`User ${t.email} already exists.`);
            }
            // Check and Create Teacher Profile
            const existingTeacher = await Teacher_1.Teacher.findOne({ userId: user._id });
            if (!existingTeacher) {
                console.log('Creating teacher profile because not found...');
                try {
                    await Teacher_1.Teacher.create({
                        userId: user._id,
                        employeeId: t.employeeId,
                        department: t.department,
                        designation: t.designation,
                        qualification: t.qualification,
                        experience: t.experience,
                        joiningDate: new Date(t.joiningDate),
                        salary: {
                            base: 50000,
                            allowances: 0,
                            deductions: 0
                        },
                        contactInfo: {
                            phone: t.phone,
                            address: `${t.address.street}, ${t.address.city}, ${t.address.state}, ${t.address.country}`
                        },
                        status: 'active'
                    });
                    console.log(`Created teacher profile for: ${t.firstName} ${t.lastName}`);
                }
                catch (teacherError) {
                    console.log(`FAILED to create teacher profile for ${t.email}!`);
                    console.log('Teacher Error Message:', teacherError.message);
                    if (teacherError.errors) {
                        console.log('Validation Errors:', JSON.stringify(teacherError.errors, null, 2));
                    }
                    throw teacherError;
                }
            }
            else {
                console.log(`Teacher profile for ${t.firstName} ${t.lastName} already exists.`);
            }
        }
        console.log('Seeding completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.log('FATAL Seeding Error:', error.message);
        console.log('Stack:', error.stack);
        process.exit(1);
    }
};
seedTeachers();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const password_1 = require("../utils/password");
const seed = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB');
        // Seed Roles
        const roles = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
        const roleDocs = [];
        for (const name of roles) {
            let role = await Role_1.Role.findOne({ name });
            if (!role) {
                role = await Role_1.Role.create({ name, description: `Default ${name} role` });
                console.log(`Created role: ${name}`);
            }
            else {
                console.log(`Role exists: ${name}`);
            }
            roleDocs.push(role);
        }
        // Test Users Data - Only Admin
        const testUsers = [
            {
                email: 'admin@college.com',
                password: 'admin123',
                fullName: 'Admin User',
                role: 'ADMIN'
            },
            {
                email: 'teacher@college.com',
                password: 'teacher123',
                fullName: 'John Teacher',
                role: 'TEACHER'
            },
            {
                email: 'student@college.com',
                password: 'student123',
                fullName: 'Jane Student',
                role: 'STUDENT'
            }
        ];
        console.log('\n========================================');
        console.log('CREATING TEST USERS');
        console.log('========================================\n');
        for (const userData of testUsers) {
            let user = await User_1.User.findOne({ email: userData.email });
            const userRole = roleDocs.find(r => r.name === userData.role);
            if (!user) {
                const hashedPassword = await (0, password_1.hashPassword)(userData.password);
                user = await User_1.User.create({
                    email: userData.email,
                    password: hashedPassword,
                    fullName: userData.fullName,
                    roleAssignments: [{ roleId: userRole === null || userRole === void 0 ? void 0 : userRole._id, assignedAt: new Date() }],
                });

                if (userData.role === 'STUDENT') {
                    const Student_1 = require("../models/Student");
                    const existingStudent = await Student_1.Student.findOne({ userId: user._id });
                    if (!existingStudent) {
                        await Student_1.Student.create({
                            userId: user._id,
                            rollNo: 'TEST-001',
                            course: 'B.Tech',
                            semester: '1st',
                            section: 'A',
                            enrollmentYear: 2024
                        });
                        console.log(`✓ Created Student Profile for: ${user.email}`);
                    }
                }

                console.log(`✓ Created ${userData.role}:`);
            }
            else {
                // Update existing user's password
                const hashedPassword = await (0, password_1.hashPassword)(userData.password);
                user.password = hashedPassword;
                // Ensure role is assigned
                const hasRole = user.roleAssignments.some((ra) => ra.roleId.toString() === (userRole === null || userRole === void 0 ? void 0 : userRole._id.toString()));
                if (!hasRole && userRole) {
                    user.roleAssignments.push({ roleId: userRole._id, assignedAt: new Date() });
                }
                await user.save();

                if (userData.role === 'STUDENT') {
                    const Student_1 = require("../models/Student");
                    const existingStudent = await Student_1.Student.findOne({ userId: user._id });
                    if (!existingStudent) {
                        await Student_1.Student.create({
                            userId: user._id,
                            rollNo: 'TEST-001',
                            course: 'B.Tech',
                            semester: '1st',
                            section: 'A',
                            enrollmentYear: 2024
                        });
                        console.log(`✓ Created Student Profile for: ${user.email}`);
                    }
                }

                console.log(`✓ Updated ${userData.role}:`);
            }
            console.log(`  Email: ${userData.email}`);
            console.log(`  Password: ${userData.password}`);
            console.log('');
        }
        console.log('========================================');
        console.log('SEEDING COMPLETED SUCCESSFULLY');
        console.log('========================================\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};
seed();

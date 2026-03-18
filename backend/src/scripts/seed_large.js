"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Staff_1 = require("../models/Staff");
const password_1 = require("../utils/password");

const names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ayaan", "Krishna", "Ishaan", "Shaurya"];
const lastnames = ["Sharma", "Patel", "Singh", "Kumar", "Das", "Kaur", "Gupta", "Verma", "Yadav", "Chauhan"];

const startSeeding = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB');

        // Fetch Roles
        const adminRole = await Role_1.Role.findOne({ name: 'ADMIN' });
        const studentRole = await Role_1.Role.findOne({ name: 'STUDENT' });
        const teacherRole = await Role_1.Role.findOne({ name: 'TEACHER' });
        const staffRole = await Role_1.Role.findOne({ name: 'STAFF' });
        
        const hashedPassword = await (0, password_1.hashPassword)("password123");

        console.log("Generating 5 Students...");
        for (let i = 1; i <= 5; i++) {
            const fname = names[i % names.length];
            const lname = lastnames[i % lastnames.length];
            const email = `student${i}@college.com`;
            
            let user = await User_1.User.findOne({ email });
            if (!user) {
                user = await User_1.User.create({
                    email,
                    password: hashedPassword,
                    fullName: `${fname} ${lname}`,
                    roleAssignments: [{ roleId: studentRole._id, assignedAt: new Date() }],
                    status: 'active'
                });
                
                await Student_1.Student.create({
                    userId: user._id,
                    rollNo: `STU-2024-${100+i}`,
                    course: 'B.Tech',
                    semester: '1st',
                    section: 'A',
                    enrollmentYear: 2024
                });
                console.log(`Created Student: ${email}`);
            }
        }

        console.log("Generating 5 Teachers...");
        for (let i = 1; i <= 5; i++) {
            const fname = names[(i+5) % names.length];
            const lname = lastnames[(i+5) % lastnames.length];
            const email = `teacher${i}@college.com`;
            
            let user = await User_1.User.findOne({ email });
            if (!user) {
                user = await User_1.User.create({
                    email,
                    password: hashedPassword,
                    fullName: `${fname} ${lname}`,
                    roleAssignments: [{ roleId: teacherRole._id, assignedAt: new Date() }],
                    status: 'active'
                });

                await Teacher_1.Teacher.create({
                    userId: user._id,
                    employeeId: `TCH-2024-${100+i}`,
                    department: 'Computer Science',
                    designation: 'Assistant Professor',
                    qualification: ["M.Tech", "Ph.D"],
                    experience: 5,
                    joiningDate: new Date(),
                    salary: { base: 60000, allowances: 5000, deductions: 2000 },
                    status: 'active'
                });
                console.log(`Created Teacher: ${email}`);
            }
        }

        const staffRoles = ['Librarian', 'Accountant', 'Admin', 'Security', 'Maintenance'];
        console.log("Generating 5 Staff...");
        for (let i = 1; i <= 5; i++) {
            const fname = names[(i+2) % names.length];
            const lname = lastnames[(i+7) % lastnames.length];
            const email = `staff${i}@college.com`;
            
            let user = await User_1.User.findOne({ email });
            if (!user) {
                user = await User_1.User.create({
                    email,
                    password: hashedPassword,
                    fullName: `${fname} ${lname}`,
                    roleAssignments: [{ roleId: staffRole._id, assignedAt: new Date() }],
                    status: 'active'
                });

                await Staff_1.Staff.create({
                    userId: user._id,
                    employeeId: `STF-2024-${100+i}`,
                    role: staffRoles[i-1],
                    department: 'Administration',
                    joiningDate: new Date(),
                    salary: { base: 30000, allowances: 2000, deductions: 1000 },
                    status: 'active'
                });
                console.log(`Created Staff: ${email}`);
            }
        }

        console.log("Done seeding large data payload!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
startSeeding();

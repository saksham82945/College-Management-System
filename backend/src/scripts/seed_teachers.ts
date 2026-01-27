
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { Role } from '../models/Role';
import bcrypt from 'bcryptjs';

dotenv.config();

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
            zipCode: '560001',
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
            zipCode: '400001',
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
            zipCode: '380001',
            country: 'India'
        }
    }
];

const seedTeachers = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Ensure Teacher Role exists
        let teacherRole = await Role.findOne({ name: 'TEACHER' });
        if (!teacherRole) {
            console.log('Teacher role not found, creating it...');
            teacherRole = await Role.create({
                name: 'TEACHER',
                permissions: ['VIEW_DASHBOARD', 'VIEW_CLASSES', 'MARK_ATTENDANCE']
            });
        } else {
            console.log('Teacher role exists.');
        }

        // Drop legacy index if exists
        try {
            await Teacher.collection.dropIndex('employeeNo_1');
            console.log('Dropped legacy index employeeNo_1');
        } catch (e) {
            // Ignore if index not found
            console.log('Legacy index employeeNo_1 not found or already dropped.');
        }

        for (const t of teachers) {
            console.log(`Processing ${t.email}...`);
            let user = await User.findOne({ email: t.email });

            if (!user) {
                console.log('Creating user because not found...');
                const hashedPassword = await bcrypt.hash(t.password, 10);
                // Create User
                user = await User.create({
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
            } else {
                console.log(`User ${t.email} already exists.`);
            }

            // Check and Create Teacher Profile
            const existingTeacher = await Teacher.findOne({ userId: user._id });
            if (!existingTeacher) {
                console.log('Creating teacher profile because not found...');
                try {
                    await Teacher.create({
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
                } catch (teacherError: any) {
                    console.log(`FAILED to create teacher profile for ${t.email}!`);
                    console.log('Teacher Error Message:', teacherError.message);
                    if (teacherError.errors) {
                        console.log('Validation Errors:', JSON.stringify(teacherError.errors, null, 2));
                    }
                    throw teacherError;
                }
            } else {
                console.log(`Teacher profile for ${t.firstName} ${t.lastName} already exists.`);
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error: any) {
        console.log('FATAL Seeding Error:', error.message);
        console.log('Stack:', error.stack);
        process.exit(1);
    }
};

seedTeachers();

import mongoose from 'mongoose';
import { config } from '../config/index';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';
import { hashPassword } from '../utils/password';

const teachers = [
    {
        firstName: "Rajesh",
        lastName: "Kumar",
        email: "rajesh.kumar@college.edu",
        department: "Computer Science",
        designation: "Head of Department",
        qualification: "Ph.D. in AI",
        experience: 15,
        salary: 150000,
        joiningDate: "2010-06-15",
        phone: "9876543210"
    },
    {
        firstName: "Sneha",
        lastName: "Gupta",
        email: "sneha.gupta@college.edu",
        department: "Computer Science",
        designation: "Assistant Professor",
        qualification: "M.Tech in Data Science",
        experience: 5,
        salary: 80000,
        joiningDate: "2019-08-01",
        phone: "9876543211"
    },
    {
        firstName: "Amit",
        lastName: "Sharma",
        email: "amit.sharma@college.edu",
        department: "Mathematics",
        designation: "Associate Professor",
        qualification: "Ph.D. in Applied Mathematics",
        experience: 12,
        salary: 120000,
        joiningDate: "2012-07-20",
        phone: "9876543212"
    },
    {
        firstName: "Priya",
        lastName: "Singh",
        email: "priya.singh@college.edu",
        department: "Physics",
        designation: "Lecturer",
        qualification: "M.Sc. Physics",
        experience: 3,
        salary: 60000,
        joiningDate: "2021-09-10",
        phone: "9876543213"
    },
    {
        firstName: "Vikram",
        lastName: "Malhotra",
        email: "vikram.malhotra@college.edu",
        department: "Business Administration",
        designation: "Professor",
        qualification: "MBA, Ph.D. in Finance",
        experience: 18,
        salary: 180000,
        joiningDate: "2008-05-05",
        phone: "9876543214"
    }
];

const seedTeachers = async () => {
    try {
        await mongoose.connect(config.mongodb.uri);
        console.log('Connected to MongoDB');

        const defaultPassword = await hashPassword('Teacher@123');

        for (const t of teachers) {
            // Check if user exists
            let user = await User.findOne({ email: t.email });

            if (!user) {
                user = await User.create({
                    firstName: t.firstName,
                    lastName: t.lastName,
                    email: t.email,
                    password: defaultPassword,
                    roles: ['TEACHER'], // Using simple string array as per your auth flow
                    username: t.email.split('@')[0]
                });
                console.log(`Created User: ${t.firstName} ${t.lastName}`);
            }

            // Check if teacher profile exists
            let teacher = await Teacher.findOne({ userId: user._id });

            if (!teacher) {
                teacher = await Teacher.create({
                    userId: user._id,
                    employeeId: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
                    department: t.department,
                    designation: t.designation,
                    qualification: t.qualification,
                    experience: t.experience,
                    joiningDate: new Date(t.joiningDate),
                    salary: {
                        basic: t.salary * 0.6,
                        allowances: t.salary * 0.4
                    },
                    contactInfo: {
                        phone: t.phone,
                        address: "Campus Quarters"
                    },
                    status: 'active'
                });

                // Update user with teacher profile ID
                user.teacherProfileId = teacher._id as any;
                await user.save();

                console.log(`Created Teacher Profile for: ${t.firstName}`);
            } else {
                console.log(`Teacher profile already exists for: ${t.firstName}`);
            }
        }

        console.log('Seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedTeachers();

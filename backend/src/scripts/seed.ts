import mongoose from 'mongoose';
import { config } from '../config/index';
import { Role } from '../models/Role';
import { User } from '../models/User';
import { hashPassword } from '../utils/password';

const seed = async () => {
    try {
        await mongoose.connect(config.mongodb.uri);
        console.log('Connected to MongoDB');

        // Seed Roles
        const roles = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
        const roleDocs = [];

        for (const name of roles) {
            let role = await Role.findOne({ name });
            if (!role) {
                role = await Role.create({ name, description: `Default ${name} role` });
                console.log(`Created role: ${name}`);
            } else {
                console.log(`Role exists: ${name}`);
            }
            roleDocs.push(role);
        }

        // Test Users Data
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
            let user = await User.findOne({ email: userData.email });
            const userRole = roleDocs.find(r => r.name === userData.role);

            if (!user) {
                const hashedPassword = await hashPassword(userData.password);
                user = await User.create({
                    email: userData.email,
                    password: hashedPassword,
                    fullName: userData.fullName,
                    roleAssignments: [{ roleId: userRole?._id, assignedAt: new Date() }],
                });
                console.log(`✓ Created ${userData.role}:`);
            } else {
                // Update existing user's password
                const hashedPassword = await hashPassword(userData.password);
                user.password = hashedPassword;

                // Ensure role is assigned
                const hasRole = user.roleAssignments.some((ra: any) => ra.roleId.toString() === userRole?._id.toString());
                if (!hasRole && userRole) {
                    user.roleAssignments.push({ roleId: userRole._id, assignedAt: new Date() });
                }

                await user.save();
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
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();


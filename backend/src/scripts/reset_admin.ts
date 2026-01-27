
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Role } from '../models/Role';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

const resetAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@college.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure Admin Role exists
        let adminRole = await Role.findOne({ name: 'ADMIN' });
        if (!adminRole) {
            console.log('Admin role not found, creating it...');
            adminRole = await Role.create({
                name: 'ADMIN',
                permissions: ['ALL_ACCESS']
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            console.log('Admin user found. Updating password...');
            user.password = hashedPassword;
            user.fullName = 'System Admin'; // Ensure name is correct

            // Ensure role is assigned
            const hasRole = user.roleAssignments.some((ra: any) => ra.roleId.toString() === adminRole!._id.toString());
            if (!hasRole) {
                user.roleAssignments.push({
                    roleId: adminRole._id,
                    assignedAt: new Date()
                });
            }
            // Ensure status is active
            user.status = 'active';

            await user.save();
            console.log('Admin password updated successfully.');
        } else {
            console.log('Admin user NOT found. Creating new admin...');
            await User.create({
                email,
                password: hashedPassword,
                fullName: 'System Admin',
                phone: '0000000000',
                roleAssignments: [{
                    roleId: adminRole._id,
                    assignedAt: new Date()
                }],
                status: 'active'
            });
            console.log('Admin user created successfully.');
        }

        console.log('=================================');
        console.log('CREDENTIALS VERIFIED');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('=================================');

        process.exit(0);
    } catch (error) {
        console.error('Reset failed:', error);
        process.exit(1);
    }
};

resetAdmin();

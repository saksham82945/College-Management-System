
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Role } from '../models/Role';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

const repairRoles = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const roles = await Role.find();
        const roleMap = roles.reduce((acc: any, r: any) => {
            acc[r.name] = r._id;
            return acc;
        }, {});

        console.log('Role IDs:', roleMap);

        const users = await User.find();
        for (const user of users) {
            let roleName = 'STUDENT'; // Default

            if (user.email.includes('admin')) roleName = 'ADMIN';
            else if (user.email.includes('teacher') || user.email.includes('professor') || user.email.endsWith('@college.edu')) roleName = 'TEACHER';
            else if (user.email.includes('student')) roleName = 'STUDENT';

            const newRoleId = roleMap[roleName];

            if (newRoleId) {
                user.roleAssignments = [{
                    roleId: newRoleId,
                    assignedAt: new Date()
                }];
                await user.save();
                console.log(`Updated ${user.email} -> ${roleName}`);
            } else {
                console.log(`Skipping ${user.email} (Role ${roleName} not found)`);
            }
        }

        console.log('Role repair complete.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

repairRoles();

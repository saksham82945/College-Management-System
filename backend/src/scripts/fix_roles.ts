
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Role } from '../models/Role';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

const fixRoles = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Drop Roles Collection
        try {
            await mongoose.connection.collection('roles').drop();
            console.log('Dropped roles collection.');
        } catch (e) {
            console.log('Roles collection did not exist.');
        }

        // Re-create Roles
        await Role.create([
            {
                name: 'ADMIN',
                description: 'Administrator with full access',
                permissions: ['ALL_ACCESS']
            },
            {
                name: 'TEACHER',
                description: 'Faculty member',
                permissions: ['VIEW_DASHBOARD', 'VIEW_CLASSES', 'MARK_ATTENDANCE']
            },
            {
                name: 'STUDENT',
                description: 'Student',
                permissions: ['VIEW_DASHBOARD', 'VIEW_GRADES']
            },
            {
                name: 'STAFF',
                description: 'Support staff',
                permissions: ['VIEW_DASHBOARD']
            }
        ]);
        console.log('Re-seeded roles with correct schema.');

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

fixRoles();

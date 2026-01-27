
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Teacher } from '../models/Teacher';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

// Force schema registration
try {
    mongoose.model('User');
} catch {
    // If not registered, strict import should have handled it, but let's be safe
    require('../models/User');
}

const cleanOrphans = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const teachers = await Teacher.find().populate('userId');
        console.log(`Found ${teachers.length} teachers.`);

        let deletedCount = 0;
        for (const teacher of teachers) {
            if (!teacher.userId) {
                console.log(`❌ Found Orphan Teacher (No User): ID ${teacher._id} / EmpID ${teacher.employeeId}`);
                await Teacher.findByIdAndDelete(teacher._id);
                deletedCount++;
                console.log('   -> Deleted.');
            } else {
                console.log(`✅ Valid Teacher: ${(teacher.userId as any).email}`);
            }
        }

        console.log(`Cleanup Complete. Deleted ${deletedCount} orphan records.`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

cleanOrphans();

"use strict";
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

async function diagnose() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Import models
        const { Student } = require('../models/Student');
        const { User } = require('../models/User');

        const students = await Student.find().lean();
        console.log(`Total students: ${students.length}`);

        let orphans = 0;
        for (const student of students) {
            const user = await User.findById(student.userId);
            if (!user) {
                console.log(`❌ Orphan found: Student ID ${student._id}, RollNo ${student.rollNo}, UserID ${student.userId}`);
                orphans++;
            }
        }

        if (orphans === 0) {
            console.log('✅ No orphan student records found.');
        } else {
            console.log(`⚠️ Found ${orphans} orphan student records.`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Diagnosis failed:', err);
        process.exit(1);
    }
}

diagnose();

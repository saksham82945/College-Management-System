const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const User = require('../models/User').User;
const Student = require('../models/Student').Student;
const Parent = require('../models/Parent').Parent;

async function cleanupStudentData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get all student user IDs
        const students = await Student.find({});
        const studentUserIds = students.map(s => s.userId?.toString());

        console.log(`Found ${students.length} students in database`);

        // Delete all students
        const deletedStudents = await Student.deleteMany({});
        console.log(`Deleted ${deletedStudents.deletedCount} students`);

        // Delete all parents
        const deletedParents = await Parent.deleteMany({});
        console.log(`Deleted ${deletedParents.deletedCount} parents`);

        // Delete orphaned users (users with STUDENT role but no student record)
        const deletedUsers = await User.deleteMany({
            roles: 'STUDENT'
        });
        console.log(`Deleted ${deletedUsers.deletedCount} student users`);

        console.log('\n✅ Cleanup completed successfully!');
        console.log('You can now create new students from the UI.');

    } catch (error) {
        console.error('❌ Cleanup failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

cleanupStudentData();

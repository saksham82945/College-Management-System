const mongoose = require('mongoose');
const { Student } = require('./backend/src/models/Student');
const { config } = require('./backend/src/config/index');

async function debug() {
    await mongoose.connect(config.mongodb.uri);
    const students = await Student.find();
    console.log('Students count:', students.length);
    if(students.length > 0) {
        const student = students[0];
        console.log('Student before delete:', student.status);
        student.status = 'inactive';
        try {
            await student.save();
            console.log('Student saved successfully');
        } catch (e) {
            console.error('Save error:', e.message);
        }
        const refetched = await Student.findById(student._id);
        console.log('Refetched student status:', refetched.status);
    }
    process.exit(0);
}
debug();

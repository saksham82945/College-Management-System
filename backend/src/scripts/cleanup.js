const mongoose = require('mongoose');
const { config } = require('../config/index');
const { Student } = require('../models/Student');
const { User } = require('../models/User');

async function cleanup() {
    await mongoose.connect(config.mongodb.uri);
    const inactiveStudents = await Student.find({ status: 'inactive' });
    console.log(`Found ${inactiveStudents.length} inactive students. Cleaning up...`);
    for(let s of inactiveStudents) {
        if(s.userId) await User.findByIdAndDelete(s.userId);
        await Student.findByIdAndDelete(s._id);
    }
    console.log("Cleanup complete!");
    process.exit(0);
}
cleanup();

const mongoose = require('mongoose');
const { Student } = require('../models/Student');
const { User } = require('../models/User');
const { config } = require('../config/index');

async function debug() {
    await mongoose.connect(config.mongodb.uri);
    const students = await Student.find().populate('userId');
    for(let s of students) {
        if(!s.userId) {
            console.log(`Corrupted student: ID ${s._id}, rollNo ${s.rollNo} has no userId!`);
            // Clean it up?
        }
    }
    console.log('Database check complete.');
    process.exit(0);
}
debug();

const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Student } = require('../models/Student');
const { Teacher } = require('../models/Teacher');
const { Staff } = require('../models/Staff');
const MONGO_URI = 'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement';

async function verify() {
    await mongoose.connect(MONGO_URI);

    const users    = await User.countDocuments();
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
    const staff    = await Staff.countDocuments();

    console.log('=== DB COUNTS ===');
    console.log('Users   :', users);
    console.log('Students:', students);
    console.log('Teachers:', teachers);
    console.log('Staff   :', staff);

    console.log('\n=== STUDENTS ===');
    const allStudents = await Student.find().populate('userId', 'email fullName');
    for (const s of allStudents) {
        const name = s.userId ? s.userId.fullName : '[ORPHAN - no user]';
        console.log(`  ${name} | ${s.rollNo} | ${s.course} | Sem ${s.semester} | Sec ${s.section} | Status: ${s.status}`);
    }

    console.log('\n=== TEACHERS ===');
    const allTeachers = await Teacher.find().populate('userId', 'email fullName');
    for (const t of allTeachers) {
        const name = t.userId ? t.userId.fullName : '[ORPHAN - no user]';
        console.log(`  ${name} | ${t.employeeId} | ${t.designation} | Dept: ${t.department}`);
    }

    console.log('\n=== STAFF ===');
    const allStaff = await Staff.find().populate('userId', 'email fullName');
    for (const s of allStaff) {
        const name = s.userId ? s.userId.fullName : '[ORPHAN - no user]';
        console.log(`  ${name} | ${s.employeeId} | ${s.role} | Dept: ${s.department}`);
    }

    await mongoose.disconnect();
    process.exit(0);
}

verify().catch(e => { console.error(e.message); process.exit(1); });

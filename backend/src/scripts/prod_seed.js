/**
 * prod_seed.js - Seeds production MongoDB database with test students, teachers, staff
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement';

const { User } = require('../models/User');
const { Student } = require('../models/Student');
const { Teacher } = require('../models/Teacher');
const { Staff } = require('../models/Staff');
const { Role } = require('../models/Role');

let studentRoleId, teacherRoleId, staffRoleId;

async function ensureRoles() {
    const roleNames = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
    const roleMap = {};
    for (const name of roleNames) {
        let role = await Role.findOne({ name });
        if (!role) role = await Role.create({ name, description: `Default ${name} role` });
        roleMap[name] = role._id;
    }
    studentRoleId = roleMap['STUDENT'];
    teacherRoleId = roleMap['TEACHER'];
    staffRoleId   = roleMap['STAFF'];
    console.log('Roles OK');
}

async function createUser(email, fullName, phone, roleId) {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return existing;
    const hashed = await bcrypt.hash('Test@1234', 10);
    return User.create({
        email: email.toLowerCase(),
        password: hashed,
        fullName,
        phone,
        status: 'active',
        roleAssignments: [{ roleId, assignedAt: new Date() }],
    });
}

async function seedStudents() {
    const data = [
        { fullName: 'Aryan Sharma',   email: 'aryan.sharma@student.college.com',   phone: '9801234567', rollNo: 'STU-2024-001', course: 'B.Tech Computer Science', semester: '3', section: 'A' },
        { fullName: 'Priya Patel',    email: 'priya.patel@student.college.com',    phone: '9812345678', rollNo: 'STU-2024-002', course: 'BCA',                      semester: '1', section: 'B' },
        { fullName: 'Rahul Gupta',    email: 'rahul.gupta@student.college.com',    phone: '9823456789', rollNo: 'STU-2024-003', course: 'MBA',                      semester: '2', section: 'A' },
        { fullName: 'Sneha Reddy',    email: 'sneha.reddy@student.college.com',    phone: '9834567890', rollNo: 'STU-2024-004', course: 'B.Sc Physics',             semester: '5', section: 'C' },
        { fullName: 'Karan Mehta',    email: 'karan.mehta@student.college.com',    phone: '9845678901', rollNo: 'STU-2024-005', course: 'B.Com',                    semester: '4', section: 'B' },
    ];
    let count = 0;
    for (const s of data) {
        if (await Student.findOne({ rollNo: s.rollNo })) { console.log(`  Skip student ${s.rollNo} (exists)`); continue; }
        const user = await createUser(s.email, s.fullName, s.phone, studentRoleId);
        if (await Student.findOne({ userId: user._id })) { console.log(`  Skip profile ${s.email} (exists)`); continue; }
        await Student.create({
            userId: user._id, rollNo: s.rollNo, course: s.course,
            semester: s.semester, section: s.section, status: 'active',
            enrollmentYear: 2024,
            guardianInfo: { fatherName: 'Guardian ' + s.fullName, fatherPhone: s.phone },
            address: { city: 'Delhi', state: 'Delhi', country: 'India' },
        });
        console.log(`  + Student: ${s.fullName} (${s.rollNo})`);
        count++;
    }
    console.log(`Students seeded: ${count}`);
}

async function seedTeachers() {
    const data = [
        { fullName: 'Dr. Anita Verma',   email: 'anita.verma@faculty.college.com',  phone: '9901234567', empId: 'TCH-2024-001', dept: 'Computer Science', desig: 'Associate Professor', qual: ['Ph.D CS', 'M.Tech'], exp: 8, join: '2020-07-01', sal: { base: 75000, allowances: 15000, deductions: 5000 } },
        { fullName: 'Prof. Suresh Kumar', email: 'suresh.kumar@faculty.college.com', phone: '9912345678', empId: 'TCH-2024-002', dept: 'Mathematics',       desig: 'Senior Lecturer',    qual: ['M.Sc Maths', 'B.Ed'], exp: 12, join: '2018-08-15', sal: { base: 65000, allowances: 12000, deductions: 4000 } },
    ];
    let count = 0;
    for (const t of data) {
        if (await Teacher.findOne({ employeeId: t.empId })) { console.log(`  Skip teacher ${t.empId} (exists)`); continue; }
        const user = await createUser(t.email, t.fullName, t.phone, teacherRoleId);
        if (await Teacher.findOne({ userId: user._id })) { console.log(`  Skip profile ${t.email} (exists)`); continue; }
        await Teacher.create({
            userId: user._id, employeeId: t.empId, department: t.dept,
            designation: t.desig, qualification: t.qual, experience: t.exp,
            joiningDate: new Date(t.join), salary: t.sal, status: 'active',
            contactInfo: { phone: t.phone, address: 'Campus, Delhi' },
        });
        console.log(`  + Teacher: ${t.fullName}`);
        count++;
    }
    console.log(`Teachers seeded: ${count}`);
}

async function seedStaff() {
    const data = [
        { fullName: 'Mohan Lal',   email: 'mohan.lal@staff.college.com',   phone: '9700112233', empId: 'STF-2024-001', role: 'Librarian',  dept: 'Library Services', join: '2019-06-01', sal: { base: 35000, allowances: 5000, deductions: 2000 } },
        { fullName: 'Rekha Singh', email: 'rekha.singh@staff.college.com', phone: '9700223344', empId: 'STF-2024-002', role: 'Accountant', dept: 'Finance',          join: '2021-02-15', sal: { base: 40000, allowances: 6000, deductions: 2500 } },
    ];
    let count = 0;
    for (const s of data) {
        if (await Staff.findOne({ employeeId: s.empId })) { console.log(`  Skip staff ${s.empId} (exists)`); continue; }
        const user = await createUser(s.email, s.fullName, s.phone, staffRoleId);
        if (await Staff.findOne({ userId: user._id })) { console.log(`  Skip profile ${s.email} (exists)`); continue; }
        await Staff.create({
            userId: user._id, employeeId: s.empId, role: s.role,
            department: s.dept, joiningDate: new Date(s.join),
            salary: s.sal, status: 'active',
            contactInfo: { phone: s.phone, address: 'Campus, Delhi' },
        });
        console.log(`  + Staff: ${s.fullName}`);
        count++;
    }
    console.log(`Staff seeded: ${count}`);
}

async function verify() {
    const stu = await Student.countDocuments();
    const tea = await Teacher.countDocuments();
    const sta = await Staff.countDocuments();
    console.log(`\nFINAL COUNT => Students: ${stu} | Teachers: ${tea} | Staff: ${sta}`);
}

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to PRODUCTION MongoDB\n');
    await ensureRoles();
    await seedStudents();
    await seedTeachers();
    await seedStaff();
    await verify();
    await mongoose.disconnect();
    console.log('Done. Password for all new accounts: Test@1234');
    process.exit(0);
}

main().catch(e => { console.error(e.message); process.exit(1); });

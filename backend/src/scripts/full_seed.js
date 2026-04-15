/**
 * full_seed.js
 * ============
 * Diagnoses database issues and seeds 5 students, 2 teachers, 2 staff.
 * Usage: node src/scripts/full_seed.js
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// --- CONFIG ---
const MONGO_URI = 'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement';
const HASH_ROUNDS = 10;

// --- MODELS ---
const { User } = require('../models/User');
const { Student } = require('../models/Student');
const { Teacher } = require('../models/Teacher');
const { Staff } = require('../models/Staff');
const { Role } = require('../models/Role');

let studentRoleId, teacherRoleId, staffRoleId;

async function connect() {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');
}

// =============================================================
// STEP 1: DIAGNOSE
// =============================================================
async function diagnose() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 DIAGNOSING DATABASE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const roles = await Role.find();
    console.log(`Roles (${roles.length}): ${roles.map(r => r.name).join(', ') || 'NONE - will create'}`);

    const users    = await User.countDocuments();
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
    const staff    = await Staff.countDocuments();

    console.log(`Users: ${users} | Students: ${students} | Teachers: ${teachers} | Staff: ${staff}`);

    // Orphaned students (userId missing or not found)
    const allStudents = await Student.find().populate('userId');
    const orphaned = allStudents.filter(s => !s.userId);
    if (orphaned.length > 0) {
        console.log(`\n⚠️  Found ${orphaned.length} orphaned students (no User record). Removing...`);
        for (const s of orphaned) {
            await Student.findByIdAndDelete(s._id);
        }
        console.log(`   ✅ Cleaned up ${orphaned.length} orphaned students.`);
    } else {
        console.log('✅ No orphaned student records found.');
    }

    // Orphaned teachers
    const allTeachers = await Teacher.find().populate('userId');
    const orphanedT = allTeachers.filter(t => !t.userId);
    if (orphanedT.length > 0) {
        console.log(`⚠️  Found ${orphanedT.length} orphaned teachers. Removing...`);
        for (const t of orphanedT) await Teacher.findByIdAndDelete(t._id);
        console.log(`   ✅ Cleaned up orphaned teachers.`);
    } else {
        console.log('✅ No orphaned teacher records found.');
    }

    // Orphaned staff
    const allStaff = await Staff.find().populate('userId');
    const orphanedS = allStaff.filter(s => !s.userId);
    if (orphanedS.length > 0) {
        console.log(`⚠️  Found ${orphanedS.length} orphaned staff. Removing...`);
        for (const s of orphanedS) await Staff.findByIdAndDelete(s._id);
        console.log(`   ✅ Cleaned up orphaned staff.`);
    } else {
        console.log('✅ No orphaned staff records found.');
    }

    console.log('');
}

// =============================================================
// STEP 2: ENSURE ROLES EXIST
// =============================================================
async function ensureRoles() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 ENSURING ROLES EXIST');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const roleNames = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
    const roleMap = {};

    for (const name of roleNames) {
        let role = await Role.findOne({ name });
        if (!role) {
            role = await Role.create({ name, description: `Default ${name} role` });
            console.log(`  ✅ Created role: ${name}`);
        } else {
            console.log(`  ✔  Role exists: ${name}`);
        }
        roleMap[name] = role._id;
    }

    studentRoleId = roleMap['STUDENT'];
    teacherRoleId = roleMap['TEACHER'];
    staffRoleId   = roleMap['STAFF'];
    console.log('');
}

// =============================================================
// HELPER: Create User
// =============================================================
async function createUser(email, fullName, phone, roleName, roleId) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
        console.log(`  ⚠️  User already exists: ${email} — skipping`);
        return existingUser;
    }
    const hashed = await bcrypt.hash('Test@1234', HASH_ROUNDS);
    const user = await User.create({
        email: email.toLowerCase(),
        password: hashed,
        fullName,
        phone,
        status: 'active',
        roleAssignments: [{ roleId, assignedAt: new Date() }],
    });
    return user;
}

// =============================================================
// STEP 3: SEED STUDENTS
// =============================================================
async function seedStudents() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎓 SEEDING 5 STUDENTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const studentsData = [
        { fullName: 'Aryan Sharma',   email: 'aryan.sharma@student.college.com',   phone: '9801234567', rollNo: 'STU-2024-001', course: 'B.Tech Computer Science', semester: '3', section: 'A' },
        { fullName: 'Priya Patel',    email: 'priya.patel@student.college.com',    phone: '9812345678', rollNo: 'STU-2024-002', course: 'BCA',                      semester: '1', section: 'B' },
        { fullName: 'Rahul Gupta',    email: 'rahul.gupta@student.college.com',    phone: '9823456789', rollNo: 'STU-2024-003', course: 'MBA',                      semester: '2', section: 'A' },
        { fullName: 'Sneha Reddy',    email: 'sneha.reddy@student.college.com',    phone: '9834567890', rollNo: 'STU-2024-004', course: 'B.Sc Physics',             semester: '5', section: 'C' },
        { fullName: 'Karan Mehta',    email: 'karan.mehta@student.college.com',    phone: '9845678901', rollNo: 'STU-2024-005', course: 'B.Com',                    semester: '4', section: 'B' },
    ];

    let created = 0;
    for (const s of studentsData) {
        // Skip if roll number already exists
        const existingStudent = await Student.findOne({ rollNo: s.rollNo });
        if (existingStudent) {
            console.log(`  ⚠️  Student with rollNo ${s.rollNo} already exists — skipping`);
            continue;
        }

        const user = await createUser(s.email, s.fullName, s.phone, 'STUDENT', studentRoleId);
        
        // Skip if user already has a student profile
        const existingProfile = await Student.findOne({ userId: user._id });
        if (existingProfile) {
            console.log(`  ⚠️  Student profile for ${s.email} already exists — skipping`);
            continue;
        }

        await Student.create({
            userId: user._id,
            rollNo: s.rollNo,
            course: s.course,
            semester: s.semester,
            section: s.section,
            status: 'active',
            enrollmentYear: 2024,
            guardianInfo: {
                fatherName: 'Guardian ' + s.fullName,
                fatherPhone: s.phone,
            },
            address: { city: 'Delhi', state: 'Delhi', country: 'India' },
        });

        console.log(`  ✅ Created Student: ${s.fullName} (${s.rollNo}) | ${s.course} Sem ${s.semester}`);
        created++;
    }
    console.log(`\n  📊 ${created} new students created.\n`);
}

// =============================================================
// STEP 4: SEED TEACHERS
// =============================================================
async function seedTeachers() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👨‍🏫 SEEDING 2 TEACHERS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const teachersData = [
        {
            fullName: 'Dr. Anita Verma',
            email: 'anita.verma@faculty.college.com',
            phone: '9901234567',
            employeeId: 'TCH-2024-001',
            department: 'Computer Science',
            designation: 'Associate Professor',
            qualification: ['Ph.D Computer Science', 'M.Tech'],
            experience: 8,
            joiningDate: new Date('2020-07-01'),
            salary: { base: 75000, allowances: 15000, deductions: 5000 },
        },
        {
            fullName: 'Prof. Suresh Kumar',
            email: 'suresh.kumar@faculty.college.com',
            phone: '9912345678',
            employeeId: 'TCH-2024-002',
            department: 'Mathematics',
            designation: 'Senior Lecturer',
            qualification: ['M.Sc Mathematics', 'B.Ed'],
            experience: 12,
            joiningDate: new Date('2018-08-15'),
            salary: { base: 65000, allowances: 12000, deductions: 4000 },
        },
    ];

    let created = 0;
    for (const t of teachersData) {
        const existingTeacher = await Teacher.findOne({ employeeId: t.employeeId });
        if (existingTeacher) {
            console.log(`  ⚠️  Teacher ${t.employeeId} already exists — skipping`);
            continue;
        }

        const user = await createUser(t.email, t.fullName, t.phone, 'TEACHER', teacherRoleId);
        
        const existingProfile = await Teacher.findOne({ userId: user._id });
        if (existingProfile) {
            console.log(`  ⚠️  Teacher profile for ${t.email} already exists — skipping`);
            continue;
        }

        await Teacher.create({
            userId: user._id,
            employeeId: t.employeeId,
            department: t.department,
            designation: t.designation,
            qualification: t.qualification,
            experience: t.experience,
            joiningDate: t.joiningDate,
            salary: t.salary,
            status: 'active',
            contactInfo: { phone: t.phone, address: 'College Campus, Delhi' },
        });

        console.log(`  ✅ Created Teacher: ${t.fullName} | ${t.designation}, ${t.department}`);
        created++;
    }
    console.log(`\n  📊 ${created} new teachers created.\n`);
}

// =============================================================
// STEP 5: SEED STAFF
// =============================================================
async function seedStaff() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🏢 SEEDING 2 STAFF MEMBERS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const staffData = [
        {
            fullName: 'Mohan Lal',
            email: 'mohan.lal@staff.college.com',
            phone: '9700112233',
            employeeId: 'STF-2024-001',
            role: 'Librarian',
            department: 'Library Services',
            joiningDate: new Date('2019-06-01'),
            salary: { base: 35000, allowances: 5000, deductions: 2000 },
        },
        {
            fullName: 'Rekha Singh',
            email: 'rekha.singh@staff.college.com',
            phone: '9700223344',
            employeeId: 'STF-2024-002',
            role: 'Accountant',
            department: 'Finance',
            joiningDate: new Date('2021-02-15'),
            salary: { base: 40000, allowances: 6000, deductions: 2500 },
        },
    ];

    let created = 0;
    for (const s of staffData) {
        const existingStaff = await Staff.findOne({ employeeId: s.employeeId });
        if (existingStaff) {
            console.log(`  ⚠️  Staff ${s.employeeId} already exists — skipping`);
            continue;
        }

        const user = await createUser(s.email, s.fullName, s.phone, 'STAFF', staffRoleId);
        
        const existingProfile = await Staff.findOne({ userId: user._id });
        if (existingProfile) {
            console.log(`  ⚠️  Staff profile for ${s.email} already exists — skipping`);
            continue;
        }

        await Staff.create({
            userId: user._id,
            employeeId: s.employeeId,
            role: s.role,
            department: s.department,
            joiningDate: s.joiningDate,
            salary: s.salary,
            status: 'active',
            contactInfo: { phone: s.phone, address: 'College Campus, Delhi' },
        });

        console.log(`  ✅ Created Staff: ${s.fullName} | ${s.role}, ${s.department}`);
        created++;
    }
    console.log(`\n  📊 ${created} new staff created.\n`);
}

// =============================================================
// STEP 6: FINAL VERIFICATION
// =============================================================
async function verify() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✔  FINAL DATABASE VERIFICATION');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    const users    = await User.countDocuments();
    const students = await Student.countDocuments();
    const teachers = await Teacher.countDocuments();
    const staff    = await Staff.countDocuments();

    console.log(`  Users   : ${users}`);
    console.log(`  Students: ${students}`);
    console.log(`  Teachers: ${teachers}`);
    console.log(`  Staff   : ${staff}`);
    console.log('');

    // Show all students
    const allStudents = await Student.find().populate('userId', 'email fullName');
    console.log('  📋 STUDENTS:');
    for (const s of allStudents) {
        if (s.userId) {
            console.log(`     • ${s.userId.fullName} | ${s.rollNo} | ${s.course} | Sem ${s.semester} | Sec ${s.section}`);
        }
    }

    // Show all teachers
    const allTeachers = await Teacher.find().populate('userId', 'email fullName');
    console.log('\n  📋 TEACHERS:');
    for (const t of allTeachers) {
        if (t.userId) {
            console.log(`     • ${t.userId.fullName} | ${t.employeeId} | ${t.designation}, ${t.department}`);
        }
    }

    // Show all staff
    const allStaff = await Staff.find().populate('userId', 'email fullName');
    console.log('\n  📋 STAFF:');
    for (const s of allStaff) {
        if (s.userId) {
            console.log(`     • ${s.userId.fullName} | ${s.employeeId} | ${s.role}, ${s.department}`);
        }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 ALL SEEDING DONE! Default password for all new accounts: Test@1234');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

// =============================================================
// MAIN
// =============================================================
async function main() {
    try {
        await connect();
        await diagnose();
        await ensureRoles();
        await seedStudents();
        await seedTeachers();
        await seedStaff();
        await verify();
    } catch (err) {
        console.error('\n❌ SEED ERROR:', err.message);
        console.error(err.stack);
    } finally {
        await mongoose.disconnect();
        console.log('\n🔌 Disconnected from MongoDB.');
        process.exit(0);
    }
}

main();

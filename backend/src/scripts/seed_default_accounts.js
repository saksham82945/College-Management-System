/**
 * seed_default_accounts.js
 * Seeds default login accounts into production MongoDB
 * Accounts: admin@college.com, teacher@college.com, student@college.com
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = 'mongodb+srv://Shreyiansbackend:Saksham82945@shreyiansbackend1.x4t6sdm.mongodb.net/?appName=CollegeManagement';

const { User } = require('../models/User');
const { Role } = require('../models/Role');
const { Student } = require('../models/Student');
const { Teacher } = require('../models/Teacher');
const { Staff } = require('../models/Staff');
const { Organization } = require('../models/Organization');

const DEFAULT_ACCOUNTS = [
    { email: 'admin@college.com',   password: 'admin123',   fullName: 'System Admin',    role: 'ADMIN',   phone: '0000000000' },
    { email: 'teacher@college.com', password: 'teacher123', fullName: 'Default Teacher', role: 'TEACHER', phone: '1111111111' },
    { email: 'student@college.com', password: 'student123', fullName: 'Default Student', role: 'STUDENT', phone: '2222222222' },
    { email: 'staff@college.com',   password: 'staff123',   fullName: 'Default Staff',   role: 'STAFF',   phone: '3333333333' },
];

async function ensureRoles() {
    const roleNames = ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'];
    const roleMap = {};
    for (const name of roleNames) {
        let role = await Role.findOne({ name });
        if (!role) role = await Role.create({ name, description: `Default ${name} role` });
        roleMap[name] = role._id;
    }
    console.log('✅ Roles ready');
    return roleMap;
}

async function ensureOrganization() {
    let org = await Organization.findOne({ subdomain: 'default' });
    if (!org) {
        org = await Organization.create({
            name: 'Default College',
            subdomain: 'default',
            status: 'active'
        });
        console.log('✅ Created default organization');
    } else {
        console.log('✅ Organization exists');
    }
    return org._id;
}

async function upsertUser(account, roleId, tenantId) {
    const hashed = await bcrypt.hash(account.password, 10);
    let user = await User.findOne({ email: account.email });
    if (user) {
        // Update password and ensure active status
        user.password = hashed;
        user.status = 'active';
        user.fullName = account.fullName;
        user.tenantId = tenantId;
        const hasRole = user.roleAssignments.some(ra => ra.roleId.toString() === roleId.toString());
        if (!hasRole) user.roleAssignments.push({ roleId, assignedAt: new Date() });
        await user.save();
        console.log(`🔄 Updated:  ${account.email} | Password reset to: ${account.password}`);
    } else {
        user = await User.create({
            email: account.email,
            password: hashed,
            fullName: account.fullName,
            phone: account.phone,
            status: 'active',
            tenantId,
            roleAssignments: [{ roleId, assignedAt: new Date() }],
        });
        console.log(`✅ Created:  ${account.email} | Password: ${account.password}`);
    }
    return user;
}

async function ensureStudentProfile(userId, tenantId) {
    const existing = await Student.findOne({ userId });
    if (existing) return;
    await Student.create({
        userId,
        tenantId,
        rollNo: 'STU-DEFAULT-001',
        course: 'B.Tech Computer Science',
        semester: '1',
        section: 'A',
        status: 'active',
        enrollmentYear: 2024,
        guardianInfo: { fatherName: 'Guardian', fatherPhone: '0000000000' },
        address: { city: 'Patna', state: 'Bihar', country: 'India' },
    });
}

async function ensureTeacherProfile(userId, tenantId) {
    const existing = await Teacher.findOne({ userId });
    if (existing) return;
    await Teacher.create({
        userId,
        tenantId,
        employeeId: 'TCH-DEFAULT-001',
        department: 'General',
        designation: 'Lecturer',
        qualification: ['M.Tech'],
        experience: 1,
        joiningDate: new Date('2024-01-01'),
        salary: { base: 50000, allowances: 10000, deductions: 3000 },
        status: 'active',
        contactInfo: { phone: '1111111111', address: 'Campus' },
    });
}

async function ensureStaffProfile(userId, tenantId) {
    const existing = await Staff.findOne({ userId });
    if (existing) return;
    await Staff.create({
        userId,
        tenantId,
        employeeId: 'STF-DEFAULT-001',
        role: 'Office Staff',
        department: 'Administration',
        joiningDate: new Date('2024-01-01'),
        salary: { base: 35000, allowances: 5000, deductions: 1500 },
        status: 'active',
        contactInfo: { phone: '3333333333', address: 'Campus Office' },
    });
}

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log('🔗 Connected to PRODUCTION MongoDB\n');

    const tenantId = await ensureOrganization();
    const roleMap = await ensureRoles();

    for (const account of DEFAULT_ACCOUNTS) {
        const roleId = roleMap[account.role];
        const user = await upsertUser(account, roleId, tenantId);
        if (account.role === 'STUDENT') await ensureStudentProfile(user._id, tenantId);
        if (account.role === 'TEACHER') await ensureTeacherProfile(user._id, tenantId);
        if (account.role === 'STAFF') await ensureStaffProfile(user._id, tenantId);
    }

    console.log('\n========================================');
    console.log('DEFAULT LOGIN CREDENTIALS (PRODUCTION)');
    console.log('========================================');
    DEFAULT_ACCOUNTS.forEach(a => {
        console.log(`[${a.role.padEnd(7)}] ${a.email.padEnd(25)} | ${a.password}`);
    });
    console.log('========================================\n');

    await mongoose.disconnect();
    process.exit(0);
}

main().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });

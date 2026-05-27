/**
 * bulk_india_seed.js
 * ==================
 * Seeds 120 students, 20 teachers, and 20 staff
 * All with Indian-origin names, cities, and realistic data.
 *
 * Usage:
 *   cd "College Management/backend"
 *   node src/scripts/bulk_india_seed.js
 *
 * Default password for ALL created accounts: Test@1234
 */

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

// ── CONFIG ──────────────────────────────────────────────────────────────────
const MONGO_URI =
  'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement';
const HASH_ROUNDS = 10;

// ── MODELS ───────────────────────────────────────────────────────────────────
const { User }    = require('../models/User');
const { Student } = require('../models/Student');
const { Teacher } = require('../models/Teacher');
const { Staff }   = require('../models/Staff');
const { Role }    = require('../models/Role');

// ── ROLE IDs (filled at runtime) ─────────────────────────────────────────────
let studentRoleId, teacherRoleId, staffRoleId;

// ── INDIAN DATA POOLS ─────────────────────────────────────────────────────────
const firstNamesMale = [
  'Aarav','Arjun','Vikram','Rohan','Karan','Nikhil','Siddharth','Aditya',
  'Rahul','Vivek','Ankit','Harsh','Deepak','Manish','Ravi','Suresh',
  'Pradeep','Sanjay','Rajesh','Ashish','Gaurav','Yash','Varun','Tushar',
  'Mohit','Nitesh','Ajay','Vijay','Kunal','Shubham','Pranav','Abhishek',
  'Tarun','Amitesh','Sachin','Hemant','Dinesh','Sunil','Lalit','Ramesh'
];

const firstNamesFemale = [
  'Priya','Neha','Anjali','Shreya','Kavya','Pooja','Riya','Divya',
  'Simran','Ananya','Sneha','Nisha','Aishwarya','Meera','Preeti','Sonal',
  'Tanvi','Deepa','Archana','Swati','Rekha','Shweta','Yamini','Pallavi',
  'Mansi','Komal','Ritika','Sakshi','Payal','Isha','Vidya','Kriti',
  'Juhi','Sunita','Usha','Varsha','Vandana','Kavita','Geeta','Anita'
];

const lastNames = [
  'Sharma','Patel','Gupta','Verma','Singh','Kumar','Reddy','Nair',
  'Mehta','Shah','Joshi','Rao','Bhat','Desai','Iyer','Pillai',
  'Naidu','Mishra','Tiwari','Pandey','Shukla','Agarwal','Srivastava',
  'Malhotra','Bose','Ghosh','Das','Mukherjee','Chatterjee','Kapoor',
  'Chopra','Arora','Khanna','Sethi','Bajaj','Bansal','Goel','Jain',
  'Saxena','Yadav'
];

const indianCities = [
  { city: 'Mumbai',      state: 'Maharashtra' },
  { city: 'Delhi',       state: 'Delhi' },
  { city: 'Bengaluru',   state: 'Karnataka' },
  { city: 'Hyderabad',   state: 'Telangana' },
  { city: 'Chennai',     state: 'Tamil Nadu' },
  { city: 'Kolkata',     state: 'West Bengal' },
  { city: 'Pune',        state: 'Maharashtra' },
  { city: 'Ahmedabad',   state: 'Gujarat' },
  { city: 'Jaipur',      state: 'Rajasthan' },
  { city: 'Lucknow',     state: 'Uttar Pradesh' },
  { city: 'Patna',       state: 'Bihar' },
  { city: 'Bhopal',      state: 'Madhya Pradesh' },
  { city: 'Chandigarh',  state: 'Punjab' },
  { city: 'Kochi',       state: 'Kerala' },
  { city: 'Nagpur',      state: 'Maharashtra' },
  { city: 'Surat',       state: 'Gujarat' },
  { city: 'Indore',      state: 'Madhya Pradesh' },
  { city: 'Varanasi',    state: 'Uttar Pradesh' },
  { city: 'Coimbatore',  state: 'Tamil Nadu' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
];

const pinCodes = [
  '400001','110001','560001','500001','600001','700001','411001',
  '380001','302001','226001','800001','462001','160001','682001',
  '440001','395001','452001','221001','641001','530001'
];

const courses = [
  'B.Tech Computer Science',
  'B.Tech Electronics & Communication',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'BCA',
  'B.Sc Computer Science',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Sc Mathematics',
  'B.Com',
  'B.Com (Hons)',
  'BBA',
  'MBA',
  'MCA',
  'M.Tech Computer Science',
  'M.Sc Mathematics',
  'M.Sc Physics',
  'BA English',
  'BA Economics',
  'B.Pharm',
];

const departments = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Commerce',
  'Management',
  'Pharmacy',
];

const teacherDesignations = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Senior Lecturer',
  'Lecturer',
  'HOD',
];

const teacherQualifications = [
  ['Ph.D Computer Science', 'M.Tech', 'B.Tech'],
  ['Ph.D Mathematics', 'M.Sc Mathematics'],
  ['Ph.D Physics', 'M.Sc Physics'],
  ['M.Tech Electronics', 'B.Tech'],
  ['MBA', 'B.Com (Hons)'],
  ['MCA', 'BCA'],
  ['Ph.D Chemistry', 'M.Sc Chemistry'],
  ['M.Tech Mechanical', 'B.Tech Mechanical'],
  ['Ph.D Management', 'MBA'],
  ['M.Sc Computer Science', 'B.Sc CS'],
];

const staffRoles = [
  'Librarian',
  'Accountant',
  'Admin',
  'Security',
  'Maintenance',
  'Lab Assistant',
  'Office Staff',
];

const staffDepts = [
  'Library Services',
  'Finance',
  'Administration',
  'Security',
  'Maintenance',
  'Laboratory',
  'Office',
];

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickIndex(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return { value: arr[idx], idx };
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function phoneNumber(index) {
  // Unique 10-digit Indian-style mobile number
  const prefix = ['98', '97', '96', '95', '94', '93', '92', '91', '90', '89', '88', '87', '86', '85', '84', '83', '82', '81', '80', '79'];
  const base = String(index).padStart(8, '0');
  return pick(prefix) + base;
}

function generateDOB(minAge, maxAge) {
  const now = new Date();
  const year = now.getFullYear() - randInt(minAge, maxAge);
  const month = randInt(1, 12);
  const day = randInt(1, 28);
  return new Date(year, month - 1, day);
}

function generateJoiningDate(yearsAgo) {
  const year = new Date().getFullYear() - randInt(1, yearsAgo);
  const month = randInt(1, 12);
  const day = randInt(1, 28);
  return new Date(year, month - 1, day);
}

// ── CONNECT ───────────────────────────────────────────────────────────────────
async function connect() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB\n');
}

// ── ENSURE ROLES ──────────────────────────────────────────────────────────────
async function ensureRoles() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔐 ENSURING ROLES EXIST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const roleMap = {};
  for (const name of ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF']) {
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

// ── CREATE USER (skip if exists) ──────────────────────────────────────────────
async function createUser(email, fullName, phone, roleId) {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return { user: existing, created: false };

  const hashed = await bcrypt.hash('Test@1234', HASH_ROUNDS);
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashed,
    fullName,
    phone,
    status: 'active',
    roleAssignments: [{ roleId, assignedAt: new Date() }],
  });
  return { user, created: true };
}

// ── SEED 120 STUDENTS ─────────────────────────────────────────────────────────
async function seedStudents(total = 120) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎓 SEEDING ${total} STUDENTS`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let created = 0, skipped = 0;

  for (let i = 1; i <= total; i++) {
    const isFemale = i % 2 === 0;
    const firstNames = isFemale ? firstNamesFemale : firstNamesMale;
    const firstName  = firstNames[(i - 1) % firstNames.length];
    const lastName   = lastNames[(i - 1) % lastNames.length];
    const fullName   = `${firstName} ${lastName}`;

    const rollNo  = `STU-2024-${String(i).padStart(3, '0')}`;
    const email   = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@student.college.com`;
    const phone   = phoneNumber(1000 + i);
    const course  = courses[(i - 1) % courses.length];
    const semester = String(randInt(1, 8));
    const section  = ['A', 'B', 'C', 'D'][Math.floor((i - 1) / 30) % 4];
    const location = indianCities[(i - 1) % indianCities.length];
    const pinCode  = pinCodes[(i - 1) % pinCodes.length];

    const fatherFirst = firstNamesMale[(i * 3) % firstNamesMale.length];
    const fatherName  = `${fatherFirst} ${lastName}`;
    const motherFirst = firstNamesFemale[(i * 2) % firstNamesFemale.length];
    const motherName  = `${motherFirst} ${lastName}`;

    // Skip if rollNo exists
    const exists = await Student.findOne({ rollNo });
    if (exists) {
      process.stdout.write(`  ⚠️  ${rollNo} already exists — skip\n`);
      skipped++;
      continue;
    }

    const { user, created: userNew } = await createUser(email, fullName, phone, studentRoleId);

    // Skip if user already has student profile
    const profileExists = await Student.findOne({ userId: user._id });
    if (profileExists) {
      process.stdout.write(`  ⚠️  Profile exists for ${email} — skip\n`);
      skipped++;
      continue;
    }

    await Student.create({
      userId: user._id,
      rollNo,
      course,
      semester,
      section,
      status: 'active',
      enrollmentYear: randInt(2021, 2024),
      dateOfBirth: generateDOB(18, 26),
      guardianInfo: {
        fatherName,
        motherName,
        fatherPhone: phoneNumber(5000 + i),
        motherPhone: phoneNumber(6000 + i),
      },
      address: {
        city: location.city,
        state: location.state,
        pinCode,
        country: 'India',
      },
    });

    console.log(`  ✅ [${i}/${total}] ${fullName} | ${rollNo} | ${course} Sem ${semester} Sec ${section}`);
    created++;
  }

  console.log(`\n  📊 Students created: ${created} | Skipped: ${skipped}\n`);
}

// ── SEED 20 TEACHERS ──────────────────────────────────────────────────────────
async function seedTeachers(total = 20) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`👨‍🏫 SEEDING ${total} TEACHERS`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let created = 0, skipped = 0;

  for (let i = 1; i <= total; i++) {
    const isFemale  = i % 3 === 0;
    const firstNames = isFemale ? firstNamesFemale : firstNamesMale;
    const firstName  = firstNames[(i * 7) % firstNames.length];
    const lastName   = lastNames[(i * 5) % lastNames.length];
    const fullName   = `${firstName} ${lastName}`;

    const employeeId   = `TCH-2024-${String(i).padStart(3, '0')}`;
    const email        = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@faculty.college.com`;
    const phone        = phoneNumber(2000 + i);
    const dept         = departments[(i - 1) % departments.length];
    const designation  = teacherDesignations[(i - 1) % teacherDesignations.length];
    const qualification = teacherQualifications[(i - 1) % teacherQualifications.length];
    const experience   = randInt(1, 20);
    const baseSalary   = randInt(50000, 120000);
    const location     = indianCities[(i * 3) % indianCities.length];

    const exists = await Teacher.findOne({ employeeId });
    if (exists) {
      console.log(`  ⚠️  ${employeeId} already exists — skip`);
      skipped++;
      continue;
    }

    const { user } = await createUser(email, fullName, phone, teacherRoleId);

    const profileExists = await Teacher.findOne({ userId: user._id });
    if (profileExists) {
      console.log(`  ⚠️  Teacher profile exists for ${email} — skip`);
      skipped++;
      continue;
    }

    await Teacher.create({
      userId: user._id,
      employeeId,
      department: dept,
      designation,
      qualification,
      experience,
      joiningDate: generateJoiningDate(15),
      salary: {
        base: baseSalary,
        allowances: Math.round(baseSalary * 0.2),
        deductions:  Math.round(baseSalary * 0.07),
      },
      status: 'active',
      contactInfo: {
        phone,
        address: `${location.city}, ${location.state}, India`,
      },
    });

    console.log(`  ✅ [${i}/${total}] ${fullName} | ${employeeId} | ${designation}, ${dept}`);
    created++;
  }

  console.log(`\n  📊 Teachers created: ${created} | Skipped: ${skipped}\n`);
}

// ── SEED 20 STAFF ─────────────────────────────────────────────────────────────
async function seedStaff(total = 20) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏢 SEEDING ${total} STAFF MEMBERS`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  let created = 0, skipped = 0;

  for (let i = 1; i <= total; i++) {
    const isFemale   = i % 2 === 0;
    const firstNames = isFemale ? firstNamesFemale : firstNamesMale;
    const firstName  = firstNames[(i * 11) % firstNames.length];
    const lastName   = lastNames[(i * 9) % lastNames.length];
    const fullName   = `${firstName} ${lastName}`;

    const employeeId = `STF-2024-${String(i).padStart(3, '0')}`;
    const email      = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@staff.college.com`;
    const phone      = phoneNumber(3000 + i);
    const roleIdx    = (i - 1) % staffRoles.length;
    const role       = staffRoles[roleIdx];
    const dept       = staffDepts[roleIdx];
    const baseSalary = randInt(25000, 60000);
    const location   = indianCities[(i * 7) % indianCities.length];

    const exists = await Staff.findOne({ employeeId });
    if (exists) {
      console.log(`  ⚠️  ${employeeId} already exists — skip`);
      skipped++;
      continue;
    }

    const { user } = await createUser(email, fullName, phone, staffRoleId);

    const profileExists = await Staff.findOne({ userId: user._id });
    if (profileExists) {
      console.log(`  ⚠️  Staff profile exists for ${email} — skip`);
      skipped++;
      continue;
    }

    await Staff.create({
      userId: user._id,
      employeeId,
      role,
      department: dept,
      joiningDate: generateJoiningDate(10),
      salary: {
        base: baseSalary,
        allowances: Math.round(baseSalary * 0.15),
        deductions:  Math.round(baseSalary * 0.05),
      },
      status: 'active',
      contactInfo: {
        phone,
        address: `${location.city}, ${location.state}, India`,
      },
    });

    console.log(`  ✅ [${i}/${total}] ${fullName} | ${employeeId} | ${role}, ${dept}`);
    created++;
  }

  console.log(`\n  📊 Staff created: ${created} | Skipped: ${skipped}\n`);
}

// ── FINAL VERIFICATION ────────────────────────────────────────────────────────
async function verify() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✔  FINAL DATABASE VERIFICATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const users    = await User.countDocuments();
  const students = await Student.countDocuments();
  const teachers = await Teacher.countDocuments();
  const staff    = await Staff.countDocuments();

  console.log(`\n  Total Users   : ${users}`);
  console.log(`  Total Students: ${students}`);
  console.log(`  Total Teachers: ${teachers}`);
  console.log(`  Total Staff   : ${staff}`);

  // Performance check: index scan
  console.log('\n  📈 Testing index performance...');

  const t1 = Date.now();
  await Student.find({ course: 'BCA' }).select('rollNo course semester').lean();
  console.log(`  ⚡ Student course-index query: ${Date.now() - t1}ms`);

  const t2 = Date.now();
  await Teacher.find({ department: 'Computer Science' }).select('employeeId designation').lean();
  console.log(`  ⚡ Teacher dept query: ${Date.now() - t2}ms`);

  const t3 = Date.now();
  await Staff.find({ role: 'Librarian' }).select('employeeId role department').lean();
  console.log(`  ⚡ Staff role query: ${Date.now() - t3}ms`);

  const t4 = Date.now();
  await Student.find().populate('userId', 'email fullName phone').limit(10).lean();
  console.log(`  ⚡ Student populated query (first 10): ${Date.now() - t4}ms`);

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 ALL DONE! Default password for all accounts: Test@1234');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  try {
    await connect();
    await ensureRoles();
    await seedStudents(120);
    await seedTeachers(20);
    await seedStaff(20);
    await verify();
  } catch (err) {
    console.error('\n❌ SEED ERROR:', err.message);
    console.error(err.stack);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

main();

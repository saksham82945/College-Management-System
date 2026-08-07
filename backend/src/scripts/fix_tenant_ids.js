/**
 * fix_tenant_ids.js
 * ─────────────────────────────────────────────────────────────
 * Diagnoses and fixes the tenant ID mismatch that causes records
 * (students, teachers, staff, users) to become invisible.
 *
 * Run with:
 *   node src/scripts/fix_tenant_ids.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI || 
    'mongodb+srv://Shreyiansbackend:Saksham82945@shreyiansbackend1.x4t6sdm.mongodb.net/?appName=CollegeManagement';

const { Organization } = require('../models/Organization');
const { Student }      = require('../models/Student');
const { Teacher }      = require('../models/Teacher');
const { Staff }        = require('../models/Staff');
const { User }         = require('../models/User');

// Bypass tenantPlugin by using raw .collection access
async function rawCount(model, filter) {
    return model.collection.countDocuments(filter);
}

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log('🔗 Connected to MongoDB\n');

    // ── 1. Find all orgs ──────────────────────────────────────────────────────
    const orgs = await Organization.find({}).lean();
    console.log(`Found ${orgs.length} Organization document(s):\n`);

    const summary = [];

    for (const org of orgs) {
        const students = await rawCount(Student, { tenantId: org._id });
        const teachers = await rawCount(Teacher, { tenantId: org._id });
        const staff    = await rawCount(Staff,   { tenantId: org._id });
        const users    = await rawCount(User,    { tenantId: org._id });
        const total    = students + teachers + staff + users;

        summary.push({ org, students, teachers, staff, users, total });

        console.log(`  Org: ${org.name} (${org._id})`);
        console.log(`       subdomain: "${org.subdomain}" | status: ${org.status}`);
        console.log(`       Students: ${students} | Teachers: ${teachers} | Staff: ${staff} | Users: ${users} | TOTAL: ${total}\n`);
    }

    // ── Also count records with NULL / missing tenantId ───────────────────────
    const nullFilter = { $or: [{ tenantId: null }, { tenantId: { $exists: false } }] };
    const orphanStudents = await rawCount(Student, nullFilter);
    const orphanTeachers = await rawCount(Teacher, nullFilter);
    const orphanStaff    = await rawCount(Staff,   nullFilter);
    const orphanUsers    = await rawCount(User,    nullFilter);
    const totalOrphans   = orphanStudents + orphanTeachers + orphanStaff + orphanUsers;

    if (totalOrphans > 0) {
        console.log(`  ⚠️  Orphaned records (no tenantId):`);
        console.log(`      Students: ${orphanStudents} | Teachers: ${orphanTeachers} | Staff: ${orphanStaff} | Users: ${orphanUsers}\n`);
    }

    if (orgs.length === 0) {
        console.log('❌ No organizations found. Please run seed_default_accounts.js first.');
        await mongoose.disconnect();
        return;
    }

    // ── 2. Pick the canonical org (upsert so there's exactly one) ────────────
    let canonical;
    if (summary.length > 0) {
        summary.sort((a, b) => b.total - a.total);
        canonical = summary[0].org;
    } else {
        canonical = await Organization.findOneAndUpdate(
            { subdomain: 'default' },
            { $setOnInsert: { name: 'Default College', subdomain: 'default', status: 'active' } },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    }

    console.log('='.repeat(60));
    console.log(`✅ Canonical org selected: "${canonical.name}"`);
    console.log(`   _id = ${canonical._id}`);
    console.log('='.repeat(60));
    console.log('\n📋 Add this to your Render environment variables:');
    console.log(`   DEFAULT_TENANT_ID = ${canonical._id}\n`);
    console.log('='.repeat(60));

    const migrationOpts = { $set: { tenantId: canonical._id } };

    // ── 3. Migrate orphaned records (no tenantId) ─────────────────────────────
    if (totalOrphans > 0) {
        console.log(`\n🔧 Migrating ${totalOrphans} orphaned records to canonical org...`);
        const [sr, tr, sfr, ur] = await Promise.all([
            Student.collection.updateMany(nullFilter, migrationOpts),
            Teacher.collection.updateMany(nullFilter, migrationOpts),
            Staff.collection.updateMany(nullFilter, migrationOpts),
            User.collection.updateMany(nullFilter, migrationOpts),
        ]);
        console.log(`   Students migrated: ${sr.modifiedCount}`);
        console.log(`   Teachers migrated: ${tr.modifiedCount}`);
        console.log(`   Staff    migrated: ${sfr.modifiedCount}`);
        console.log(`   Users    migrated: ${ur.modifiedCount}`);
    }

    // ── 4. Migrate records from non-canonical orgs ────────────────────────────
    const nonCanonicalOrgs = orgs.filter(o => o._id.toString() !== canonical._id.toString());
    for (const wrongOrg of nonCanonicalOrgs) {
        const wrongFilter = { tenantId: wrongOrg._id };
        const ws  = await rawCount(Student, wrongFilter);
        const wt  = await rawCount(Teacher, wrongFilter);
        const wsf = await rawCount(Staff,   wrongFilter);
        const wu  = await rawCount(User,    wrongFilter);
        const wrongTotal = ws + wt + wsf + wu;

        if (wrongTotal > 0) {
            console.log(`\n🔧 Migrating ${wrongTotal} records from org "${wrongOrg.name}" (${wrongOrg._id})...`);
            const [sr, tr, sfr, ur] = await Promise.all([
                Student.collection.updateMany(wrongFilter, migrationOpts),
                Teacher.collection.updateMany(wrongFilter, migrationOpts),
                Staff.collection.updateMany(wrongFilter, migrationOpts),
                User.collection.updateMany(wrongFilter, migrationOpts),
            ]);
            console.log(`   Students migrated: ${sr.modifiedCount}`);
            console.log(`   Teachers migrated: ${tr.modifiedCount}`);
            console.log(`   Staff    migrated: ${sfr.modifiedCount}`);
            console.log(`   Users    migrated: ${ur.modifiedCount}`);
        }
    }

    // ── 5. Final count verification ───────────────────────────────────────────
    const finalStudents = await rawCount(Student, { tenantId: canonical._id });
    const finalTeachers = await rawCount(Teacher, { tenantId: canonical._id });
    const finalStaff    = await rawCount(Staff,   { tenantId: canonical._id });
    const finalUsers    = await rawCount(User,    { tenantId: canonical._id });

    console.log('\n' + '='.repeat(60));
    console.log('✅ FINAL COUNTS (canonical org):');
    console.log(`   Students : ${finalStudents}`);
    console.log(`   Teachers : ${finalTeachers}`);
    console.log(`   Staff    : ${finalStaff}`);
    console.log(`   Users    : ${finalUsers}`);
    console.log('='.repeat(60));
    console.log('\n📌 NEXT STEP: Ensure this env var is in Render → Environment:');
    console.log(`   DEFAULT_TENANT_ID = ${canonical._id}`);
    console.log('   Then redeploy your backend service.\n');

    await mongoose.disconnect();
    process.exit(0);
}

main().catch(e => {
    console.error('❌ Error:', e.message);
    process.exit(1);
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/college-management?directConnection=true').then(async () => {
    const db = mongoose.connection.db;

    // Delete duplicate/typo admin accounts (keep only admin@college.com)
    const badAdmins = ['admin@colleg.com', 'admin@collee.com', 'admin@coe.com'];
    const r1 = await db.collection('users').deleteMany({ email: { $in: badAdmins } });
    console.log('Deleted broken admin accounts:', r1.deletedCount);

    // Delete no-role users (junk registrations)
    const noRoleEmails = ['adya@123.com', 'saksjsj@gmail.com', 'saksjsjjnj@gmail.com', 'saksjjhhjbhjsjjnj@gmail.com', 'dhanuji@gmail.com', 'jnwqsdwdfvdf@gmail.com'];
    const r2 = await db.collection('users').deleteMany({ email: { $in: noRoleEmails } });
    console.log('Deleted no-role junk users:', r2.deletedCount);

    // Print remaining users
    const roles = await db.collection('roles').find({}).toArray();
    const roleMap = {};
    roles.forEach(r => { roleMap[r._id.toString()] = r.name; });

    const remaining = await db.collection('users').find({}).project({ email: 1, fullName: 1, roleAssignments: 1 }).toArray();
    console.log('\nRemaining users (' + remaining.length + '):');
    remaining.forEach(u => {
        const r = (u.roleAssignments || []).map(ra => roleMap[ra.roleId?.toString()] || 'UNKNOWN').join(', ');
        console.log(' -', u.email, '|', u.fullName, '|', r || 'no-role');
    });

    await mongoose.disconnect();
}).catch(e => console.error(e.message));

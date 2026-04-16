const mongoose = require('mongoose');
const { User } = require('./src/models/User');
const { Role } = require('./src/models/Role');

async function check() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/college-management?appName=CollegeManagement');
        console.log('Connected to Cloud DB');
        
        const roles = await Role.find({});
        const roleMap = {};
        roles.forEach(r => roleMap[r._id.toString()] = r.name);

        const users = await User.find({});
        console.log('\n--- ALL USERS ---');
        users.forEach(u => {
            const userRoles = u.roleAssignments.map(ra => roleMap[ra.roleId.toString()]).join(', ');
            console.log(`Email: ${u.email} | Roles: ${userRoles}`);
        });

        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
check();

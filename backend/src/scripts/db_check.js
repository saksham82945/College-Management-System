const mongoose = require('mongoose');
const { config } = require('../config/index');
const { User } = require('../models/User');

async function check() {
    await mongoose.connect(config.mongodb.uri);
    const users = await User.find({ email: 'admin@college.com' });
    console.log("Admin users matched:", users.length);
    if(users.length > 0) {
        console.log("Admin exists. Status:", users[0].status);
    }
    process.exit(0);
}
check();

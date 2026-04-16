const mongoose = require('mongoose');
const { config } = require('../config/index');
const dashboard = require('./dashboard');

async function test() {
    await mongoose.connect(config.mongodb.uri);
    try {
        await dashboard.getAdminDashboardStats({}, { 
            status: () => ({ json: (data) => console.log(data) }),
            json: (data) => console.log(data)
        });
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}
test();

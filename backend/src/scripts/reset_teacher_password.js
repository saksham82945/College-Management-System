const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';

async function main() {
    await mongoose.connect(MONGODB_URI);
    const User = mongoose.connection.collection('users');

    const user = await User.findOne({ email: 'qswdaefg@gmail.com' });
    if (!user) {
        console.log('User not found with email: qswdaefg@gmail.com');
    } else {
        console.log('Found user:', user.fullName, '-', user.email);
        const newPassword = await bcrypt.hash('teacher123', 10);
        await User.updateOne(
            { email: 'qswdaefg@gmail.com' },
            { $set: { password: newPassword } }
        );
        console.log('Password has been reset to: teacher123');
    }

    await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });

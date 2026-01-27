
import mongoose from 'mongoose';
import { config } from '../config/index';
import { User } from '../models/User';

const check = async () => {
    try {
        await mongoose.connect(config.mongodb.uri);
        console.log('Connected');
        const user = await User.findOne({ email: 'admin@college.com' });
        if (user) {
            console.log('ADMIN FOUND:', user.email);
            console.log('ID:', user._id);
        } else {
            console.log('ADMIN NOT FOUND');
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
check();

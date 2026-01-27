"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const User_1 = require("../models/User");
const check = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected');
        const user = await User_1.User.findOne({ email: 'admin@college.com' });
        if (user) {
            console.log('ADMIN FOUND:', user.email);
            console.log('ID:', user._id);
        }
        else {
            console.log('ADMIN NOT FOUND');
        }
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
check();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Role_1 = require("../models/Role");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/college-management';
const fixRoles = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        // Drop Roles Collection
        try {
            await mongoose_1.default.connection.collection('roles').drop();
            console.log('Dropped roles collection.');
        }
        catch (e) {
            console.log('Roles collection did not exist.');
        }
        // Re-create Roles
        await Role_1.Role.create([
            {
                name: 'ADMIN',
                description: 'Administrator with full access',
                permissions: ['ALL_ACCESS']
            },
            {
                name: 'TEACHER',
                description: 'Faculty member',
                permissions: ['VIEW_DASHBOARD', 'VIEW_CLASSES', 'MARK_ATTENDANCE']
            },
            {
                name: 'STUDENT',
                description: 'Student',
                permissions: ['VIEW_DASHBOARD']
            },
            {
                name: 'STAFF',
                description: 'Support staff',
                permissions: ['VIEW_DASHBOARD']
            }
        ]);
        console.log('Re-seeded roles with correct schema.');
        process.exit(0);
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
};
fixRoles();

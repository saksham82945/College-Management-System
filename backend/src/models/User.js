"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    avatar: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
    roleAssignments: [
        {
            roleId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Role',
            },
            scopeId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Class',
            },
            assignedAt: {
                type: Date,
                default: Date.now,
            },
            assignedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    teacherProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    studentProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
}, { timestamps: true });
// Index for email
exports.User = mongoose_1.default.model('User', userSchema);

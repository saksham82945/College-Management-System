"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    qualification: {
        type: [String],
        required: true,
    },
    experience: {
        type: Number, // In years
        default: 0,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    subjects: [{
            type: String, // Can be refined to Subject model references later
        }],
    salary: {
        base: { type: Number, required: true },
        allowances: { type: Number, default: 0 },
        deductions: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'on_leave', 'resigned', 'terminated'],
        default: 'active',
    },
    contactInfo: {
        phone: String,
        address: String,
    }
}, {
    timestamps: true,
});
exports.Teacher = mongoose_1.default.model('Teacher', teacherSchema);

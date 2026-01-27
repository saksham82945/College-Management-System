"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = __importDefault(require("mongoose"));

const staffSchema = new mongoose_1.default.Schema({
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
    role: {
        type: String,
        required: true,
        enum: ['Librarian', 'Accountant', 'Admin', 'Security', 'Maintenance', 'Lab Assistant', 'Office Staff', 'Other'],
    },
    department: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
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

exports.Staff = mongoose_1.default.model('Staff', staffSchema);

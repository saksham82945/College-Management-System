"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Parent',
    },
    rollNo: {
        type: String,
        unique: true,
        required: true,
    },
    enrollmentYear: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    guardianInfo: {
        fatherName: String,
        motherName: String,
        fatherPhone: String,
        motherPhone: String,
        emergencyContact: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'graduated', 'suspended'],
        default: 'active',
    },
}, { timestamps: true });
// Indexes
studentSchema.index({ rollNo: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ userId: 1 });
exports.Student = mongoose_1.default.model('Student', studentSchema);

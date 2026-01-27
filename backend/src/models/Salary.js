"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salarySchema = new mongoose_1.default.Schema({
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    earnings: [
        {
            componentId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    deductions: [
        {
            componentId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    totalEarnings: {
        type: Number,
    },
    totalDeductions: {
        type: Number,
    },
    netSalary: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['draft', 'approved', 'processed', 'paid'],
        default: 'draft',
    },
}, { timestamps: true });
// Indexes
salarySchema.index({ teacherId: 1, month: 1, year: 1 });
salarySchema.index({ status: 1 });
exports.Salary = mongoose_1.default.model('Salary', salarySchema);

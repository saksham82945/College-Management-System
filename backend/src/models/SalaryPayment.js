"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryPayment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salaryPaymentSchema = new mongoose_1.default.Schema({
    salaryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Salary',
        required: true,
    },
    teacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['bank_transfer', 'cheque', 'cash'],
        required: true,
    },
    bankDetails: {
        accountNumber: String,
        bankName: String,
        ifscCode: String,
    },
    transactionRef: String,
    paidAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending',
    },
}, { timestamps: true });
// Indexes
salaryPaymentSchema.index({ teacherId: 1 });
salaryPaymentSchema.index({ status: 1 });
exports.SalaryPayment = mongoose_1.default.model('SalaryPayment', salaryPaymentSchema);

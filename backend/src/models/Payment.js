"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    feeTypeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'FeeType',
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'bank_transfer', 'cash'],
        required: true,
    },
    transactionRef: {
        type: String,
        unique: true,
    },
    gatewayResponse: mongoose_1.default.Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'refunded'],
        default: 'pending',
    },
    paidAt: {
        type: Date,
    },
    receiptId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Receipt',
    },
}, { timestamps: true });
// Indexes
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ transactionRef: 1 });
paymentSchema.index({ status: 1 });
exports.Payment = mongoose_1.default.model('Payment', paymentSchema);

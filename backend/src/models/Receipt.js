"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const receiptSchema = new mongoose_1.default.Schema({
    receiptNo: {
        type: String,
        unique: true,
        required: true,
    },
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    paymentIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Payment',
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    feeDetails: [
        {
            feeTypeId: mongoose_1.default.Schema.Types.ObjectId,
            amount: Number,
        },
    ],
    paidAt: {
        type: Date,
        default: Date.now,
    },
    paymentMethod: String,
    status: {
        type: String,
        enum: ['issued', 'downloaded', 'printed'],
        default: 'issued',
    },
}, { timestamps: true });
// Indexes
receiptSchema.index({ studentId: 1 });
receiptSchema.index({ receiptNo: 1 });
exports.Receipt = mongoose_1.default.model('Receipt', receiptSchema);

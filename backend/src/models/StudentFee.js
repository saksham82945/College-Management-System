"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentFee = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentFeeSchema = new mongoose_1.default.Schema({
    studentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    feeTypeId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'FeeType',
        required: true,
    },
    amountDue: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        default: 0,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['unpaid', 'partial', 'paid', 'overdue'],
        default: 'unpaid',
    },
    concession: {
        type: {
            type: String,
            enum: ['percentage', 'fixed'],
        },
        value: Number,
        reason: String,
    },
    late_fee: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Indexes
studentFeeSchema.index({ studentId: 1 });
studentFeeSchema.index({ status: 1 });
exports.StudentFee = mongoose_1.default.model('StudentFee', studentFeeSchema);

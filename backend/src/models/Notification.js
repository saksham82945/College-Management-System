"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['fee_due', 'fee_paid', 'exam_scheduled', 'result_published', 'attendance_marked'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    relatedId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    readAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
// Indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ createdAt: -1 });
exports.Notification = mongoose_1.default.model('Notification', notificationSchema);

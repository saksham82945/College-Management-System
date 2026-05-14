"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
const mongoose_1 = __importDefault(require("mongoose"));

/**
 * AuditLog Model
 * Tracks all critical mutations (create, update, delete) on sensitive resources.
 * Used for security compliance and incident investigation.
 */
const auditLogSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    action: {
        type: String,
        required: true,
        // e.g., 'CREATE_STUDENT', 'UPDATE_STUDENT', 'DELETE_STUDENT', 'LOGIN', 'FAILED_LOGIN', 'PROCESS_PAYMENT'
    },
    resource: {
        type: String,
        required: true,
        // e.g., 'Student', 'User', 'Payment', 'Auth'
    },
    resourceId: {
        type: String,
        default: null,
    },
    ipAddress: {
        type: String,
        default: 'unknown',
    },
    userAgent: {
        type: String,
        default: 'unknown',
    },
    statusCode: {
        type: Number,
        default: 200,
    },
    details: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: {},
    },
}, {
    timestamps: true,
    // Expire audit logs after 1 year (365 days) to prevent unbounded growth
    // Remove this if you need permanent audit trails for compliance
    // expireAfterSeconds can be set via TTL index separately
});

// Index for efficient querying
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ resource: 1, resourceId: 1 });
auditLogSchema.index({ ipAddress: 1, createdAt: -1 });

exports.AuditLog = mongoose_1.default.model('AuditLog', auditLogSchema);

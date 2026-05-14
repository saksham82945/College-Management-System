"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();

// ── Security Warning ─────────────────────────────────────────────────────────
// Warn if running in production with default/insecure secrets
if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key') {
        console.error('[SECURITY CRITICAL] JWT_SECRET is not set or is using an insecure default. Set a strong secret in .env!');
        process.exit(1);
    }
    if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET === 'your-refresh-secret') {
        console.error('[SECURITY CRITICAL] JWT_REFRESH_SECRET is not set or is using an insecure default. Set a strong secret in .env!');
        process.exit(1);
    }
}

exports.config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
        expiresIn: process.env.JWT_EXPIRE || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    },
    // ── PII Encryption at Rest ──────────────────────────────────────────────
    // Used by mongoose-field-encryption or any custom encryption layer.
    // Must be a 32-byte (256-bit) hex string. Generate with: openssl rand -hex 32
    encryptionKey: process.env.ENCRYPTION_KEY || null,
    email: {
        smtp: {
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    },
    payment: {
        razorpay: {
            keyId: process.env.RAZORPAY_KEY_ID,
            keySecret: process.env.RAZORPAY_KEY_SECRET,
        },
    },
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'),
        uploadDir: process.env.UPLOAD_DIR || './uploads',
    },
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    logLevel: process.env.LOG_LEVEL || 'info',
};


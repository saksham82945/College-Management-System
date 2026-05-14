"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();

// ─── Real Atlas URI (always works) ───────────────────────────────────────────
const REAL_MONGODB_URI = 'mongodb+srv://admin:admin82945@collegemanagement.oj2meyf.mongodb.net/?appName=CollegeManagement';

/**
 * Resolves the MongoDB URI.
 * If MONGODB_URI env var is set but looks like a placeholder (contains YOUR_CLUSTER,
 * <cluster>, localhost with no port, or other known template patterns), fall back
 * to the real Atlas URI so the server doesn't crash on a bad env var.
 */
function resolveMongoUri() {
    const envUri = process.env.MONGODB_URI;
    if (!envUri) {
        console.info('[CONFIG] MONGODB_URI not set, using built-in Atlas connection.');
        return REAL_MONGODB_URI;
    }
    const PLACEHOLDER_PATTERNS = [
        'YOUR_CLUSTER',
        'your_cluster',
        '<cluster>',
        '<YOUR',
        'example.mongodb.net',
        'placeholder',
        'CHANGE_ME',
    ];
    const isPlaceholder = PLACEHOLDER_PATTERNS.some(p => envUri.includes(p));
    if (isPlaceholder) {
        console.warn(`[CONFIG] MONGODB_URI looks like a placeholder ("${envUri.substring(0, 50)}..."). Using built-in Atlas connection instead.`);
        return REAL_MONGODB_URI;
    }
    return envUri;
}

// ── Security Warning (Production Only) ───────────────────────────────────────
// Prevent startup with insecure default JWT secrets in production
if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key') {
        console.error('[SECURITY CRITICAL] JWT_SECRET is not set or is using an insecure default. Set a strong secret in your environment!');
        process.exit(1);
    }
    if (!process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SECRET === 'your-refresh-secret') {
        console.error('[SECURITY CRITICAL] JWT_REFRESH_SECRET is not set or is using an insecure default. Set a strong secret in your environment!');
        process.exit(1);
    }
}

exports.config = {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
    mongodb: {
        uri: resolveMongoUri(),
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
        expiresIn: process.env.JWT_EXPIRE || '24h',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
    },
    // ── PII Encryption at Rest ────────────────────────────────────────────────
    // Must be a 32-byte (256-bit) hex string.
    // Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();

/**
 * Resolves the MongoDB URI strictly from the environment.
 * Throws a clear error if the URI is missing or looks like a placeholder.
 * Credentials must NEVER be hardcoded in source code.
 */
function resolveMongoUri() {
    const envUri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : '';

    if (!envUri) {
        console.error('[CONFIG] MONGODB_URI environment variable is not set. Please set it in your Render dashboard (or .env for local dev).');
        process.exit(1);
    }

    const PLACEHOLDER_PATTERNS = [
        'YOUR_CLUSTER',
        'YOUR_USERNAME',
        'YOUR_PASSWORD',
        'your_cluster',
        '<cluster>',
        '<YOUR',
        'example.mongodb.net',
        'placeholder',
        'CHANGE_ME',
    ];
    const isPlaceholder = PLACEHOLDER_PATTERNS.some(p => envUri.includes(p));
    if (isPlaceholder) {
        console.error(`[CONFIG] MONGODB_URI looks like a placeholder ("${envUri.substring(0, 60)}..."). Please set the real Atlas URI in your environment.`);
        process.exit(1);
    }

    // Validate URI scheme — must start with mongodb:// or mongodb+srv://
    if (!envUri.startsWith('mongodb://') && !envUri.startsWith('mongodb+srv://')) {
        console.error(`[CONFIG] MONGODB_URI has an invalid scheme ("${envUri.substring(0, 30)}..."). Must start with mongodb:// or mongodb+srv://.`);
        process.exit(1);
    }

    console.info('[CONFIG] Using MONGODB_URI from environment.');
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

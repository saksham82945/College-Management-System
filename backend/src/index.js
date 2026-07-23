"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const index_1 = require("./config/index");
const xssSanitizer_1 = require("./middleware/xssSanitizer");

// ─── Route Imports ────────────────────────────────────────────────────────────
const auth_1 = __importDefault(require("./routes/auth"));
const student_1 = __importDefault(require("./routes/student"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const staff_1 = __importDefault(require("./routes/staff"));
const finance_1 = __importDefault(require("./routes/finance"));
const payroll_1 = __importDefault(require("./routes/payroll"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const class_1 = __importDefault(require("./routes/class"));
const project_1 = __importDefault(require("./routes/project"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const notification_1 = __importDefault(require("./routes/notification"));
const exams_1 = __importDefault(require("./routes/exams"));
const report_1 = __importDefault(require("./routes/report"));
const library_1 = __importDefault(require("./routes/library"));
const { startScheduler } = require('./services/scheduler');

const app = (0, express_1.default)();

// ─── 0. Trust Proxy ───────────────────────────────────────────────────────────
// Render (and most cloud platforms) run behind a reverse proxy.
// Setting trust proxy allows Express to correctly read X-Forwarded-For,
// X-Forwarded-Proto headers — required for rate limiting and HTTPS redirects.
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// ─── 1. HTTPS / HSTS Enforcement ──────────────────────────────────────────────
// helmet() sets many secure headers including X-Content-Type-Options, X-Frame-Options,
// Referrer-Policy, etc. In production, also enforces HSTS.
app.use((0, helmet_1.default)({
    hsts: process.env.NODE_ENV === 'production'
        ? { maxAge: 31536000, includeSubDomains: true, preload: true }
        : false, // Disable HSTS in development (no HTTPS locally)
    contentSecurityPolicy: false, // Disabled to avoid breaking API responses; enable for HTML serving
}));

// ─── 2. HTTPS Redirect (Production Only) ──────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(301, `https://${req.headers.host}${req.url}`);
        }
        next();
    });
}

// ─── 3. Rate Limiting ─────────────────────────────────────────────────────────
// Skip preflight OPTIONS requests; stricter limit in production
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 500,
    skip: (req) => req.method === 'OPTIONS',
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests from this IP. Please try again in 15 minutes.' },
});

// Auth-specific stricter rate limit to prevent brute-force attacks
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 20 : 100,
    skip: (req) => req.method === 'OPTIONS',
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many authentication attempts. Please try again in 15 minutes.' },
});

if (process.env.NODE_ENV !== 'test') {
    app.use(limiter);
}

// ─── 4. CORS ──────────────────────────────────────────────────────────────────
const allowedOrigins = [
    index_1.config.frontendUrl,
    'https://college-management-system-frontend-u7s6.onrender.com',
    'https://college-management-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:4173',
].filter(Boolean);

app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, mobile apps, server-to-server)
        if (!origin) return callback(null, true);
        // Allow any onrender.com subdomain (handles free-tier URL changes)
        const isOnrender = origin.endsWith('.onrender.com');
        if (isOnrender || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else if (process.env.NODE_ENV !== 'production') {
            callback(null, true); // Allow all in development
        } else {
            console.warn(`[CORS] Blocked origin: ${origin}`);
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── 5. Body Parsing ──────────────────────────────────────────────────────────
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));

// ─── 6. NoSQL Injection Prevention ────────────────────────────────────────────
// Sanitizes req.body, req.query, req.params against MongoDB operator injection
// e.g., { "email": { "$gt": "" } } → stripped to { "email": {} }
app.use((0, express_mongo_sanitize_1.default)({
    replaceWith: '_',          // Replace prohibited chars with _ instead of removing
    onSanitize: ({ req, key }) => {
        console.warn(`[SECURITY] NoSQL injection attempt detected. Key: "${key}" from IP: ${req.ip}`);
    },
}));

// ─── 7. XSS Prevention ────────────────────────────────────────────────────────
// Sanitizes all string inputs against Cross-Site Scripting payloads
app.use(xssSanitizer_1.xssSanitizer);

// ─── 8. HTTP Request Logging (Morgan → Winston) ───────────────────────────────
// Logs all HTTP requests to console (and in production, to a log file)
if (process.env.NODE_ENV !== 'test') {
    // Development: colored output
    if (process.env.NODE_ENV !== 'production') {
        app.use((0, morgan_1.default)('dev'));
    } else {
        // Production: Combined log format to file
        const logsDir = path_1.default.join(__dirname, '..', 'logs');
        if (!fs_1.default.existsSync(logsDir)) {
            fs_1.default.mkdirSync(logsDir, { recursive: true });
        }
        const accessLogStream = fs_1.default.createWriteStream(
            path_1.default.join(logsDir, 'access.log'),
            { flags: 'a' }
        );
        app.use((0, morgan_1.default)('combined', { stream: accessLogStream }));
        // Also log to console in production for cloud log aggregators
        app.use((0, morgan_1.default)('combined'));
    }
}

// ─── 9. Health Check ──────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// ─── 10.5 Tenant Scoping Middleware ──────────────────────────────────────────
const { tenantMiddleware } = require('./middleware/tenant');
app.use('/api/v1', tenantMiddleware);

// ─── 11. API Routes ───────────────────────────────────────────────────────────
// Apply stricter rate limit to auth endpoints to prevent brute-force
app.use('/api/v1/auth', process.env.NODE_ENV !== 'test' ? authLimiter : (req, res, next) => next(), auth_1.default);
app.use('/api/v1/dashboard', dashboard_1.default);
app.use('/api/v1/students', student_1.default);
app.use('/api/v1/teachers', teacher_1.default);
app.use('/api/v1/staff', staff_1.default);
app.use('/api/v1/finance', finance_1.default);
app.use('/api/v1/payroll', payroll_1.default);
app.use('/api/v1/classes', class_1.default);
app.use('/api/v1/projects', project_1.default);
app.use('/api/v1/attendance', attendance_1.default);
app.use('/api/v1/notifications', notification_1.default);
app.use('/api/v1/exams', exams_1.default);
app.use('/api/v1/reports', report_1.default);
app.use('/api/v1/library', library_1.default);

// ─── 12. Global Error Handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message, err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message,
        errorCode: err.errorCode || 'INTERNAL_ERROR',
    });
});

// ─── 13. 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// ─── Database Connection ───────────────────────────────────────────────────────
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('[DB] MongoDB connected successfully');
    } catch (error) {
        console.error('[DB] MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = async () => {
    try {
        await connectDB();
        startScheduler();
        app.listen(index_1.config.port, () => {
            console.log(`[SERVER] Running on port ${index_1.config.port} in ${process.env.NODE_ENV || 'development'} mode`);
            console.log(`[SECURITY] XSS protection: ✓ | NoSQL injection protection: ✓ | Rate limiting: ✓ | Helmet: ✓`);
        });
    } catch (error) {
        console.error('[SERVER] Failed to start:', error.message);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
}

exports.default = app;

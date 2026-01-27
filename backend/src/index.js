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
const index_1 = require("./config/index");
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
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
if (process.env.NODE_ENV !== 'test') {
    app.use(limiter);
}
// CORS
const allowedOrigins = [
    index_1.config.frontendUrl || 'http://localhost:5173',
    'http://localhost:5173',
    'http://localhost:3000',
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, true); // Allow all in development
        }
    },
    credentials: true,
}));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});
// Root route
app.get('/', (req, res) => {
    res.json({ message: 'College Management API is running' });
});
// Routes
app.use('/api/v1/auth', auth_1.default);
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
// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// Database connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};
// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(index_1.config.port, () => {
            console.log(`Server running on port ${index_1.config.port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
if (process.env.NODE_ENV !== 'test') {
    startServer();
}
exports.default = app;


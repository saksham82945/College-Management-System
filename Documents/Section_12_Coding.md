# 12. Coding Section (Project Implementation Source Code)

This expansive technical section details the core logic tiers powering the Application Context, including API controllers mapping explicit data definitions directly through Node.js Express routes to identical React interface hooks. All segments are explicitly declared mapping logical boundaries comprehensively simulating real-world operations cleanly.

### User Authentication & RBAC Schema Model
*Implementation Pathway: `backend/src/models/User.js`*

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active',
    },
    avatar: {
        type: String,
    },
    lastLogin: {
        type: Date,
    },
    roleAssignments: [
        {
            roleId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Role',
            },
            scopeId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Class',
            },
            assignedAt: {
                type: Date,
                default: Date.now,
            },
            assignedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    teacherProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    studentProfileId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
    },
}, { timestamps: true });
// Index for email
exports.User = mongoose_1.default.model('User', userSchema);
```

<div style="page-break-after: always;"></div>

### Student Demographics & Records Schema Model
*Implementation Pathway: `backend/src/models/Student.js`*

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Parent',
    },
    rollNo: {
        type: String,
        unique: true,
        required: true,
    },
    enrollmentYear: {
        type: Number,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    guardianInfo: {
        fatherName: String,
        motherName: String,
        fatherPhone: String,
        motherPhone: String,
        emergencyContact: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'graduated', 'suspended'],
        default: 'active',
    },
}, { timestamps: true });
// Indexes
studentSchema.index({ rollNo: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ userId: 1 });
exports.Student = mongoose_1.default.model('Student', studentSchema);
```

<div style="page-break-after: always;"></div>

### Faculty & Staff Information Schema Model
*Implementation Pathway: `backend/src/models/Teacher.js`*

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    qualification: {
        type: [String],
        required: true,
    },
    experience: {
        type: Number, // In years
        default: 0,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    subjects: [{
            type: String, // Can be refined to Subject model references later
        }],
    salary: {
        base: { type: Number, required: true },
        allowances: { type: Number, default: 0 },
        deductions: { type: Number, default: 0 },
    },
    status: {
        type: String,
        enum: ['active', 'on_leave', 'resigned', 'terminated'],
        default: 'active',
    },
    contactInfo: {
        phone: String,
        address: String,
    }
}, {
    timestamps: true,
});
exports.Teacher = mongoose_1.default.model('Teacher', teacherSchema);
```

<div style="page-break-after: always;"></div>

### Student Class Attendance Schema Model
*Implementation Pathway: `backend/src/models/Attendance.js`*

```javascript
'use strict';
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false
    },
    subject: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'],
        required: true,
        default: 'PRESENT'
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    remarks: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate entries per student per date per subject
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: false });

module.exports = mongoose.model('Attendance', attendanceSchema);
```

<div style="page-break-after: always;"></div>

### Academic Subject Entity Schema Model
*Implementation Pathway: `backend/src/models/Subject.js`*

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    credits: {
        type: Number,
    },
    teachers: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });
// Indexes
subjectSchema.index({ code: 1 });
exports.Subject = mongoose_1.default.model('Subject', subjectSchema);
```

<div style="page-break-after: always;"></div>

### System-wide Notification & Alerts Schema Model
*Implementation Pathway: `backend/src/models/Notification.js`*

```javascript
'use strict';
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['INFO', 'WARNING', 'SUCCESS', 'ERROR', 'ALERT'],
        default: 'INFO',
    },
    targetRole: {
        type: String,
        enum: ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF', 'ALL'],
        default: 'ALL',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    link: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

// Index for fast queries
notificationSchema.index({ isRead: 1, createdAt: -1 });
notificationSchema.index({ targetRole: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
```

<div style="page-break-after: always;"></div>

### Academic Class Timetable Schema Model
*Implementation Pathway: `backend/src/models/Timetable.js`*

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timetableSchema = new mongoose_1.default.Schema({
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    schedule: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            },
            periods: [
                {
                    periodNo: Number,
                    startTime: String,
                    endTime: String,
                    subjectId: mongoose_1.default.Schema.Types.ObjectId,
                    teacherId: mongoose_1.default.Schema.Types.ObjectId,
                    room: String,
                },
            ],
        },
    ],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, { timestamps: true });
// Indexes
timetableSchema.index({ classId: 1, academicYear: 1 });
exports.Timetable = mongoose_1.default.model('Timetable', timetableSchema);
```

<div style="page-break-after: always;"></div>

### Examination Scheduling Schema Model
*Implementation Pathway: `backend/src/models/Exam.js`*

```javascript
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        default: 'General'
    },
    type: {
        type: String,
        enum: ['Written', 'Practical', 'Online', 'Viva'],
        default: 'Written'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);
```

<div style="page-break-after: always;"></div>

### JWT Authentication Verification Middleware
*Implementation Pathway: `backend/src/middleware/auth.js`*

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new errors_1.AppError('No authentication token provided', 401, 'NO_TOKEN');
        }
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        if (!decoded) {
            throw new errors_1.AppError('Invalid or expired token', 401, 'INVALID_TOKEN');
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
exports.authMiddleware = authMiddleware;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
```

<div style="page-break-after: always;"></div>

### Frontend React Application Root Bootstrap
*Implementation Pathway: `frontend/src/main.jsx`*

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
  <App />
</React.StrictMode>);
```

<div style="page-break-after: always;"></div>

### Frontend React Application Main Router Matrix
*Implementation Pathway: `frontend/src/App.jsx`*

```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { routes } from '@/config/routes';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        }
    }
});

import { ThemeProvider } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

const AppRoutes = () => {
    const routing = useRoutes(routes);
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={window.location.pathname}
                initial={{ opacity: 0, scale: 0.99, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.01, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
                {routing}
            </motion.div>
        </AnimatePresence>
    );
};

const Spinner = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50 dark:bg-slate-950 gap-6">
        <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem] animate-pulse"></div>
            <div className="absolute inset-0 border-t-4 border-primary rounded-[2rem] animate-spin-slow"></div>
        </div>
        <div className="text-center">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase text-slate-400 animate-pulse">Initializing Interface</p>
        </div>
    </div>
);

function App() {
    const { hydrate, isInitialized } = useAuthStore();
    useEffect(() => {
        hydrate();
    }, [hydrate]);

    if (!isInitialized) return <Spinner />;

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Router>
                    <ErrorBoundary>
                        <React.Suspense fallback={<Spinner />}>
                            <AppRoutes />
                        </React.Suspense>
                    </ErrorBoundary>
                </Router>
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            borderRadius: '24px',
                            fontWeight: 700,
                            fontSize: '13px',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                            border: '1px solid var(--border)',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                            padding: '16px 24px',
                        },
                    }}
                />
            </ThemeProvider>
        </QueryClientProvider>
    );
}


export default App;
```

<div style="page-break-after: always;"></div>

### Global Tailwind CSS Utilities Definitions
*Implementation Pathway: `frontend/src/index.css`*

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 99 102 241;
    --secondary: 139 92 246;
    --success: 16 185 129;
    --warning: 245 158 11;
    --danger: 239 68 68;
    --info: 59 130 246;
    
    --background: 248 250 252;
    --foreground: 15 23 42;
    
    --card: 255 255 255;
    --card-foreground: 15 23 42;
    
    --border: 226 232 240;
    --input: 226 232 240;
    --ring: 99 102 241;

    /* Role Themes - Light */
    --admin-gradient: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
    --teacher-gradient: linear-gradient(135deg, #0ea5e9 0%, #0891b2 100%);
    --student-gradient: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  }

  .dark {
    --background: 2 6 23;
    --foreground: 248 250 252;
    
    --card: 15 23 42;
    --card-foreground: 248 250 252;
    
    --border: 30 41 59;
    --input: 30 41 59;
    --ring: 129 140 248;
  }

  body {
    @apply bg-slate-50 text-slate-900 transition-colors duration-500 min-h-screen relative overflow-x-hidden;
    font-family: 'Inter', sans-serif;
    background-image: radial-gradient(circle at 50% -20%, #e2e8f0 0%, transparent 60%);
  }

  .dark body {
    @apply bg-[#020617] text-slate-50;
    background-image: 
      radial-gradient(circle at 50% -20%, #1e1b4b 0%, transparent 65%),
      linear-gradient(to bottom, #020617, #020617);
  }

  /* Dot Grid Pattern */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.15;
    pointer-events: none;
    z-index: -1;
  }

  .dark body::before {
    background-image: radial-gradient(#1e293b 1px, transparent 1px);
    opacity: 0.4;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/5 shadow-2xl;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  .animate-spin-slow {
    animation: spin 3s linear infinite;
  }

  .role-admin { @apply from-violet-600 to-indigo-600; }
  .role-teacher { @apply from-sky-500 to-cyan-600; }
  .role-student { @apply from-emerald-500 to-cyan-500; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  @apply bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-800 rounded-full border-4 border-slate-50 dark:border-slate-950 hover:bg-slate-400 dark:hover:bg-slate-700 transition-all;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Outfit', sans-serif;
}
```

<div style="page-break-after: always;"></div>

### Public CMS Entry Landing Page View
*Implementation Pathway: `frontend/src/pages/LandingPage.jsx`*

```jsx
import React, { useEffect, useState, useRef } from 'react';
import { PublicHeader } from '@/components/PublicHeader';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, ArrowUp, BookOpen, Users, Award, Building2, GraduationCap,
    Globe, ChevronRight, MapPin, Activity,
    Phone, Mail, CheckCircle, Star, TrendingUp, Zap, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';




const slides = [
    {
        id: 0,
        tagline: "51st Annual Day Celebration 2024",
        title: "L.N. Mishra",
        subtitle: "Institute",
        highlight: "of Excellence",
        desc: "Bihar's premier management and technology institute, shaping future leaders since 1973 through industry-aligned programs and research.",
        bg: "/assets/images/lnmi/s1.jpeg",
        badge: "Est. 1973",
        overlayFrom: "from-slate-950/85",
    },
    {
        id: 1,
        tagline: "State-of-the-Art Auditorium",
        title: "World-Class",
        subtitle: "Learning",
        highlight: "Infrastructure",
        desc: "Our modern auditorium hosts convocations, national guest lectures and seminars with 1200+ seating capacity.",
        bg: "/assets/images/lnmi/s2.jpeg",
        badge: "1200+ Capacity",
        overlayFrom: "from-indigo-950/80",
    },
    {
        id: 2,
        tagline: "Campus Illuminated — Festive Celebrations",
        title: "A Campus",
        subtitle: "That Comes",
        highlight: "Alive at Night",
        desc: "Every festival, every milestone — LNMI comes alive with light and celebration, fostering a vibrant community spirit.",
        bg: "/assets/images/lnmi/lnmi-night1.webp",
        badge: "Vibrant Community",
        overlayFrom: "from-slate-950/75",
    },
    {
        id: 3,
        tagline: "L.N. Mishra Institute — Illuminated",
        title: "Where Tradition",
        subtitle: "Meets",
        highlight: "Modern Vision",
        desc: "The iconic LNMI Administrative Block, beautifully lit, symbolizing 50+ years of academic brilliance and institutional pride.",
        bg: "/assets/images/lnmi/lnmi-night2.webp",
        badge: "50+ Years",
        overlayFrom: "from-slate-950/70",
    },
    {
        id: 4,
        tagline: "Advanced Computing Facility",
        title: "Technology-Driven",
        subtitle: "Academic",
        highlight: "Environment",
        desc: "Equipped with 300+ modern workstations, our computing labs power research and hands-on learning in cutting-edge disciplines.",
        bg: "/assets/images/lnmi/s3.webp",
        badge: "300+ Workstations",
        overlayFrom: "from-slate-950/80",
    },
];

const stats = [
    { icon: Users, label: "Students Enrolled", value: "3,500+", color: "from-indigo-500 to-blue-600" },
    { icon: GraduationCap, label: "Faculty Members", value: "150+", color: "from-violet-500 to-purple-600" },
    { icon: Award, label: "Courses Offered", value: "25+", color: "from-emerald-500 to-teal-600" },
    { icon: Building2, label: "Years of Excellence", value: "50+", color: "from-amber-500 to-orange-600" },
];

const programs = [
    { name: "MBA", full: "Master of Business Administration", icon: TrendingUp, semesters: 4, color: "from-purple-600 to-indigo-600" },
    { name: "MCA", full: "Master of Computer Applications", icon: Zap, semesters: 4, color: "from-sky-600 to-cyan-600" },
    { name: "BBA", full: "Bachelor of Business Administration", icon: BookOpen, semesters: 6, color: "from-emerald-600 to-green-600" },
    { name: "BCA", full: "Bachelor of Computer Applications", icon: Shield, semesters: 6, color: "from-rose-600 to-pink-600" },
];

const announcements = [
    { title: "MBA Orientation 2024-25 scheduled for August 10", date: "05 Aug", type: "ANNOUNCEMENT", color: "bg-indigo-500" },
    { title: "MCA Entrance Exam Phase II Results Published", date: "02 Aug", type: "RESULT", color: "bg-emerald-500" },
    { title: "Campus Placement Drive: 20+ MNCs Expected", date: "28 Jul", type: "PLACEMENT", color: "bg-amber-500" },
];

const gallery = [
    { src: "/assets/images/lnmi/s1.jpeg", caption: "51st Annual Celebration" },
    { src: "/assets/images/lnmi/lnmi-night1.webp", caption: "Festive Illumination" },
    { src: "/assets/images/lnmi/s2.jpeg", caption: "Modern Auditorium" },
    { src: "/assets/images/lnmi/lnmi-night2.webp", caption: "LNMI at Night" },
    { src: "/assets/images/lnmi/s3.webp", caption: "Computing Labs" },
    { src: "/assets/images/lnmi/lnmi3.jpeg", caption: "Campus Life" },
];

const SLIDE_DURATION = 6000;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export const LandingPage = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const intervalRef = useRef(null);

    const resetInterval = () => {
        setProgress(0);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    setCurrent(c => (c + 1) % slides.length);
                    return 0;
                }
                return p + (100 / (SLIDE_DURATION / 100));
            });
        }, 100);
    };

    useEffect(() => {
        resetInterval();
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            clearInterval(intervalRef.current);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const goToSlide = (idx) => {
        setCurrent(idx);
        resetInterval();
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const slide = slides[current];

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
            <PublicHeader />

            {/* ─── HERO ─── */}
            <section className="relative h-screen min-h-[680px] flex items-center overflow-hidden pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={slide.bg}
                            alt="LNMI Campus"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayFrom} via-slate-900/50 to-transparent`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-6 lg:px-16">
                    <div className="max-w-3xl">
                        {/* Tagline */}
                        <motion.div
                            key={`tag-${current}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="h-[2px] w-10 bg-indigo-400" />
                            <span className="text-indigo-300 text-xs font-black uppercase tracking-[0.35em]">
                                {slide.tagline}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`title-${current}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[0.95] mb-5 drop-shadow-2xl">
                                    {slide.title}
                                    <span className="block text-slate-300 mt-1">{slide.subtitle}</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-1">
                                        {slide.highlight}
                                    </span>
                                </h1>
                                <p className="text-white/70 text-base md:text-lg font-medium mb-10 max-w-xl leading-relaxed">
                                    {slide.desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <button
                                onClick={() => navigate('/login')}
                                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all duration-300 active:scale-95"
                            >
                                Student Portal
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all duration-300">
                                Apply Now
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Slide badge (desktop) */}
                <motion.div
                    key={`badge-${current}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute bottom-28 right-10 lg:right-16 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl text-white font-black text-sm uppercase tracking-widest hidden md:block"
                >
                    {slide.badge}
                </motion.div>

               
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className="relative overflow-hidden rounded-full transition-all duration-500"
                            style={{ width: current === i ? 48 : 10, height: 5 }}
                        >
                            <span className="absolute inset-0 bg-white/30 rounded-full" />
                            {current === i && (
                                <motion.span
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="absolute inset-y-0 left-0 bg-indigo-400 rounded-full"
                                />
                            )}
                        </button>
                    ))}
                </div>

                
                <div className="absolute bottom-10 right-10 text-white/40 font-black text-xs uppercase tracking-widest hidden md:block">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 rounded-3xl transition-opacity`} />
                                <div className="relative bg-slate-900/80 rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-5 shadow-lg`}>
                                        <stat.icon size={22} className="text-white" />
                                    </div>
                                    <div className="text-4xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ─── ABOUT ─── */}
            <section id="about" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Image collage */}
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="col-span-2 h-64 rounded-3xl overflow-hidden shadow-2xl"
                                >
                                    <img src="/assets/images/lnmi/s1.jpeg" alt="Annual Day" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night1.webp" alt="Night View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 }}
                                    className="h-48 rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img src="/assets/images/lnmi/lnmi-night2.webp" alt="Illuminated Building" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </motion.div>
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-6 rounded-3xl shadow-2xl"
                            >
                                <div className="text-4xl font-black leading-none">51st</div>
                                <div className="text-xs font-black uppercase tracking-widest text-indigo-200 mt-1">Annual Day 2024</div>
                            </motion.div>
                        </div>

                        {/* Text */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Our Institutional Identity</span>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1.05]">
                                    A Legacy of <br />
                                    <span className="text-indigo-600 italic">Excellence</span> &amp;
                                    <br />Achievement
                                </h2>
                            </div>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                L.N.M Institute (LNMI) stands as a premier autonomous institution under the Government of Bihar. For over five decades, we have been at the forefront of management and information technology education, nurturing thousands of professionals who lead global organizations today.
                            </p>
                            <div className="grid grid-cols-2 gap-5">
                                {[
                                    { label: "AICTE Approved", icon: CheckCircle },
                                    { label: "UGC Recognized", icon: CheckCircle },
                                    { label: "Government of Bihar", icon: Shield },
                                    { label: "100% Placement Record", icon: Star },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <item.icon size={18} className="text-indigo-500 shrink-0" />
                                        <span className="text-sm font-black text-slate-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl"
                            >
                                Explore Institute
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PROGRAMS ─── */}
            <section id="academics" className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Academic Offerings</span>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Our Programmes</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {programs.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <prog.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">{prog.name}</h3>
                                <p className="text-sm text-slate-500 font-bold leading-snug mb-6">{prog.full}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">{prog.semesters} Semesters</span>
                                    <ChevronRight size={18} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── NIGHT CAMPUS FEATURE ─── */}
            <section className="py-0 relative overflow-hidden">
                <div className="grid md:grid-cols-2 h-[500px]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night1.webp"
                            alt="LNMI Night Illumination"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 block mb-2">Festive Ambience</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">LNMI Illuminated</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">Colourful celebrations lighting up the campus</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 }}
                        className="relative overflow-hidden group"
                    >
                        <img
                            src="/assets/images/lnmi/lnmi-night2.webp"
                            alt="LNMI Admin Block Night"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 block mb-2">Administrative Block</span>
                            <h3 className="text-3xl font-black text-white tracking-tighter">L.N. Mishra Institute</h3>
                            <p className="text-white/60 text-sm font-bold mt-2">50+ years of academic brilliance</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── ADMISSIONS BANNER ─── */}
            <section id="admissions" className="py-32 relative overflow-hidden bg-indigo-950">
                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950" />
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest text-white/80">Admissions Open — Batch 2025-26</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                                Begin Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">Professional</span>
                                Journey with LNMI
                            </h2>
                            <p className="text-white/60 text-lg font-medium leading-relaxed max-w-md">
                                Secure your place in Bihar's most prestigious management institute. Applications for MBA, MCA, BCA, and BBA programmes are now open.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="group flex items-center gap-3 px-8 py-4 bg-white text-indigo-900 font-black text-sm uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-indigo-50 transition-all active:scale-95"
                                >
                                    Apply Online
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
                                    Download Prospectus
                                </button>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <motion.div
                                initial={{ opacity: 0, rotate: -3 }}
                                whileInView={{ opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl"
                            >
                                <img src="/assets/images/lnmi/s2.jpeg" alt="LNMI Auditorium" className="w-full h-80 object-cover" />
                            </motion.div>
                            <div className="absolute -bottom-6 -left-6 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl">
                                <div className="text-2xl font-black leading-none">100%</div>
                                <div className="text-xs font-black uppercase tracking-widest text-emerald-100 mt-0.5">Placement Record</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── RESEARCH ─── */}
            <section id="research" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="text-center mb-20">
                        <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Innovation & Discovery</span>
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Research Ecosystem</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">Socio-Economic Focus</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">A rich legacy of conducting societal research to empower communities and influence effective policy making.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Building2 size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">National Projects</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">Actively collaborating with Government bodies on pivotal state and national socio-economic development projects.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-3 text-slate-900">Publications</h3>
                            <p className="text-slate-500 font-medium max-w-sm mx-auto">Hundreds of distinguished research papers authored by our esteemed faculty in reported international journals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PORTFOLIO & PLACEMENTS ─── */}
            <section id="portfolio" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16 text-center">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Corporate Connections</span>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900 mb-12">Placements & Portfolio</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform">
                            <div className="text-4xl font-black text-emerald-500 mb-2">16.4 LPA</div>
                            <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Highest Package</div>
                            <p className="text-slate-500 text-xs mt-3 font-medium">Achieved in the latest 2024-25 placement drive</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform">
                            <div className="text-xl font-black text-slate-900 mb-4">Top Recruiters</div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {['ICICI Bank', 'HDFC Bank', 'Amul', 'Federal Bank', 'Vodafone Idea'].map(company => (
                                    <span key={company} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{company}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform">
                            <div className="text-4xl font-black text-indigo-500 mb-2">30,000+</div>
                            <div className="text-sm font-black text-slate-900 uppercase tracking-widest">Alumni Network</div>
                            <p className="text-slate-500 text-xs mt-3 font-medium">A strong global community of successful professionals in leadership roles</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── GALLERY STRIP ─── */}
            <section id="campus" className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-16 mb-12 text-center">
                    <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Campus Life</span>
                    <h2 className="text-4xl font-black tracking-tighter text-slate-900">Life at LNMI</h2>
                </div>
                <div className="flex gap-4 px-6 lg:px-16 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                    {gallery.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                            className="shrink-0 snap-start w-72 h-52 rounded-3xl overflow-hidden shadow-xl group relative"
                        >
                            <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                <span className="text-white text-xs font-black uppercase tracking-widest">{img.caption}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── NOTICES ─── */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
                        <div>
                            <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-xs mb-3 block">Latest Updates</span>
                            <h2 className="text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-4">
                                <Activity className="text-indigo-500" size={36} />
                                Notices &amp; Events
                            </h2>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest rounded-2xl hover:border-indigo-500 hover:text-indigo-600 transition-all">
                            View All <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {announcements.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 group cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`${item.color} text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>
                                        {item.type}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-indigo-600 leading-none">{item.date.split(' ')[0]}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date.split(' ')[1]}</div>
                                    </div>
                                </div>
                                <h4 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors mb-8">
                                    {item.title}
                                </h4>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Read More</span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="bg-slate-950 text-white pt-24 pb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40" />
                <div className="container mx-auto px-6 lg:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-indigo-600 flex items-center justify-center rounded-2xl shadow-lg font-black text-white text-xl">LN</div>
                                <div>
                                    <h2 className="text-2xl font-black tracking-tighter leading-none">LNMI <span className="text-indigo-400">.</span></h2>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mt-0.5">Excellence Since 1973</p>
                                </div>
                            </div>
                            <p className="text-slate-500 leading-relaxed font-medium text-sm max-w-sm italic">
                                "The task of the educational institution is to shape not just careers, but characters that define the future of our nation."
                            </p>
                            <div className="flex gap-3">
                                {[Globe, MapPin, Phone, Mail].map((Icon, i) => (
                                    <div key={i} className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all cursor-pointer">
                                        <Icon size={17} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-10">
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Academics</h4>
                                {["Course Curriculum", "Faculty Profiles", "Research Projects", "Library Catalog"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Administration</h4>
                                {["Admissions", "Academic Calendar", "Fee Structure", "Grievance Cell"].map(l => (
                                    <a key={l} href="#" className="block text-sm font-bold hover:text-indigo-400 transition-colors">{l}</a>
                                ))}
                            </div>
                            <div className="hidden lg:block space-y-5 text-slate-500">
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Contact</h4>
                                <div className="text-sm font-bold leading-relaxed">1, Nehru Marg, Patna<br />Bihar — 800001</div>
                                <div className="text-indigo-400 font-bold text-sm">+91 612 252 2320</div>
                                <div className="text-slate-500 font-bold text-sm">info@lnmi.ac.in</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-900">
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2024 L.N. Mishra Institute • Govt. of Bihar • All Rights Reserved</div>
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2">
                            Engineered by <span className="text-indigo-400">Saksham</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ─── SCROLL TO TOP BUTTON ─── */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-[90] p-4 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/30 hover:bg-indigo-500 transition-all hover:-translate-y-1 group"
                    >
                        <ArrowUp size={24} className="group-hover:animate-bounce" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
```

<div style="page-break-after: always;"></div>

### User Secure Login Interface View
*Implementation Pathway: `frontend/src/pages/LoginPage.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Lock, Mail, Shield, Eye, EyeOff, GraduationCap, 
    BookOpen, UserCircle, ArrowRight, Sparkles, Activity,
    ChevronLeft, ShieldCheck, Zap
} from 'lucide-react';

export const LoginPage = () => {
    const [step, setStep] = useState('ROLE_SELECT'); // ROLE_SELECT or LOGIN_FORM
    const [selectedRole, setSelectedRole] = useState('STUDENT');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { isDarkMode } = useTheme();

    const roles = [
        { id: 'ADMIN', title: 'Admin', icon: Shield, color: 'from-purple-500 to-indigo-600', description: 'Administration' },
        { id: 'TEACHER', title: 'Teacher', icon: BookOpen, color: 'from-sky-500 to-cyan-600', description: 'Faculty & Academics' },
        { id: 'STUDENT', title: 'Student', icon: GraduationCap, color: 'from-emerald-500 to-cyan-500', description: 'Student Portal' },
    ];

    const activeRoleData = roles.find(r => r.id === selectedRole);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/login', {
                email,
                password,
                role: selectedRole
            });
            const { user, tokens } = response.data.data;
            const userRoles = user.roles || [];
            
            if (!userRoles.includes(selectedRole)) {
                toast.error(`Access denied. You do not have ${selectedRole} permissions.`);
                setLoading(false);
                return;
            }

            login(user, tokens.accessToken, tokens.refreshToken);
            toast.success(`Welcome back, ${user.fullName.split(' ')[0]}.`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Authentication Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex overflow-hidden bg-slate-950">
            {/* Authentication Section */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#0b0f1a] relative overflow-hidden">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0 text-white">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className={`absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-gradient-to-br ${activeRoleData.color}`} 
                    />
                </div>

                <div className="relative z-10 flex flex-col h-full px-12 py-8">
                    {/* Top Navigation */}
                    <div className="flex justify-between items-center mb-16">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={16} />
                            Return to Homepage
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col justify-center max-w-[440px] mx-auto w-full">
                        <AnimatePresence mode="wait">
                            {step === 'ROLE_SELECT' ? (
                                <motion.div
                                    key="role-select"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                                <ShieldCheck className="text-white" size={24} />
                                            </div>
                                            <div className="text-xl font-black text-white tracking-tighter">LNMI Portal</div>
                                        </div>
                                        <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">
                                            Account Selection
                                        </h1>
                                        <p className="text-slate-400 font-medium text-lg leading-relaxed">
                                            Select your role to continue to the login page.
                                        </p>
                                    </div>

                                    <div className="grid gap-4">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => {
                                                    setSelectedRole(role.id);
                                                    setStep('LOGIN_FORM');
                                                }}
                                                className="group relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-6 text-left"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <role.icon size={28} />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-white tracking-tight">{role.title} Portal</h3>
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{role.description}</p>
                                                </div>
                                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ArrowRight className="text-primary" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <button 
                                        onClick={() => setStep('ROLE_SELECT')}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6"
                                    >
                                        <ChevronLeft size={16} />
                                        Back to selection
                                    </button>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end mb-4">
                                            <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                                                Account Login
                                            </h1>
                                            {selectedRole === 'STUDENT' && (
                                                <button 
                                                    onClick={() => navigate('/signup')} 
                                                    className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors pb-1"
                                                >
                                                    Create Account
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-slate-400 font-medium text-lg tracking-tight">
                                            Sign in to your <span className="text-white font-black uppercase text-sm tracking-widest">{selectedRole}</span> account.
                                        </p>
                                    </div>

                                    <form onSubmit={handleLogin} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="user@lnmi.ac.in"
                                                    required
                                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center ml-2">
                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Account Password</label>
                                                <button type="button" onClick={() => navigate('/reset-password')} className="text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:text-white transition-colors">Forgot Password?</button>
                                            </div>
                                            <div className="relative group">
                                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="••••••••"
                                                    required
                                                    className="w-full pl-16 pr-16 py-5 bg-white/5 border border-white/10 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-white placeholder:text-slate-600 font-medium text-base"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full py-6 rounded-[1.5rem] text-white font-black text-sm uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-70 disabled:pointer-events-none group shadow-2xl relative overflow-hidden bg-gradient-to-r ${activeRoleData.color}`}
                                        >
                                            {loading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <span>Sign In</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="pt-6 text-center">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                                            Institutional Access Portal
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Legal Links */}
                    <div className="mt-8 flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
                        <button className="hover:text-slate-400">Privacy Policy</button>
                        <button className="hover:text-slate-400">Security Terms</button>
                    </div>
                </div>
            </div>

            {/* Branding Section */}
            <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center p-20 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeRoleData.color} transition-colors duration-1000`} />
                
                {/* Visual Depth Particles */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [-10, 10, -10],
                                x: [-10, 10, -10],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bg-white/10 blur-sm rounded-full"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 w-full max-w-lg space-y-12">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card bg-white/10 backdrop-blur-3xl p-16 rounded-[4rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-3 w-max rounded-2xl bg-white/20 mb-10">
                            <Sparkles className="text-white" size={32} />
                        </div>
                        <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
                            Institutional <br /> Excellence
                        </h2>
                        <p className="text-xl text-white/70 font-medium leading-relaxed mb-12">
                            Lalit Narayan Mishra Institute of Economic Development and Social Change, Patna.
                        </p>

                        <div className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-black/20 border border-white/10">
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i + activeRoleData.id}`} alt="User" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-[#0b0f1a] bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">+5k</div>
                            </div>
                            <div>
                                <div className="text-white font-black tracking-tight">Account Verified</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Secure login active</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-between items-center px-6">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Status: Active</span>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">LNMI Portal</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
```

<div style="page-break-after: always;"></div>

### User & Admin Protected Analytics Dashboard View
*Implementation Pathway: `frontend/src/pages/Dashboard.jsx`*

```jsx
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { 
    Users, GraduationCap, DollarSign, TrendingUp, CreditCard, 
    Calendar as CalendarIcon, ArrowRight, CheckCircle, XCircle, 
    Zap, Activity, Target, Landmark, LayoutDashboard,
    PieChart, Clock, ShieldCheck, UserPlus
} from 'lucide-react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { apiClient } from '@/services/api';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentDashboard } from '@/pages/StudentDashboard';
import { TeacherDashboard } from '@/pages/TeacherDashboard';
import { StatCard } from '@/components/dashboard/StatCard';
import { PageHeader } from '@/components/PageHeader';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { isDarkMode, roleTheme } = useTheme();

    const role = user?.roles?.[0]?.toUpperCase();

    if (role === 'STUDENT') return <StudentDashboard />;
    if (role === 'TEACHER') return <TeacherDashboard />;

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalRevenue: 0,
        pendingFees: 0,
        attendance: { total: 0, present: 0, absent: 0, presentPct: 0 },
        recentAdmissions: [],
        chartData: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminStats();
    }, []);

    const fetchAdminStats = async () => {
        try {
            const response = await apiClient.get('/dashboard/admin');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[80vh] gap-6">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-primary/10 rounded-[2rem] animate-pulse"></div>
                        <div className="absolute inset-2 border-4 border-primary/20 rounded-[1.5rem] animate-pulse delay-75"></div>
                        <div className="absolute inset-0 border-t-4 border-primary rounded-[2rem] animate-spin-slow"></div>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-black text-slate-400 tracking-[0.3em] uppercase mb-1">Loading Dashboard</p>
                        <p className="text-[10px] font-bold text-slate-500 italic">Loading records...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24"
            >
                {/* Dashboard Header */}
                <PageHeader
                    title={`Admin Dashboard`}
                    subtitle={`Oversee college operations and metrics.`}
                    icon={LayoutDashboard}
                    description={`Administrator: ${user?.fullName || 'Admin Access'}`}
                />

                {/* Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard 
                        title="Total Students" 
                        value={stats.totalStudents} 
                        icon={Users} 
                        color="text-indigo-500" 
                        bg="bg-indigo-500/10" 
                        trend={12.4}
                        onClick={() => navigate('/students')}
                    />
                    <StatCard 
                        title="Total Teachers" 
                        value={stats.totalTeachers} 
                        icon={GraduationCap} 
                        color="text-sky-500" 
                        bg="bg-sky-500/10" 
                        trend={3.2}
                        onClick={() => navigate('/staff')}
                    />
                    <StatCard 
                        title="Total Fee Collection" 
                        value={stats.totalRevenue > 0 ? `₹${(stats.totalRevenue / 1000).toFixed(1)}k` : '₹0'} 
                        icon={Landmark} 
                        color="text-emerald-500" 
                        bg="bg-emerald-500/10" 
                        trend={8.5}
                    />
                    <StatCard 
                        title="Student Attendance" 
                        value={stats.attendance?.total > 0 ? `${stats.attendance.presentPct}%` : '0%'} 
                        icon={Activity} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                        trend={-1.8}
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Financial Overview */}
                    <motion.div variants={itemVariants} className={`lg:col-span-2 p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden flex flex-col glass-card
143:                         ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fee Collection Overview</h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Monthly collection analytics</p>
                            </div>
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl shadow-inner">
                                <TrendingUp size={20} />
                            </div>
                        </div>

                        {stats.chartData?.length > 0 ? (
                            <div className="h-[400px] w-full mt-auto relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chartData}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#1e293b' : '#f1f5f9'} />
                                        <XAxis 
                                            dataKey="name" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                            dy={15} 
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 10, fontWeight: 800 }} 
                                        />
                                        <Tooltip 
                                            cursor={{ stroke: 'var(--primary)', strokeWidth: 2, strokeDasharray: '5 5' }}
                                            contentStyle={{ 
                                                backgroundColor: isDarkMode ? '#0f172a' : '#fff', 
                                                border: isDarkMode ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                                                borderRadius: '24px',
                                                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                                                padding: '12px 16px'
                                            }} 
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="revenue" 
                                            stroke="var(--primary)" 
                                            strokeWidth={6} 
                                            fillOpacity={1} 
                                            fill="url(#colorRevenue)" 
                                            activeDot={{ r: 10, fill: 'var(--primary)', stroke: isDarkMode ? '#0f172a' : '#fff', strokeWidth: 4 }} 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="h-[400px] flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-800/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 mt-auto">
                                <motion.div 
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    <Landmark size={64} className="text-slate-200 dark:text-slate-700 mb-6" />
                                </motion.div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">No Transaction Data Available</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Secondary Intelligence Column */}
                    <div className="space-y-10">
                        {/* Real-time Entry Feed */}
                        <motion.div variants={itemVariants} className={`p-10 rounded-[3rem] border transition-all duration-500 glass-card
                            ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                                    <Clock size={20} />
                                </div>
                                <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>New Admissions</h3>
                            </div>
                            
                            <div className="space-y-6">
                                {stats.recentAdmissions?.length > 0 ? (
                                    stats.recentAdmissions.slice(0, 5).map((student, i) => (
                                        <div key={i} className="flex gap-4 items-center group cursor-pointer p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110
                                                ${isDarkMode ? 'bg-slate-800 text-primary shadow-lg shadow-black/20' : 'bg-white text-primary shadow-sm'}`}>
                                                <UserPlus size={18} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className={`text-sm font-black truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    {student.userId?.fullName || 'Anonymous User'}
                                                </p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                                                    {student.course} • Term {student.semester || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <ArrowRight size={16} className="text-primary" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                                        <Users size={32} className="mx-auto mb-4 text-slate-100 dark:text-slate-800" />
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-relaxed px-4">No recent admission activity</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Presence Analysis Widget */}
                        <motion.div variants={itemVariants} className={`p-10 rounded-[3rem] border transition-all duration-500 glass-card
                            ${isDarkMode ? 'bg-primary/5 border-primary/10' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-success/10 text-success rounded-2xl">
                                    <ShieldCheck size={20} />
                                </div>
                                <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Attendance Summary</h3>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Students Present</span>
                                    <div className="flex items-baseline gap-1">
                                        <p className={`text-3xl font-black ${isDarkMode ? 'text-success' : 'text-emerald-600'}`}>
                                            {stats.attendance.present}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Pax</span>
                                    </div>
                                </div>
                                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Students Absent</span>
                                    <div className="flex items-baseline gap-1">
                                        <p className={`text-3xl font-black ${isDarkMode ? 'text-danger' : 'text-red-600'}`}>
                                            {stats.attendance.absent}
                                        </p>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Pax</span>
                                    </div>
                                </div>
                            </div>

                            {/* Aggregated Health Progress */}
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Overall Attendance</span>
                                    <span className="text-sm font-black text-primary">{stats.attendance.presentPct}%</span>
                                </div>
                                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stats.attendance.presentPct}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-shimmer scale-x-150" />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Student Ledger Management Interface View
*Implementation Pathway: `frontend/src/pages/StudentsPage.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button, DataTable, Input, Modal } from '@/components';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { Plus, GraduationCap, Search, Filter, User, Mail, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';

export const StudentsPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [page, searchTerm]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/students?page=${page}&size=25&search=${searchTerm}`);
            const d = response.data.data;
            if (d && d.students) {
                setStudents(d.students);
                setTotal(d.total || d.students.length);
            } else if (Array.isArray(d)) {
                setStudents(d);
                setTotal(d.length);
            } else {
                setStudents([]);
                setTotal(0);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch students');
            console.error('Fetch Students Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await apiClient.delete(`/students/${id}`);
            toast.success('Student deleted successfully');
            fetchStudents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete student');
        }
    };

    const columns = [
        { 
            key: 'name', 
            label: 'Student Name', 
            render: (v, row) => (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className={`absolute -inset-1 bg-gradient-to-br ${roleTheme} rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-sm`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleTheme} text-white flex items-center justify-center text-sm font-black shrink-0 relative z-10 shadow-lg`}>
                            {(row.name || row.fullName || 'S')[0]}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{row.name || row.fullName}</span>
                        <div className="flex items-center gap-1.5 opacity-50">
                            <Mail size={10} />
                            <span className="text-[10px] font-bold truncate max-w-[150px]">{row.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        { 
            key: 'rollNo', 
            label: 'Roll Number', 
            render: (v) => v ? (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary/60" />
                    <span className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-primary-light' : 'text-primary-dark'}`}>{v}</span>
                </div>
            ) : '—' 
        },
        { 
            key: 'course', 
            label: 'Course', 
            render: (v) => v ? (
                <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500 whitespace-nowrap inline-block">
                    {v}
                </div>
            ) : '—'
        },
        { 
            key: 'semester', 
            label: 'Semester', 
            render: (v) => <span className="font-bold text-sm">Sem {v || '—'}</span> 
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value === 'active' ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-50'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        value === 'active' ? 'text-success' : 'text-slate-500'
                     }`}>
                        {value || 'active'}
                    </span>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Options',
            render: (_, row) => (
                isAdmin ? (
                    <Button 
                        variant="danger" 
                        size="xs" 
                        icon={Trash2}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row._id || row.id);
                        }}
                    >
                        Delete
                    </Button>
                ) : (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">—</span>
                )
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Student Registry"
                    subtitle={`List of all ${total} registered students`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/students/add')}
                        >
                            Add Student
                        </Button>
                    }
                />

                <div className="space-y-6">
                    {/* Search & Intelligence Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Search by name, roll number, or course..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all ${
                                    isDarkMode 
                                    ? 'bg-slate-900/50 border-slate-800 text-white focus:border-primary' 
                                    : 'bg-white border-slate-100 text-slate-900 focus:border-primary shadow-sm'
                                }`}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Filter Results
                        </Button>
                    </div>

                    {/* Data Matrix */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        <DataTable 
                            columns={columns} 
                            data={students} 
                            loading={loading}
                            emptyTitle="No students found"
                            emptyDescription="Try adjusting your search filters to find the student you're looking for."
                            onRowClick={(row) => navigate(`/students/${row._id || row.id}`)}
                        />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Faculty Directory Interface View
*Implementation Pathway: `frontend/src/pages/TeachersPage.jsx`*

```jsx
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useResource } from '@/hooks/useResource';
import { Plus, Search, Mail, Phone, BookOpen, ArrowLeft, UserPlus, Edit2, Trash2, Filter, GraduationCap, Award, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, PageHeader } from '@/components';
import { useTheme } from '@/context/ThemeContext';

export const TeachersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { data: teachers, loading, remove } = useResource({ endpoint: '/teachers' });

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate faculty appointment from digital registry?')) return;
        await remove(id);
    };

    const filteredTeachers = teachers.filter(teacher => 
        (teacher.userId?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.employeeId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Faculty Directorate"
                    subtitle={`${teachers.length} academic professionals registered`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/teachers/add')}
                        >
                            Commission Faculty
                        </Button>
                    }
                />

                <div className="space-y-8">
                    {/* Intelligence & Navigation Grid */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Input 
                                type="search" 
                                placeholder="Quantum search by faculty name, ID, or tenure..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={Search}
                                className="!space-y-0"
                            />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Tenure Filters
                        </Button>
                    </div>

                    {/* Faculty Matrix */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                                <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Accessing Archives</span>
                        </div>
                    ) : filteredTeachers.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                                <UserPlus className="text-slate-400" size={40}/>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-2">Registry Vacant</h3>
                            <p className="text-slate-500 max-w-sm text-center mb-8 font-bold text-sm uppercase tracking-tighter opacity-60">
                                No academic personnel identified in current digital footprint.
                            </p>
                            <Button variant="primary" onClick={() => navigate('/teachers/add')} icon={Plus}>
                                Register First Faculty
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredTeachers.map((teacher, i) => (
                                    <motion.div 
                                        key={teacher._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                                        <div className="relative glass-card rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
                                            <div className="p-8">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="relative">
                                                        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${roleTheme || 'from-primary to-secondary'} flex items-center justify-center text-white font-black text-2xl shadow-xl relative z-10`}>
                                                            {teacher.userId?.fullName?.charAt(0) || '?'}
                                                        </div>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                        teacher.status === 'active' 
                                                        ? 'bg-success/10 text-success border border-success/20' 
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}>
                                                        {teacher.status}
                                                    </div>
                                                </div>

                                                <div className="space-y-1 mb-6">
                                                    <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                        {teacher.userId?.fullName || 'Anonymous Scholar'}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Award size={14} className="text-primary/60" />
                                                        <span className="text-xs font-black uppercase tracking-widest text-primary/80">{teacher.designation || 'Faculty'}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <BookOpen size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight">{teacher.department}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <Mail size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight truncate">{teacher.userId?.email || 'No digital identifier'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50/50 dark:bg-slate-900/50 px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={12} className="text-slate-400" />
                                                    <span className="text-[10px] font-black font-mono tracking-widest text-slate-500 opacity-60">ID: {teacher.employeeId}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2"
                                                        onClick={() => navigate(`/teachers/edit/${teacher._id}`)}
                                                    >
                                                        <Edit2 size={14}/>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                                        onClick={() => handleDelete(teacher._id)}
                                                    >
                                                        <Trash2 size={14}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Daily Attendance Registration Interface View
*Implementation Pathway: `frontend/src/pages/AttendancePage.jsx`*

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    CheckCircle, XCircle, Clock, Search, Filter, 
    Download, Calendar, Users, Loader2, Save, 
    History, ClipboardCheck, LayoutDashboard,
    TrendingUp, UserCheck, UserX, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_STUDENTS = [
    { _id: '65a1b2c3d4e5f60001000001', name: 'Aarav Sharma', rollNo: 'BCA001', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000002', name: 'Priya Patel', rollNo: 'BCA002', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000003', name: 'Rahul Verma', rollNo: 'BCA003', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000004', name: 'Sneha Gupta', rollNo: 'BBA001', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000005', name: 'Amit Joshi', rollNo: 'BBA002', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000006', name: 'Kavya Singh', rollNo: 'MCA001', class: 'MCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000007', name: 'Rohan Mehta', rollNo: 'MBA001', class: 'MBA - Sem 2' },
    { _id: '65a1b2c3d4e5f60001000008', name: 'Diya Kapoor', rollNo: 'BSC001', class: 'BSc IT - Sem 2' },
];

const getToday = () => new Date().toISOString().split('T')[0];

const getLast30Days = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

export const AttendancePage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [searchTerm, setSearchTerm] = useState('');
    const [attendance, setAttendance] = useState({});
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('mark');
    const [allStudents, setAllStudents] = useState([]);
    const [classes, setClasses] = useState(['All']);
    const [historyData, setHistoryData] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const isAdmin = user?.roles?.includes('ADMIN');
    const isTeacher = user?.roles?.includes('TEACHER');
    const canMark = isAdmin || isTeacher;

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            let students = [];
            try {
                const res = await apiClient.get('/students?size=200');
                const studentsArr = res.data?.data?.students || [];
                if (Array.isArray(studentsArr) && studentsArr.length > 0) {
                    students = studentsArr.map(s => ({
                        _id: s.id || s._id,
                        name: s.userId?.fullName || s.name || s.fullName || 'Unknown',
                        rollNo: s.rollNo || s.rollNumber || '—',
                        class: s.course
                            ? `${s.course}${s.semester ? ' - Sem ' + s.semester : ''}`
                            : 'Unassigned',
                    }));
                }
            } catch {
                // API failed, use mock
            }

            if (students.length === 0) {
                students = MOCK_STUDENTS;
            }

            setAllStudents(students);
            const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
            setClasses(['All', ...uniqueClasses]);
            setSelectedClass('All');
            setLoading(false);
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        if (allStudents.length > 0) {
            const map = {};
            allStudents.forEach(s => { map[s._id] = 'present'; });
            setAttendance(map);
            setSubmitted(false);
        }
    }, [allStudents, selectedDate, selectedClass]);

    const fetchAttendanceForDate = useCallback(async () => {
        if (allStudents.length === 0) return;
        try {
            const res = await apiClient.get('/attendance', { params: { date: selectedDate } });
            const records = res.data?.data || [];
            if (records.length > 0) {
                const map = { ...attendance };
                records.forEach(r => {
                    const sid = r.student?._id || r.student;
                    if (sid) map[sid] = (r.status || 'PRESENT').toLowerCase();
                });
                setAttendance(map);
            }
        } catch {
        }
    }, [selectedDate, allStudents]);

    useEffect(() => {
        if (allStudents.length > 0) {
            fetchAttendanceForDate();
        }
    }, [fetchAttendanceForDate]);

    const fetchHistory = useCallback(async () => {
        setHistoryLoading(true);
        try {
            const last30 = getLast30Days();
            const res = await apiClient.get('/attendance', { params: { limit: 5000 } });
            const records = res.data?.data || [];
            const grouped = {};
            records.forEach(r => {
                const d = new Date(r.date).toISOString().split('T')[0];
                if (!grouped[d]) grouped[d] = { present: 0, absent: 0, late: 0, total: 0 };
                grouped[d].total++;
                const status = (r.status || '').toUpperCase();
                if (status === 'PRESENT') grouped[d].present++;
                else if (status === 'ABSENT') grouped[d].absent++;
                else if (status === 'LATE') grouped[d].late++;
            });
            const history = last30
                .filter(d => grouped[d])
                .map(d => ({
                    date: d,
                    present: grouped[d].present,
                    absent: grouped[d].absent,
                    late: grouped[d].late,
                    total: grouped[d].total,
                }));
            setHistoryData(history);
        } catch {
            setHistoryData([]);
        } finally {
            setHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'history') fetchHistory();
    }, [activeTab, fetchHistory]);

    const classStudents = allStudents.filter(s =>
        (selectedClass === 'All' || s.class === selectedClass) &&
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const setStatus = (id, status) => {
        setAttendance(prev => ({ ...prev, [id]: status }));
        setSubmitted(false);
    };

    const handleSubmit = async () => {
        if (saving || classStudents.length === 0) return;
        setSaving(true);
        try {
            const records = classStudents.map(s => ({
                studentId: s._id,
                status: (attendance[s._id] || 'present').toUpperCase(),
            }));
            await apiClient.post('/attendance/bulk', {
                date: selectedDate,
                records,
                subject: '',
            });
            setSubmitted(true);
            toast.success('Attendance recorded successfully');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save attendance');
        } finally {
            setSaving(false);
        }
    };

    const stats = {
        present: classStudents.filter(s => attendance[s._id] === 'present').length,
        absent: classStudents.filter(s => attendance[s._id] === 'absent').length,
        late: classStudents.filter(s => attendance[s._id] === 'late').length,
    };

    const statusBtn = (id, status, label, Icon, activeClass, inactiveClass) => (
        <button
            onClick={() => canMark && setStatus(id, status)}
            disabled={!canMark}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                ${attendance[id] === status ? activeClass : inactiveClass} 
                ${canMark ? 'hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
        >
            <Icon size={14} className={attendance[id] === status ? 'animate-pulse' : ''} />
            {label}
        </button>
    );

    const markColumns = [
        { 
            key: 'student', 
            label: 'Student Name', 
            render: (_, s) => (
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-inner
                        ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        {s.name.charAt(0)}
                    </div>
                    <div>
                        <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.rollNo}</p>
                    </div>
                </div>
            )
        },
        { 
            key: 'class', 
            label: 'Class', 
            render: (_, s) => <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{s.class}</span> 
        },
        {
            key: 'status', 
            label: 'Mark Attendance', 
            render: (_, s) => (
                <div className="flex gap-3">
                    {statusBtn(s._id, 'present', 'Present', UserCheck, 
                        'bg-success text-white shadow-lg shadow-success/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'absent', 'Absent', UserX, 
                        'bg-danger text-white shadow-lg shadow-danger/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'late', 'Late', Clock, 
                        'bg-amber-500 text-white shadow-lg shadow-amber-500/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                </div>
            )
        }
    ];

    const historyColumns = [
        {
            key: 'date', label: 'Date',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-primary" />
                    <span className={`font-black text-xs uppercase tracking-tighter ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            )
        },
        { 
            key: 'metrics', 
            label: 'Summary', 
            render: (_, row) => (
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest">
                        <UserCheck size={10} /> {row.present} Present
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest">
                        <UserX size={10} /> {row.absent} Absent
                    </div>
                </div>
            )
        },
        {
            key: 'efficiency', 
            label: 'Attendance %', 
            render: (_, row) => {
                const pct = row.total > 0 ? Math.round((row.present / row.total) * 100) : 0;
                return (
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className={`flex-1 h-3 rounded-full relative overflow-hidden p-0.5 shadow-inner ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                className={`h-full rounded-full ${pct >= 75 ? 'bg-success' : pct >= 50 ? 'bg-amber-500' : 'bg-danger'}`}
                            />
                        </div>
                        <span className={`text-xs font-black tracking-tighter ${pct >= 75 ? 'text-success' : pct >= 50 ? 'text-amber-500' : 'text-danger'}`}>{pct}%</span>
                    </div>
                );
            }
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Attendance Records"
                    subtitle="Track and manage student attendance records across all departments"
                    icon={ClipboardCheck}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="secondary" 
                            icon={Download}
                            onClick={() => toast.success('Attendance report exported')}
                        >
                            Export Report
                        </Button>
                    }
                />

                {/* KPI Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Present Students" 
                        value={stats.present} 
                        icon={UserCheck} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Absent Students" 
                        value={stats.absent} 
                        icon={UserX} 
                        color="text-danger" 
                        bg="bg-danger/10" 
                    />
                    <StatCard 
                        title="Late Arrivals" 
                        value={stats.late} 
                        icon={Clock} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Operational Interface */}
                <div className={`p-2 rounded-[2rem] flex gap-2 w-fit mx-auto border glass-card
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    {[
                        { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
                        { id: 'history', label: 'Attendance History', icon: History }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500
                                ${activeTab === tab.id 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/25' 
                                    : 'text-slate-500 hover:text-primary hover:bg-primary/5'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'mark' ? (
                        <motion.div 
                            key="mark-tab"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="space-y-8"
                        >
                            {/* Command Parameters */}
                            <div className={`p-8 rounded-[2.5rem] border grid grid-cols-1 md:grid-cols-3 gap-8 glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Filter size={12} /> Select Class
                                    </label>
                                    <select
                                        value={selectedClass}
                                        onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    >
                                        {classes.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Calendar size={12} /> Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => { setSelectedDate(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Search size={12} /> Search Student
                                    </label>
                                    <div className="relative">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or roll number..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:ring-primary/20' : 'bg-slate-50 border-slate-200 placeholder-slate-400 focus:ring-primary/10'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Register */}
                            <div className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                                <div className={`px-10 py-6 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {classStudents.length} Students
                                            </span>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Class List</p>
                                        </div>
                                    </div>
                                    {canMark && classStudents.length > 0 && (
                                        <div className="flex gap-4">
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'present');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-success/10 text-success text-[10px] font-black uppercase tracking-widest hover:bg-success hover:text-white transition-all duration-300">
                                                Mark All Present
                                            </button>
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'absent');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest hover:bg-danger hover:text-white transition-all duration-300">
                                                Mark All Absent
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <DataTable
                                    columns={markColumns}
                                    data={classStudents}
                                    loading={loading}
                                    emptyTitle="No Students Found"
                                    emptyDescription="No students matching the selected criteria."
                                />

                                {canMark && classStudents.length > 0 && !loading && (
                                    <div className={`px-10 py-8 border-t flex justify-end items-center gap-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                                        <p className="text-xs font-bold text-slate-500 italic">Please review the attendance before saving</p>
                                        <Button
                                            onClick={handleSubmit}
                                            loading={saving}
                                            icon={submitted ? CheckCircle : Save}
                                            variant={submitted ? "secondary" : "primary"}
                                            className="min-w-[200px]"
                                        >
                                            {submitted ? 'Attendance Saved' : 'Save Attendance'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="history-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}
                        >
                            <div className={`px-10 py-6 border-b flex items-center justify-between
                                ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Attendance Logs</h2>
                                {historyLoading && <Loader2 size={18} className="animate-spin text-primary" />}
                            </div>
                            <DataTable
                                columns={historyColumns}
                                data={historyData}
                                loading={historyLoading}
                                emptyTitle="No History Found"
                                emptyDescription="No attendance records found for this period."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Financial Fee Monitoring Interface View
*Implementation Pathway: `frontend/src/pages/FeesPage.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, CreditCard, ChevronRight, X, IndianRupee, Layers, CalendarClock, Tag, ShieldCheck, TrendingUp, Wallet, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

const FREQUENCY_LABELS = {
    yearly: { label: 'Yearly', color: 'bg-indigo-500/10 text-indigo-500', icon: CalendarClock },
    semester: { label: 'Semester', color: 'bg-blue-500/10 text-blue-500', icon: Layers },
    monthly: { label: 'Monthly', color: 'bg-amber-500/10 text-amber-500', icon: TrendingUp },
    'one-time': { label: 'One-time', color: 'bg-emerald-500/10 text-emerald-500', icon: CreditCard },
};

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

export const FeesPage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');

    const [feeTypes, setFeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Assignment State
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedFeeForAssign, setSelectedFeeForAssign] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Create Form State
    const [newFee, setNewFee] = useState({
        name: '',
        amount: '',
        frequency: 'yearly',
        description: '',
        isOptional: false,
    });

    useEffect(() => {
        fetchFeeTypes();
        if (isAdmin) fetchClasses();
    }, [isAdmin]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch {
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) setFeeTypes(response.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', { ...newFee, amount: Number(newFee.amount) });
            toast.success('Fee type created successfully');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch {
            toast.error('Failed to create fee type');
        }
    };

    const openAssignModal = (fee) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) { toast.error('Please select a class and due date'); return; }
        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate,
            });
            toast.success('Fees assigned to class');
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Assignment failed');
        }
    };

    const totalAmount = feeTypes.reduce((sum, f) => sum + (f.amount || 0), 0);

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Fees Management"
                    subtitle="Manage fee structures and assign them to classes."
                    icon={Wallet}
                    backTo="/dashboard"
                    actions={isAdmin && (
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            icon={Plus}
                        >
                            Create Fee Type
                        </Button>
                    )}
                />

                {/* Fees Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Fee Types" 
                        value={feeTypes.length} 
                        icon={Layers} 
                        color="text-primary" 
                        bg="bg-primary/10" 
                    />
                    <StatCard 
                        title="Total Fee Amount" 
                        value={`₹${formatINR(totalAmount)}`} 
                        icon={IndianRupee} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Optional Fees" 
                        value={feeTypes.filter((f) => f.isOptional).length} 
                        icon={ShieldCheck} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Fee Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {feeTypes.map((fee, i) => {
                            const freq = FREQUENCY_LABELS[fee.frequency] || { label: fee.frequency, color: 'bg-slate-100 text-slate-600', icon: CreditCard };
                            return (
                                <motion.div
                                    key={fee._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`rounded-[2.5rem] border p-8 transition-all duration-500 glass-card group
                                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10'}`}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'}`}>
                                            <Banknote size={24} className="text-primary" />
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${freq.color}`}>
                                            <freq.icon size={12} />
                                            {freq.label}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                                {fee.name}
                                            </h3>
                                            {fee.isOptional && (
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Optional</span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-black text-success">₹</span>
                                            <span className="text-4xl font-black tracking-tighter text-success">{formatINR(fee.amount)}</span>
                                        </div>

                                        <p className={`text-sm font-medium leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>
                                            {fee.description || 'Fee for academic and administrative services.'}
                                        </p>
                                    </div>

                                    {isAdmin && (
                                        <div className={`pt-6 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                <ShieldCheck size={12} />
                                                {fee.code || 'CODE'}
                                            </div>
                                            <button
                                                onClick={() => openAssignModal(fee)}
                                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
                                            >
                                                Assign to Class <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full py-32 text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4">
                                <CreditCard size={40} className="text-slate-300 dark:text-slate-600" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Fee Types</h3>
                                <p className="text-slate-500 font-bold mt-1">No fee structures found.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals are kept with standard redesign apply */}
            <AnimatePresence>
                {(showCreateModal || (showAssignModal && selectedFeeForAssign)) && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`w-full max-w-lg rounded-[3rem] border overflow-hidden
                                ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                        >
                            <div className={`px-10 py-8 border-b flex items-center justify-between
                                ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                        {showCreateModal ? <Layers size={18} /> : <Tag size={18} />}
                                    </div>
                                    {showCreateModal ? 'New Fee Type' : 'Assign Fees to Class'}
                                </h2>
                                <button onClick={() => { setShowCreateModal(false); setShowAssignModal(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            {showCreateModal ? (
                                <form onSubmit={handleCreateFee} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Fee Name</label>
                                        <input
                                            value={newFee.name}
                                            onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                                            className={inputCls}
                                            placeholder="e.g. Tuition Fee"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={newFee.amount}
                                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                                                className={inputCls}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Frequency</label>
                                            <select
                                                value={newFee.frequency}
                                                onChange={(e) => setNewFee({ ...newFee, frequency: e.target.value })}
                                                className={inputCls}
                                            >
                                                <option value="yearly">Yearly</option>
                                                <option value="semester">Semester</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="one-time">One-time</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                                        <textarea
                                            value={newFee.description}
                                            onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                            className={`${inputCls} h-24 pt-3 resize-none`}
                                            placeholder="Describe the purpose of this fee..."
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14">Create Fee Type</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAssignFee} className="p-10 space-y-8">
                                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Fee Type</p>
                                            <h4 className="text-lg font-black tracking-tight">{selectedFeeForAssign.name}</h4>
                                        </div>
                                        <p className="text-2xl font-black text-success">₹{formatINR(selectedFeeForAssign.amount)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Class</label>
                                        <select
                                            value={selectedClassId}
                                            onChange={(e) => setSelectedClassId(e.target.value)}
                                            className={inputCls}
                                            required
                                        >
                                            <option value="">— Select Class —</option>
                                            {classes.map((cls) => (
                                                <option key={cls._id} value={cls._id}>Class {cls.name} / {cls.section}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className={inputCls}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14" variant="secondary">Assign Fee</Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Interactive Drag-and-Drop Timetable Editor View
*Implementation Pathway: `frontend/src/pages/TimetablePage.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Calendar, Plus, Clock, User, BookOpen, GraduationCap, X, CalendarDays, ShieldCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { schedules } from '@/data/mockSchedules';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

export const TimetablePage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [selectedProgram, setSelectedProgram] = useState('BCA-1');
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await apiClient.get('/teachers');
                if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
                    setTeachers(response.data.data);
                }
            } catch (error) {
                setTeachers([]);
            }
        };
        fetchTeachers();
    }, []);

    const [newSlot, setNewSlot] = useState({
        day: 'Monday',
        time: '09:00 AM',
        subject: '',
        teacher: '',
        room: ''
    });

    const programs = [
        { id: 'BCA-1', name: 'BCA - Year 1' },
        { id: 'BCA-2', name: 'BCA - Year 2' },
        { id: 'BCA-3', name: 'BCA - Year 3' },
        { id: 'BBA-1', name: 'BBA - Year 1' },
        { id: 'BBA-2', name: 'BBA - Year 2' },
        { id: 'BBA-3', name: 'BBA - Year 3' },
        { id: 'MBA-1', name: 'MBA - Year 1' },
        { id: 'MBA-2', name: 'MBA - Year 2' },
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'];
    const semesters = [1, 2];
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const key = `${selectedProgram}-sem${selectedSemester}`;
        setSchedule(schedules[key] || schedules[selectedProgram] || []);
    }, [selectedProgram, selectedSemester]);

    const getSlot = (day, time) => schedule.find(s => s.day === day && s.time === time);

    const handleAddSlot = (e) => {
        e.preventDefault();
        const existingSlot = schedule.find(s => s.day === newSlot.day && s.time === newSlot.time);
        if (existingSlot) {
            toast.error('Temporal conflict detected at this interval');
            return;
        }
        const updated = [...schedule, { ...newSlot }];
        setSchedule(updated);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
        toast.success('Schedule sequence initialized');
        setNewSlot({ day: 'Monday', time: '09:00 AM', subject: '', teacher: '', room: '' });
        setShowAddSlot(false);
    };

    const handleEditSlot = (slot) => {
        setEditingSlot(slot);
        setNewSlot({ ...slot, room: slot.room || '' });
        setShowAddSlot(true);
    };

    const handleUpdateSlot = (e) => {
        e.preventDefault();
        if (!editingSlot) return;
        const updatedSchedule = schedule.map(slot => {
            if (slot.day === editingSlot.day && slot.time === editingSlot.time) {
                return { ...newSlot };
            }
            return slot;
        });
        setSchedule(updatedSchedule);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updatedSchedule;
        toast.success('Schedule sequence updated');
        setEditingSlot(null);
        setShowAddSlot(false);
    };

    const handleDeleteSlot = (slot) => {
        if (confirm(`Authorize removal of ${slot.subject} from registry?`)) {
            const updated = schedule.filter(s => !(s.day === slot.day && s.time === slot.time));
            setSchedule(updated);
            schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
            toast.success('Sequence removed from registry');
        }
    };

    const getSubjectColor = (subject) => {
        const colors = [
            'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'bg-amber-500/10 text-amber-500 border-amber-500/20',
            'bg-purple-500/10 text-purple-500 border-purple-500/20',
        ];
        const index = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto px-6 pb-24 space-y-10">
                <PageHeader
                    title="Calendar Matrix"
                    subtitle="Coordinate academic sequences and operational timeframes"
                    icon={CalendarDays}
                    actions={
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                                {semesters.map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => setSelectedSemester(sem)}
                                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${selectedSemester === sem
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        Semester {sem}
                                    </button>
                                ))}
                            </div>
                            <select 
                                value={selectedProgram} 
                                onChange={(e) => setSelectedProgram(e.target.value)} 
                                className="h-12 px-6 rounded-2xl border-none bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase tracking-wider outline-none focus:ring-4 focus:ring-primary/20"
                            >
                                {programs.map(prog => (<option key={prog.id} value={prog.id}>{prog.name}</option>))}
                            </select>
                            {isAdmin && (
                                <Button onClick={() => setShowAddSlot(true)} icon={Plus}>Initialize Slot</Button>
                            )}
                        </div>
                    }
                />

                {/* Timetable Matrix Grid */}
                <div className={`rounded-[3rem] border overflow-hidden glass-card transition-all duration-500
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                <th className="px-10 py-8 text-left border-b border-r border-slate-200/50 dark:border-slate-800/50 w-48">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Time / Day</span>
                                    </div>
                                </th>
                                {timeSlots.map(time => (
                                    <th key={time} className="px-6 py-8 text-center border-b border-slate-200/50 dark:border-slate-800/50">
                                        <span className="text-xs font-black text-slate-800 dark:text-white tracking-widest">{time}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {days.map(day => (
                                <tr key={day} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-10 py-10 border-r border-slate-200/50 dark:border-slate-800/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{day}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                                            </div>
                                        </div>
                                    </td>
                                    {timeSlots.map(time => {
                                        const slot = getSlot(day, time);
                                        return (
                                            <td key={`${day}-${time}`} className="p-4 border-slate-200/50 dark:border-slate-800/50 min-w-[200px]">
                                                {slot ? (
                                                    <motion.div 
                                                        whileHover={{ y: -4, scale: 1.02 }}
                                                        className={`p-6 rounded-[2rem] border-2 group/card relative overflow-hidden transition-all duration-300 ${getSubjectColor(slot.subject)}`}
                                                    >
                                                        <div className="space-y-4 relative z-10">
                                                            <h4 className="font-black text-sm tracking-tight leading-tight line-clamp-2 pr-4">{slot.subject}</h4>
                                                            <div className="space-y-2 opacity-80">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                    <User size={12} strokeWidth={3} /> {slot.teacher}
                                                                </div>
                                                                {slot.room && (
                                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                        <MapPin size={12} strokeWidth={3} /> {slot.room}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Action Hover Controls */}
                                                        {isAdmin && (
                                                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-x-4 group-hover/card:translate-x-0">
                                                                <button onClick={() => handleEditSlot(slot)} className="p-2 bg-white/20 hover:bg-white/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <Plus className="rotate-45" size={14} strokeWidth={4} />
                                                                </button>
                                                                <button onClick={() => handleDeleteSlot(slot)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <X size={14} strokeWidth={4} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ) : (
                                                    <div className="h-full min-h-[120px] rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-opacity opacity-0 hover:opacity-100 group/empty">
                                                        {isAdmin ? (
                                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group-hover/empty:scale-110 transition-transform cursor-pointer">
                                                                <Plus size={20} className="text-slate-300 dark:text-slate-600" />
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 opacity-0" />
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Initialization Modal */}
                <AnimatePresence>
                    {showAddSlot && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`w-full max-w-lg rounded-[3.5rem] border overflow-hidden
                                    ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                            >
                                <div className={`px-12 py-10 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 text-primary rounded-[1.2rem]">
                                                {editingSlot ? <ShieldCheck size={20} /> : <Plus size={20} />}
                                            </div>
                                            {editingSlot ? 'Refine Sequence' : 'Initialize Sequence'}
                                        </h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-16">
                                            {selectedProgram} • SEM {selectedSemester}
                                        </p>
                                    </div>
                                    <button onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="p-12 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Temporal Axis</label>
                                            <select value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })} className={inputCls}>
                                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Clock Registry</label>
                                            <select value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} className={inputCls}>
                                                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Academic Subject</label>
                                        <input required value={newSlot.subject} onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })} placeholder="e.g. ADVANCED DATA STRUCTURES" className={inputCls} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Faculty Registry</label>
                                            <select required value={newSlot.teacher} onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })} className={inputCls}>
                                                <option value="">IDENTITY SELECT</option>
                                                {teachers.length > 0
                                                    ? teachers.map(t => <option key={t._id} value={t.userId?.fullName || 'IDENT-X'}>{t.userId?.fullName || 'IDENT-X'}</option>)
                                                    : [...new Set(Object.values(schedules).flat().map(s => s.teacher))].sort().map(name => (
                                                        <option key={name} value={name}>{name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Spatial Unit</label>
                                            <input value={newSlot.room} onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })} placeholder="e.g. TECH-LAB 402" className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="flex gap-6 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="flex-1 h-14">Discard</Button>
                                        <Button type="submit" className="flex-1 h-14">{editingSlot ? 'Sync Protocol' : 'Initialize Protocol'}</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Examination Calendar Editor View
*Implementation Pathway: `frontend/src/pages/ExamsPage.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, Clock, BookOpen, Plus, ShieldCheck, Hourglass, CheckCircle2, CalendarDays, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const ExamsPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useTheme();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '', date: '', time: '', course: 'BCA'
    });

    const fetchExams = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/exams');
            if (response.data && response.data.success) {
                setExams(response.data.data);
            }
        } catch (error) {
            toast.error('Failed to load exams');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
    }, []);

    const canCreateExam = user?.roles?.includes('ADMIN') || user?.roles?.includes('TEACHER');

    const handleCreateExam = async (e) => {
        e.preventDefault();
        try {
            // Ensure we send classId which is often required in backend
            const payload = {
                ...formData,
                classId: formData.course // Assuming course field in UI maps to classId in back
            };
            const response = await apiClient.post('/exams', payload);
            if (response.data && response.data.success) {
                toast.success('Exam scheduled successfully');
                setIsCreateModalOpen(false);
                fetchExams();
                setFormData({ title: '', date: '', time: '', course: 'BCA' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule exam');
        }
    };

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    const upcomingExams = exams.filter(e => new Date(e.date) >= new Date()).length;
    const completedExams = exams.length - upcomingExams;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Exams"
                    subtitle="Manage and schedule academic examinations"
                    icon={CalendarDays}
                    backTo="/dashboard"
                    actions={canCreateExam && (
                        <Button
                            onClick={() => setIsCreateModalOpen(true)}
                            icon={Plus}
                        >
                            Add Exam
                        </Button>
                    )}
                />

                {/* Examination KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Total Exams" 
                        value={exams.length} 
                        icon={BookOpen} 
                        color="text-primary" 
                        bg="bg-primary/10" 
                    />
                    <StatCard 
                        title="Upcoming Exams" 
                        value={upcomingExams} 
                        icon={Hourglass} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                    <StatCard 
                        title="Completed Exams" 
                        value={completedExams} 
                        icon={CheckCircle2} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                </div>

                {/* Filters View */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                    {['All Exams', 'Upcoming', 'Completed'].map((filter, i) => (
                        <button 
                            key={filter}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all
                            ${i === 0 
                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:text-primary'}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Exam Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="h-64 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />
                            ))
                        ) : exams.length === 0 ? (
                            <div className="col-span-full py-32 text-center space-y-6">
                                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4">
                                    <Calendar size={40} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <div>
                                    <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Exams Found</h3>
                                    <p className="text-slate-500 font-bold mt-1">No examinations scheduled at the moment.</p>
                                </div>
                            </div>
                        ) : exams.map((exam, i) => (
                            <motion.div
                                key={exam._id || exam.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`rounded-[2.5rem] border p-8 transition-all duration-500 glass-card group
                                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'}`}>
                                        <ShieldCheck size={24} className="text-primary" />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                                        ${new Date(exam.date) >= new Date() ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                        {new Date(exam.date) >= new Date() ? 'Upcoming' : 'Completed'}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className={`text-xl font-black tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                        {exam.title}
                                    </h3>
                                    
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                            <Calendar size={16} className="text-primary" />
                                            {new Date(exam.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-bold text-sm">
                                            <Clock size={16} className="text-primary" />
                                            {exam.time}
                                        </div>
                                        <div className="pt-4 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                Class: {exam.course || exam.class}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Create Exam Modal */}
                <AnimatePresence>
                    {isCreateModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`w-full max-w-lg rounded-[3rem] border overflow-hidden
                                    ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                            >
                                <div className={`px-10 py-8 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <h2 className="text-xl font-black tracking-tight flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <Plus size={18} />
                                        </div>
                                        Schedule New Exam
                                    </h2>
                                    <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleCreateExam} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Exam Title</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className={inputCls}
                                            placeholder="e.g. Mid-Term Examination"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Date</label>
                                            <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Time</label>
                                            <input required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Course / Class</label>
                                        <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={inputCls}>
                                            <option value="BCA">Bachelor of Comp. Apps (BCA)</option>
                                            <option value="BBA">Bachelor of Bus. Admin (BBA)</option>
                                            <option value="MBA">Master of Bus. Admin (MBA)</option>
                                            <option value="MCA">Master of Comp. Apps (MCA)</option>
                                            <option value="BSc IT">Bachelor of Science IT</option>
                                        </select>
                                    </div>

                                    <div className={`flex gap-4 pt-4`}>
                                        <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="flex-1">Discard</Button>
                                        <Button type="submit" className="flex-1">Schedule Exam</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};
```

<div style="page-break-after: always;"></div>

### Persisted Navigation Sidebar Drawer Component
*Implementation Pathway: `frontend/src/components/Sidebar.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronRight, Menu, Home, LogOut, Users, 
    GraduationCap, Calculator, ClipboardCheck, FileText, 
    Settings, Briefcase, LayoutDashboard, CreditCard, 
    PieChart, UserCircle, CheckSquare, Sparkles, ChevronLeft
} from 'lucide-react';

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState(['FACULTY & STAFF']);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuthStore();
    const { isDarkMode, roleTheme } = useTheme();

    const menuItems = {
        ADMIN: [
            { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { label: 'Students', path: '/students', icon: GraduationCap },
            {
                label: 'Faculty & Staff',
                icon: UserCircle,
                children: [
                    { label: 'Faculty', path: '/teachers', icon: Users },
                    { label: 'Staff', path: '/staff', icon: Briefcase },
                ]
            },
            { label: 'Courses', path: '/classes', icon: ClipboardCheck },
            { label: 'Attendance', path: '/attendance', icon: CheckSquare },
            { label: 'Fees', path: '/fees', icon: CreditCard },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Timetable', path: '/timetable', icon: Calculator },
            { label: 'Payroll', path: '/payroll', icon: PieChart },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        STUDENT: [
            { label: 'My Dashboard', path: '/student-dashboard', icon: LayoutDashboard },
            { label: 'My Timetable', path: '/timetable', icon: Calculator },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Grades', path: '/grades', icon: GraduationCap },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
        TEACHER: [
            { label: 'My Dashboard', path: '/teacher-dashboard', icon: LayoutDashboard },
            { label: 'Students', path: '/students', icon: GraduationCap },
            { label: 'Attendance', path: '/attendance', icon: CheckSquare },
            { label: 'Exams', path: '/exams', icon: FileText },
            { label: 'Timetable', path: '/timetable', icon: Calculator },
            { label: 'Settings', path: '/settings', icon: Settings },
        ],
    };

    const currentRole = user?.roles?.[0]?.toUpperCase() || 'STUDENT';
    const items = menuItems[currentRole] || menuItems['STUDENT'];

    const toggleMenu = (label) => {
        setExpandedMenus(prev => prev.includes(label.toUpperCase())
            ? prev.filter(item => item !== label.toUpperCase())
            : [...prev, label.toUpperCase()]);
    };

    const isActive = (path) => location.pathname === path;

    const renderMenuItem = (item, depth = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isMenuExpanded = expandedMenus.includes(item.label.toUpperCase());
        const active = item.path ? isActive(item.path) : false;

        return (
            <div key={item.label} className="mb-1">
                <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => hasChildren ? toggleMenu(item.label) : navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group
                        ${active 
                            ? `bg-gradient-to-r ${roleTheme} text-white shadow-lg shadow-primary/20` 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                        }
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <item.icon size={20} className={`shrink-0 ${active ? 'text-white' : ''}`} />
                    
                    {!collapsed && (
                        <span className="flex-1 text-left text-sm font-bold tracking-tight truncate">
                            {item.label}
                        </span>
                    )}

                    {!collapsed && hasChildren && (
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isMenuExpanded ? 'rotate-180' : ''}`} />
                    )}

                    {collapsed && active && (
                        <motion.div layoutId="activePill" className="absolute -left-4 w-1.5 h-8 bg-primary rounded-r-full" />
                    )}
                </motion.button>

                <AnimatePresence>
                    {!collapsed && hasChildren && isMenuExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden ml-6 mt-1 border-l-2 border-slate-100 dark:border-slate-800 space-y-1"
                        >
                            {item.children.map(child => (
                                <button
                                    key={child.path}
                                    onClick={() => navigate(child.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold rounded-lg transition-all
                                        ${isActive(child.path)
                                            ? 'text-primary'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive(child.path) ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`} />
                                    {child.label}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <motion.aside 
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            className={`sticky top-0 h-screen z-40 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 transition-colors duration-300 shadow-xl overflow-hidden`}
        >
            {/* Logo Section */}
            <div className="p-6 h-20 flex items-center justify-between">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3"
                        >
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${roleTheme} flex items-center justify-center text-white shadow-lg`}>
                                <Sparkles size={20} />
                            </div>
                            <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white">
                                LNMI<span className="text-primary">CMS</span>
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <button 
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-all shadow-sm"
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Menu Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2">
                {!collapsed && (
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 ml-2">
                        Main Menu
                    </p>
                )}
                {items.map(item => renderMenuItem(item))}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                <button 
                    onClick={() => navigate('/')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all mb-1
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <Home size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Main Site</span>}
                </button>
                <button 
                    onClick={() => { logout(); navigate('/login'); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 transition-all
                        ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
                    `}
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="text-sm font-bold tracking-tight">Sign Out</span>}
                </button>
            </div>
        </motion.aside>
    );
};
```

<div style="page-break-after: always;"></div>

### Authenticated User Toolbar Interface Component
*Implementation Pathway: `frontend/src/components/Header.jsx`*

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sun, Moon, LogOut, User, Settings, ChevronDown } from 'lucide-react';

export const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 w-full h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-900 transition-colors duration-300">
            <div className="flex justify-between items-center h-full px-6">
                <div className="flex items-center gap-4">
                    {/* Placeholder for page title or search if needed later */}
                    <div className="hidden md:block">
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Dashboard Overview</h2>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <motion.button
                        whileTap={{ rotate: 180, scale: 0.8 }}
                        onClick={toggleDarkMode}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group"
                    >
                        {isDarkMode ? (
                            <Sun size={20} className="text-amber-400" />
                        ) : (
                            <Moon size={20} className="text-indigo-600" />
                        )}
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    </motion.button>

                    {/* Notifications */}
                    <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative group">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-danger rounded-full border-2 border-white dark:border-slate-900"></span>
                        <span className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Notifications
                        </span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800" />

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1 pl-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-none mb-1">
                                    {user?.fullName?.split(' ')[0] || 'User'}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {user?.roles?.[0] || 'Member'}
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md overflow-hidden border-2 border-white dark:border-slate-800">
                                {user?.fullName?.[0] || 'U'}
                            </div>
                            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 glass-card rounded-2xl overflow-hidden z-50 shadow-2xl"
                                    >
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.fullName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <User size={16} /> My Profile
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                <Settings size={16} /> settings
                                            </button>
                                        </div>
                                        <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-lg transition-colors"
                                            >
                                                <LogOut size={16} /> Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    );
};
```

<div style="page-break-after: always;"></div>

### Public Informational Mega-Menu Navbar Component
*Implementation Pathway: `frontend/src/components/PublicHeader.jsx`*

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Rocket, GraduationCap, Building2, TrendingUp, Users, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PublicHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { 
            label: 'About', 
            href: '#about',
            icon: Building2,
            subItems: [
                { title: 'History & Legacy', desc: 'Established in 1973', href: '#about-history' },
                { title: 'Infrastructure', desc: 'State-of-the-art facilities', href: '#about-infra' },
                { title: 'Leadership', desc: 'Visionary guidance', href: '#about-leadership' },
            ]
        },
        { 
            label: 'Academics', 
            href: '#academics',
            icon: GraduationCap,
            subItems: [
                { title: 'Undergraduate', desc: 'BBA & BCA Programs', href: '#ug-programs' },
                { title: 'Postgraduate', desc: 'MBA & MCA Programs', href: '#pg-programs' },
                { title: 'Integrated Courses', desc: 'BBA+MBA & BCA+MCA', href: '#integrated-programs' },
            ]
        },
        { 
            label: 'Admissions', 
            href: '#admissions',
            icon: BookOpen,
            subItems: [
                { title: 'Application Process', desc: 'Online registration (Jan-Jun)', href: '#apply' },
                { title: 'Eligibility Criteria', desc: 'UG & PG Requirements', href: '#eligibility' },
                { title: 'Entrance Exams', desc: 'MAT/CMAT/CAT & Internal Tests', href: '#exams' },
            ]
        },
        { 
            label: 'Research', 
            href: '#research',
            icon: TrendingUp,
            subItems: [
                { title: 'Socio-Economic Focus', desc: 'Legacy of societal research', href: '#research-focus' },
                { title: 'National Projects', desc: 'Government & institutional tie-ups', href: '#research-projects' },
                { title: 'Publications', desc: 'Faculty research works', href: '#publications' },
            ]
        },
        { 
            label: 'Portfolio', 
            href: '#portfolio',
            icon: Users,
            subItems: [
                { title: 'Placement Statistics', desc: 'Highest Package: 16.4 LPA', href: '#placements' },
                { title: 'Top Recruiters', desc: 'ICICI, HDFC, Amul & more', href: '#recruiters' },
                { title: 'Alumni Network', desc: '30,000+ strong global community', href: '#alumni' },
            ]
        },
    ];

    return (
        <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
            scrolled ? 'py-4' : 'py-6'
        }`}>
            <div className="container mx-auto px-6">
                <nav className={`relative rounded-[2.5rem] transition-all duration-500 border ${
                    scrolled 
                    ? 'bg-white/95 backdrop-blur-2xl border-indigo-100 shadow-[0_20px_50px_-15px_rgba(79,70,229,0.15)] py-3' 
                    : 'bg-slate-900/10 backdrop-blur-xl border-white/20 py-4 shadow-2xl shadow-black/10'
                }`}
                onMouseLeave={() => setActiveDropdown(null)}>
                    {/* Subtle colorful accent line on top when scrolled */}
                    {scrolled && (
                        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-[2.5rem] opacity-80" />
                    )}

                    <div className="flex items-center justify-between px-8 relative z-20">
                        {/* Institutional Branding */}
                        <div 
                            className="flex items-center gap-4 cursor-pointer group" 
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary blur-lg opacity-20 group-hover:opacity-60 transition-opacity" />
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 group-hover:scale-105 transition-all">
                                    <span className="text-white font-black text-xl tracking-tighter">LN</span>
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className={`text-lg font-black tracking-tighter transition-colors ${
                                    scrolled ? 'text-slate-900 group-hover:text-primary' : 'text-white'
                                }`}>
                                    LNMI <span className="text-primary group-hover:animate-pulse">.</span>
                                </h1>
                                <p className={`text-[8px] font-black uppercase tracking-[0.2em] transition-opacity ${
                                    scrolled ? 'text-slate-500' : 'text-white/80'
                                }`}>
                                    Govt. of Bihar • Autonomous
                                </p>
                            </div>
                        </div>

                        {/* Centered Navigation */}
                        <div className="hidden lg:flex items-center gap-2">
                            {navLinks.map((link, index) => (
                                <div 
                                    key={link.label}
                                    className="relative group"
                                    onMouseEnter={() => setActiveDropdown(index)}
                                >
                                    <a
                                        href={link.href}
                                        className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-1 ${
                                            scrolled 
                                            ? (activeDropdown === index ? 'text-primary bg-primary/10' : 'text-slate-600 hover:text-primary hover:bg-slate-50') 
                                            : (activeDropdown === index ? 'text-white bg-white/20' : 'text-white/90 hover:text-white hover:bg-white/10')
                                        }`}
                                    >
                                        {link.label}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                                    </a>

                                    {/* Desktop Mega Menu Dropdown */}
                                    <AnimatePresence>
                                        {activeDropdown === index && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[320px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-[110] origin-top"
                                            >
                                                {/* Decorative Header */}
                                                <div className="bg-gradient-to-r from-primary to-purple-600 p-6 relative overflow-hidden">
                                                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                                                    <div className="relative z-10 flex items-center gap-3">
                                                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
                                                            <link.icon size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-black text-sm uppercase tracking-wider">{link.label}</h3>
                                                            <p className="text-white/80 text-xs mt-0.5" style={{textTransform: 'none'}}>Explore {link.label.toLowerCase()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Sub-menu Items */}
                                                <div className="p-3">
                                                    {link.subItems.map((sub, i) => (
                                                        <motion.a
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            key={sub.title}
                                                            href={sub.href}
                                                            className="flex flex-col p-3 rounded-2xl hover:bg-slate-50 transition-colors group/item"
                                                            onClick={(e) => {
                                                                // Allow smooth scrolling if on same page
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            <span className="text-sm font-bold text-slate-800 group-hover/item:text-primary transition-colors">
                                                                {sub.title}
                                                            </span>
                                                            <span className="text-xs text-slate-500 mt-0.5 group-hover/item:text-slate-600" style={{textTransform: 'none'}}>
                                                                {sub.desc}
                                                            </span>
                                                        </motion.a>
                                                    ))}
                                                </div>
                                                
                                                {/* Bottom Action Area */}
                                                <div className="bg-slate-50 p-4 flex justify-between items-center text-xs group/bottom hover:bg-primary/5 transition-colors border-t border-slate-100 cursor-pointer">
                                                    <span className="font-bold text-slate-600 group-hover/bottom:text-primary transition-colors">Open section</span>
                                                    <Rocket size={14} className="text-slate-400 group-hover/bottom:text-primary group-hover/bottom:translate-x-1 group-hover/bottom:-translate-y-1 transition-all" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Critical Actions */}
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className={`group relative hidden sm:flex items-center gap-3 px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                                    scrolled 
                                    ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-primary/20 hover:shadow-primary/40' 
                                    : 'bg-white text-slate-900 border-white/20 hover:bg-slate-50 shadow-black/20 hover:shadow-white/20'
                                }`}
                            >
                                <Rocket size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-indigo-500 group-hover:text-primary" />
                                Login / Signup
                                
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />
                            </motion.button>

                            <button
                                className={`lg:hidden p-2 rounded-xl transition-colors ${
                                    scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                                }`}
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dynamic Menu (Absolute relative to document to avoid clipping) */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="absolute top-full left-0 right-0 mt-4 mx-2 overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl lg:hidden max-h-[70vh] overflow-y-auto z-[120]"
                            >
                                <div className="p-6 space-y-4">
                                    {navLinks.map((link) => (
                                        <div key={link.label} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                    <link.icon size={18} />
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
                                                    {link.label}
                                                </span>
                                            </div>
                                            <div className="pl-11 space-y-2">
                                                {link.subItems.map(subItem => (
                                                    <a
                                                        key={subItem.title}
                                                        href={subItem.href}
                                                        className="block py-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        style={{textTransform: 'none'}}
                                                    >
                                                        {subItem.title}
                                                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{subItem.desc}</div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <div className="pt-4 mt-4 border-t border-slate-100">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                                            className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-primary/30"
                                        >
                                            <Rocket size={16} />
                                            Login / Signup
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </div>
        </header>
    );
};
```

<div style="page-break-after: always;"></div>

### Public Homepage Features Advertisement Component
*Implementation Pathway: `frontend/src/components/AcademicsSection.jsx`*

```jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, Users, Globe } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const AcademicCard = ({ icon: Icon, title, description, delay }) => (<div className="academic-card bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow transform hover:-translate-y-1" data-delay={delay}>
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
            <Icon size={28}/>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
            {description}
        </p>
    </div>);
export const AcademicsSection = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.academic-card', {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (<section ref={sectionRef} className="py-24 bg-gray-50 relative z-20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-semibold tracking-wider uppercase text-sm">World Class Education</span>
                    <h2 className="text-4xl font-bold mt-2 mb-4 text-gray-900">Academic Excellence</h2>
                    <p className="text-lg text-gray-600">
                        Our rigorous curriculum and innovative teaching methods prepare students for leadership in a rapidly changing world.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AcademicCard icon={BookOpen} title="Diverse Programs" description="Choose from over 50 undergraduate and graduate programs across various disciplines." delay={0}/>
                    <AcademicCard icon={Globe} title="Global Exposure" description="International partnerships and exchange programs to broaden your horizons." delay={0.1}/>
                    <AcademicCard icon={Users} title="Expert Faculty" description="Learn from distinguished professors and industry leaders dedicated to your success." delay={0.2}/>
                    <AcademicCard icon={Award} title="Research & Innovation" description="State-of-the-art labs and research centers fostering a culture of discovery." delay={0.3}/>
                </div>
            </div>
        </section>);
};
```

<div style="page-break-after: always;"></div>

### Re-usable Sortable Data Grid Component
*Implementation Pathway: `frontend/src/components/DataTable.jsx`*

```jsx
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Loader2, Database, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DataTable = ({
    columns,
    data,
    loading,
    emptyIcon: EmptyIcon,
    emptyTitle = "No data found",
    emptyDescription = "There are no records to display.",
    onRowClick,
    tableContainerClassName = "",
    headerClassName = "",
    rowClassName = "",
}) => {
    const { isDarkMode } = useTheme();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">Synchronizing</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Accessing Ledger Data...</span>
                </div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`px-6 py-20 text-center flex flex-col items-center justify-center gap-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            >
                <div className={`p-8 rounded-[2rem] ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/40' : 'bg-slate-50 border-slate-100'} border-2 relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {EmptyIcon ? <EmptyIcon size={48} className="text-primary/40" /> : <SearchX size={48} className="text-primary/40" />}
                </div>
                <div className="max-w-xs">
                    <h3 className={`font-black uppercase tracking-widest text-sm mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{emptyTitle}</h3>
                    <p className="text-xs font-bold opacity-60 leading-relaxed uppercase tracking-tighter">{emptyDescription}</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className={`overflow-x-auto custom-scrollbar ${tableContainerClassName}`}>
            <table className="w-full text-left border-separate border-spacing-y-2 px-4">
                <thead className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-400' : 'text-slate-400'} ${headerClassName}`}>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={col.key || index} className={`px-6 py-4 font-black ${col.headerClassName || ''}`}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="overflow-visible">
                    {data.map((row, rowIndex) => (
                        <motion.tr
                            key={row.id || row._id || rowIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: rowIndex * 0.03 }}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={`
                                group transition-all duration-300
                                ${isDarkMode 
                                    ? 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/50 text-slate-300' 
                                    : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'
                                } 
                                border-2 rounded-2xl
                                ${onRowClick ? 'cursor-pointer' : ''}
                                shadow-sm hover:shadow-xl hover:shadow-primary/5
                                ${rowClassName}
                            `}
                        >
                            {columns.map((col, colIndex) => (
                                <td 
                                    key={col.key || colIndex} 
                                    className={`
                                        px-6 py-5 first:rounded-l-[1.5rem] last:rounded-r-[1.5rem]
                                        border-t-2 border-b-2 first:border-l-2 last:border-r-2
                                        ${isDarkMode ? 'border-transparent group-hover:border-slate-700/50' : 'border-transparent group-hover:border-slate-200'}
                                        ${col.cellClassName || ''}
                                    `}
                                >
                                    <div className="relative z-10">
                                        {col.render ? col.render(row[col.key], row, rowIndex) : (
                                            <span className="font-bold text-sm tracking-tight">{row[col.key]}</span>
                                        )}
                                    </div>
                                </td>
                            ))}
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
```

<div style="page-break-after: always;"></div>

### Generic Overlay Modal Window Component
*Implementation Pathway: `frontend/src/components/Modal.jsx`*

```jsx
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
export const Modal = ({ open, title, children, onClose, footer, size = 'md' }) => {
    const { isDarkMode } = useThemeStore();
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg'
    };
    return (<AnimatePresence>
      {open && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative w-full mx-4 ${sizeClasses[size]} rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <div className={`flex justify-between items-center p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className="text-xl font-bold">{title}</h2>
              <button onClick={onClose} className={`p-1 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X size={20}/>
              </button>
            </div>
            <div className="p-6">{children}</div>
            {footer && (<div className={`p-6 border-t flex gap-4 justify-end ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                {footer}
              </div>)}
          </motion.div>
        </div>)}
    </AnimatePresence>);
};
```

<div style="page-break-after: always;"></div>

### Standardized UI Button Component
*Implementation Pathway: `frontend/src/components/Button.jsx`*

```jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    children, 
    disabled, 
    className, 
    icon: Icon,
    ...props 
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center font-black uppercase tracking-widest transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden';
    
    const variantStyles = {
        primary: 'bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 rounded-2xl',
        secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl',
        danger: 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 rounded-2xl',
        outline: 'border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary rounded-2xl',
        glass: 'glass-card border border-white/20 text-white hover:bg-white/20 rounded-2xl',
        ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl',
    };

    const sizeStyles = {
        xs: 'px-3 py-1.5 text-[10px] gap-1.5',
        sm: 'px-4 py-2 text-[11px] gap-2',
        md: 'px-6 py-3 text-xs gap-2.5',
        lg: 'px-8 py-4 text-sm gap-3',
        icon: 'p-2.5 rounded-xl',
    };

    return (
        <motion.button
            whileHover={!disabled && !isLoading ? { y: -2, scale: 1.02 } : {}}
            whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer duration-1000" />
            
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 size={16} className="animate-spin" />
                        <span className="hidden sm:inline">Executing...</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 w-full"
                    >
                        {Icon && <Icon size={size === 'sm' || size === 'xs' ? 14 : 18} className="shrink-0" />}
                        {children && <span>{children}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Active Glow for primary */}
            {variant === 'primary' && (
                <div className="absolute -inset-1 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-[2rem]" />
            )}
        </motion.button>
    );
};
```

<div style="page-break-after: always;"></div>


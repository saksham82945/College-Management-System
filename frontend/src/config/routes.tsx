import React from 'react';
import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Lazy load the ProtectedRoute
const ProtectedRoute = React.lazy(() => import('@/components/ProtectedRoute').then(module => ({ default: module.ProtectedRoute })));

// Lazy load pages for code splitting
const LandingPage = React.lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = React.lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const Dashboard = React.lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const StudentsPage = React.lazy(() => import('@/pages/StudentsPage').then(m => ({ default: m.StudentsPage })));
const AddStudentPage = React.lazy(() => import('@/pages/AddStudentPage').then(m => ({ default: m.AddStudentPage })));
const StudentDetailsPage = React.lazy(() => import('@/pages/StudentDetailsPage').then(m => ({ default: m.StudentDetailsPage })));
const TeachersPage = React.lazy(() => import('@/pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const AddTeacherPage = React.lazy(() => import('@/pages/AddTeacherPage').then(m => ({ default: m.AddTeacherPage })));
const BooksPage = React.lazy(() => import('@/pages/BooksPage').then(m => ({ default: m.BooksPage })));
const FeesPage = React.lazy(() => import('@/pages/FeesPage').then(m => ({ default: m.FeesPage })));
const AttendancePage = React.lazy(() => import('@/pages/AttendancePage').then(m => ({ default: m.AttendancePage })));
const ExamsPage = React.lazy(() => import('@/pages/ExamsPage').then(m => ({ default: m.ExamsPage })));
const StaffPage = React.lazy(() => import('@/pages/StaffPage').then(m => ({ default: m.StaffPage })));
const TimetablePage = React.lazy(() => import('@/pages/TimetablePage').then(m => ({ default: m.TimetablePage })));
const PayrollPage = React.lazy(() => import('@/pages/PayrollPage').then(m => ({ default: m.PayrollPage })));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ClassesPage = React.lazy(() => import('@/pages/ClassesPage').then(m => ({ default: m.ClassesPage })));
const ClassDetailsPage = React.lazy(() => import('@/pages/ClassDetailsPage').then(m => ({ default: m.ClassDetailsPage })));
const GradesPage = React.lazy(() => import('@/pages/GradesPage').then(m => ({ default: m.GradesPage })));
const PayFeePage = React.lazy(() => import('@/pages/PayFeePage').then(m => ({ default: m.PayFeePage })));


// Helper to create protected route
const protect = (element: React.ReactElement, roles?: string[]) => (
    <ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>
);

export const routes: RouteObject[] = [
    // Public routes
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },

    // Protected routes
    { path: '/dashboard', element: protect(<Dashboard />) },


    // Students
    { path: '/students', element: protect(<StudentsPage />, ['ADMIN']) },
    { path: '/students/add', element: protect(<AddStudentPage />, ['ADMIN']) },
    { path: '/students/:id', element: protect(<StudentDetailsPage />, ['ADMIN', 'STUDENT']) },

    // Teachers
    { path: '/teachers', element: protect(<TeachersPage />, ['ADMIN']) },
    { path: '/teachers/add', element: protect(<AddTeacherPage />, ['ADMIN']) },
    { path: '/teachers/edit/:id', element: protect(<AddTeacherPage />, ['ADMIN']) },

    // Staff
    { path: '/staff', element: protect(<StaffPage />, ['ADMIN']) },

    // Classes
    { path: '/classes', element: protect(<ClassesPage />, ['ADMIN']) },
    { path: '/classes/:id', element: protect(<ClassDetailsPage />, ['ADMIN']) },

    // Academic
    { path: '/books', element: protect(<BooksPage />) },
    { path: '/timetable', element: protect(<TimetablePage />) },
    { path: '/attendance', element: protect(<AttendancePage />, ['ADMIN']) },
    { path: '/exams', element: protect(<ExamsPage />, ['ADMIN']) },
    { path: '/grades', element: protect(<GradesPage />, ['ADMIN', 'STUDENT']) },

    // Finance
    { path: '/fees', element: protect(<FeesPage />, ['ADMIN', 'STUDENT']) },
    { path: '/pay-fee', element: protect(<PayFeePage />, ['STUDENT']) },
    { path: '/my-fees', element: protect(<PayFeePage />, ['STUDENT']) },
    { path: '/payroll', element: protect(<PayrollPage />, ['ADMIN']) },

    // Student-specific routes
    { path: '/my-classes', element: protect(<TimetablePage />, ['STUDENT']) },
    { path: '/my-attendance', element: protect(<AttendancePage />, ['STUDENT']) },
    { path: '/my-exams', element: protect(<ExamsPage />, ['STUDENT']) },

    // Admin
    { path: '/settings', element: protect(<SettingsPage />, ['ADMIN']) },

    // Fallback
    { path: '*', element: <Navigate to="/dashboard" replace /> }
];

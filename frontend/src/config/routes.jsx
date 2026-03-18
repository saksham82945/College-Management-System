import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
// Lazy load the ProtectedRoute
import { ProtectedRoute } from '@/components/ProtectedRoute';
// Lazy load pages for code splitting
const LandingPage = React.lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = React.lazy(() => import('@/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const Dashboard = React.lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const StudentsPage = React.lazy(() => import('@/pages/StudentsPage').then(m => ({ default: m.StudentsPage })));
const AddStudentPage = React.lazy(() => import('@/pages/AddStudentPage').then(m => ({ default: m.AddStudentPage })));
const StudentDetailsPage = React.lazy(() => import('@/pages/StudentDetailsPage').then(m => ({ default: m.StudentDetailsPage })));
const TeachersPage = React.lazy(() => import('@/pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const AddTeacherPage = React.lazy(() => import('@/pages/AddTeacherPage').then(m => ({ default: m.AddTeacherPage })));
const FeesPage = React.lazy(() => import('@/pages/FeesPage').then(m => ({ default: m.FeesPage })));
const ResetPasswordPage = React.lazy(() => import('@/pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));

const ExamsPage = React.lazy(() => import('@/pages/ExamsPage').then(m => ({ default: m.ExamsPage })));
const StaffPage = React.lazy(() => import('@/pages/StaffPage').then(m => ({ default: m.StaffPage })));
const AddStaffPage = React.lazy(() => import('@/pages/AddStaffPage').then(m => ({ default: m.AddStaffPage })));
const TimetablePage = React.lazy(() => import('@/pages/TimetablePage').then(m => ({ default: m.TimetablePage })));
const PayrollPage = React.lazy(() => import('@/pages/PayrollPage').then(m => ({ default: m.PayrollPage })));
const SettingsPage = React.lazy(() => import('@/pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ClassesPage = React.lazy(() => import('@/pages/ClassesPage').then(m => ({ default: m.ClassesPage })));
const ClassDetailsPage = React.lazy(() => import('@/pages/ClassDetailsPage').then(m => ({ default: m.ClassDetailsPage })));
const GradesPage = React.lazy(() => import('@/pages/GradesPage').then(m => ({ default: m.GradesPage })));
const ProjectDashboard = React.lazy(() => import('@/pages/faculty/ProjectDashboard').then(m => ({ default: m.default })));
const AttendancePage = React.lazy(() => import('@/pages/AttendancePage').then(m => ({ default: m.AttendancePage })));
const SignupPage = React.lazy(() => import('@/pages/SignupPage').then(m => ({ default: m.SignupPage })));
const StudentDashboard = React.lazy(() => import('@/pages/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const TeacherDashboard = React.lazy(() => import('@/pages/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
// Helper to create protected route
const protect = (element, roles) => (<ProtectedRoute allowedRoles={roles}>{element}</ProtectedRoute>);
export const routes = [
    // Public routes
    { path: '/', element: <LandingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/reset-password', element: <ResetPasswordPage /> },
    // Protected routes
    { path: '/dashboard', element: protect(<Dashboard />) },
    { path: '/student-dashboard', element: protect(<StudentDashboard />, ['STUDENT']) },
    { path: '/teacher-dashboard', element: protect(<TeacherDashboard />, ['TEACHER']) },
    // Students
    { path: '/students', element: protect(<StudentsPage />, ['ADMIN', 'TEACHER']) },
    { path: '/students/add', element: protect(<AddStudentPage />, ['ADMIN', 'TEACHER']) },
    { path: '/students/:id', element: protect(<StudentDetailsPage />, ['ADMIN']) },
    // Teachers
    { path: '/teachers', element: protect(<TeachersPage />, ['ADMIN']) },
    { path: '/teachers/add', element: protect(<AddTeacherPage />, ['ADMIN']) },
    { path: '/teachers/edit/:id', element: protect(<AddTeacherPage />, ['ADMIN']) },
    // Staff
    { path: '/staff', element: protect(<StaffPage />, ['ADMIN']) },
    { path: '/staff/add', element: protect(<AddStaffPage />, ['ADMIN']) },
    // Classes
    { path: '/classes', element: protect(<ClassesPage />, ['ADMIN']) },
    { path: '/classes/:id', element: protect(<ClassDetailsPage />, ['ADMIN']) },
    // Academic
    { path: '/timetable', element: protect(<TimetablePage />) },
    { path: '/exams', element: protect(<ExamsPage />, ['ADMIN', 'TEACHER', 'STUDENT']) },
    { path: '/grades', element: protect(<GradesPage />, ['ADMIN']) },
    // Attendance
    { path: '/attendance', element: protect(<AttendancePage />, ['ADMIN', 'TEACHER']) },
    // Finance
    { path: '/fees', element: protect(<FeesPage />, ['ADMIN']) },
    { path: '/payroll', element: protect(<PayrollPage />, ['ADMIN']) },
    // Projects
    { path: '/projects/dashboard', element: protect(<ProjectDashboard />, ['ADMIN']) },
    { path: '/settings', element: protect(<SettingsPage />, ['ADMIN']) },
    // Smart fallback — redirect based on user role
    { path: '*', element: <RoleRedirect /> }
];

// Role-aware redirect component
function RoleRedirect() {
    const { user } = useAuthStore();
    if (!user) return <Navigate to="/login" replace />;
    const roles = user.roles || [];
    if (roles.includes('STUDENT')) return <Navigate to="/student-dashboard" replace />;
    if (roles.includes('TEACHER')) return <Navigate to="/teacher-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
}

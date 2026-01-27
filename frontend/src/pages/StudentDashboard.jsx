import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { BookOpen, CreditCard, Calendar, CheckCircle, TrendingUp, Clock, Award, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAction } from '@/components/dashboard/QuickAction';

export const StudentDashboard = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        student: null,
        attendance: { total: 0, present: 0, absent: 0, presentPct: 0 },
        fees: { paid: 0, due: 0 }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/dashboard/student');
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch student dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const card = `rounded-2xl border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;
    const studentName = user?.fullName || data.student?.name || 'Student';
    const studentProfile = data.student || {};

    if (loading) return (
        <Layout>
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Welcome Header */}
                <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
                    <h1 className="text-2xl font-bold">👋 Hello, {studentName.split(' ')[0]}!</h1>
                    <p className="text-purple-200 mt-1 text-sm">
                        {studentProfile.course || 'Course not set'}
                        {studentProfile.semester ? ` · Semester ${studentProfile.semester}` : ''}
                        {studentProfile.rollNo && studentProfile.rollNo !== '—' ? ` · Roll: ${studentProfile.rollNo}` : ''}
                    </p>
                    <div className="flex gap-6 mt-4">
                        <div>
                            <p className="text-xs text-purple-200 uppercase tracking-wide">Attendance</p>
                            <p className="text-2xl font-bold">{data.attendance.presentPct}%</p>
                        </div>
                        <div>
                            <p className="text-xs text-purple-200 uppercase tracking-wide">Classes Attended</p>
                            <p className="text-2xl font-bold">{data.attendance.present}/{data.attendance.total}</p>
                        </div>
                        <div>
                            <p className="text-xs text-purple-200 uppercase tracking-wide">Fees Paid</p>
                            <p className="text-2xl font-bold">₹{data.fees.paid > 0 ? `${(data.fees.paid / 1000).toFixed(0)}k` : '0'}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        {
                            label: 'Attendance',
                            value: data.attendance.total > 0 ? `${data.attendance.presentPct}%` : 'No Data',
                            icon: CheckCircle,
                            color: data.attendance.presentPct >= 75 ? 'text-green-500' : 'text-red-500',
                            bg: isDarkMode ? 'bg-green-900/20' : 'bg-green-50'
                        },
                        {
                            label: 'Fee Paid',
                            value: data.fees.paid > 0 ? `₹${(data.fees.paid / 1000).toFixed(0)}k` : '₹0',
                            icon: CreditCard,
                            color: 'text-blue-500',
                            bg: isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                        },
                        {
                            label: 'Classes Attended',
                            value: data.attendance.present,
                            icon: BookOpen,
                            color: 'text-purple-500',
                            bg: isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                        },
                        {
                            label: 'Classes Missed',
                            value: data.attendance.absent,
                            icon: TrendingUp,
                            color: 'text-red-500',
                            bg: isDarkMode ? 'bg-red-900/20' : 'bg-red-50'
                        },
                    ].map(s => (
                        <StatCard
                            key={s.label}
                            title={s.label}
                            value={s.value}
                            icon={s.icon}
                            color={s.color}
                            bg={s.bg}
                            isDarkMode={isDarkMode}
                            layout="horizontal"
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Profile Info */}
                    <div className={card}>
                        <h2 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <Award size={16} className="inline mr-2 text-yellow-500" />
                            My Profile
                        </h2>
                        {data.student ? (
                            <div className="space-y-3">
                                {[
                                    { label: 'Full Name', value: studentProfile.name },
                                    { label: 'Roll Number', value: studentProfile.rollNo },
                                    { label: 'Course', value: studentProfile.course },
                                    { label: 'Semester', value: studentProfile.semester },
                                    { label: 'Section', value: studentProfile.section },
                                    { label: 'Email', value: studentProfile.email },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</span>
                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{item.value || '—'}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <AlertCircle size={32} className="mx-auto mb-2 opacity-40" />
                                <p className="text-sm">Student profile not found</p>
                                <p className="text-xs mt-1">Contact your administrator</p>
                            </div>
                        )}
                    </div>

                    {/* Attendance Overview */}
                    <div className={card}>
                        <h2 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <CheckCircle size={16} className="inline mr-2 text-green-500" />
                            Attendance Overview
                        </h2>
                        {data.attendance.total > 0 ? (
                            <div className="space-y-4">
                                {/* Circular progress visualization */}
                                <div className="flex items-center justify-center">
                                    <div className="relative">
                                        <svg className="w-32 h-32" viewBox="0 0 36 36">
                                            <path className={isDarkMode ? 'stroke-gray-700' : 'stroke-gray-200'}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" strokeWidth="3" />
                                            <path className={data.attendance.presentPct >= 75 ? 'stroke-green-500' : 'stroke-red-500'}
                                                strokeDasharray={`${data.attendance.presentPct}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{data.attendance.presentPct}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                                        <p className="text-lg font-bold text-green-600">{data.attendance.present}</p>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Present</p>
                                    </div>
                                    <div className={`p-3 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                                        <p className="text-lg font-bold text-red-600">{data.attendance.absent}</p>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Absent</p>
                                    </div>
                                </div>

                                {data.attendance.presentPct < 75 && (
                                    <div className={`p-3 rounded-xl text-xs font-medium ${isDarkMode ? 'bg-red-900/30 text-red-300 border border-red-800' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                                        ⚠️ Your attendance is below 75%. Please attend more classes to avoid grade deductions.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <CheckCircle size={32} className="mx-auto mb-2 opacity-40" />
                                <p className="text-sm">No attendance records yet</p>
                                <p className="text-xs mt-1">Attendance will appear here once your teachers mark it</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'View Timetable', icon: Calendar, color: 'from-purple-500 to-pink-600', path: '/timetable' },
                        { label: 'View Attendance', icon: CheckCircle, color: 'from-green-500 to-emerald-600', path: '/attendance' },
                        { label: 'Fee Details', icon: CreditCard, color: 'from-orange-500 to-amber-600', path: '/fees' },
                    ].map(a => (
                        <QuickAction
                            key={a.label}
                            label={a.label}
                            icon={a.icon}
                            color={a.color}
                            onClick={() => navigate(a.path)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

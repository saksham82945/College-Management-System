import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { Users, BookOpen, Calendar, CheckCircle, Clock, TrendingUp, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuickAction } from '@/components/dashboard/QuickAction';

export const TeacherDashboard = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        teacher: {},
        totalStudents: 0,
        students: [],
        attendanceStats: { totalMarked: 0, presentMarked: 0, absentMarked: 0, presentPct: 0 },
        recentAttendance: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiClient.get('/dashboard/teacher');
                if (res.data.success) {
                    setData(res.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch teacher dashboard', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const teacherName = user?.fullName || data.teacher?.name || 'Teacher';
    const card = `rounded-2xl border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;

    if (loading) return (
        <Layout>
            <div className="flex justify-center items-center h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Welcome Banner */}
                <div className="rounded-2xl p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white">
                    <h1 className="text-2xl font-bold">👋 Hello, {teacherName.split(' ')[0]}!</h1>
                    <p className="text-emerald-200 mt-1 text-sm">
                        {data.teacher?.designation || 'Faculty'} {data.teacher?.department ? `· ${data.teacher.department}` : ''}
                    </p>
                    <div className="flex gap-6 mt-4">
                        <div>
                            <p className="text-xs text-emerald-200 uppercase tracking-wide">Total Students</p>
                            <p className="text-2xl font-bold">{data.totalStudents}</p>
                        </div>
                        <div>
                            <p className="text-xs text-emerald-200 uppercase tracking-wide">Attendance Marked</p>
                            <p className="text-2xl font-bold">{data.attendanceStats.totalMarked}</p>
                        </div>
                        <div>
                            <p className="text-xs text-emerald-200 uppercase tracking-wide">Present Rate</p>
                            <p className="text-2xl font-bold">{data.attendanceStats.presentPct}%</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Mark Attendance', icon: CheckCircle, color: 'from-green-500 to-emerald-600', action: () => navigate('/attendance') },
                        { label: 'View Students', icon: Users, color: 'from-blue-500 to-indigo-600', action: () => navigate('/students') },
                        { label: 'Exam Schedule', icon: Calendar, color: 'from-purple-500 to-pink-600', action: () => navigate('/exams') },
                        { label: 'Timetable', icon: Clock, color: 'from-orange-500 to-amber-600', action: () => navigate('/timetable') },
                    ].map(a => (
                        <QuickAction
                            key={a.label}
                            label={a.label}
                            icon={a.icon}
                            color={a.color}
                            onClick={a.action}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* My Students */}
                    <div className={card}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                <Users size={16} className="inline mr-2 text-teal-500" />
                                My Students ({data.totalStudents})
                            </h2>
                        </div>
                        {data.students.length > 0 ? (
                            <div className="space-y-3">
                                {data.students.slice(0, 5).map((s, i) => (
                                    <div key={i} className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{s.name}</p>
                                                <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Roll: {s.rollNo} · {s.course}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${isDarkMode ? 'bg-emerald-900/40 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                                                Sem {s.semester}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {data.students.length > 5 && (
                                    <button onClick={() => navigate('/students')}
                                        className={`w-full text-center text-xs font-semibold py-2 rounded-xl transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                                        View All {data.totalStudents} Students <ChevronRight size={12} className="inline" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <Users size={32} className="mx-auto mb-2 opacity-40" />
                                <p className="text-sm">No students enrolled yet</p>
                            </div>
                        )}
                    </div>

                    {/* Attendance Stats */}
                    <div className={card}>
                        <h2 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <TrendingUp size={16} className="inline mr-2 text-blue-500" />
                            Attendance Overview
                        </h2>
                        {data.attendanceStats.totalMarked > 0 ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                                        <p className="text-xl font-bold text-green-600">{data.attendanceStats.presentMarked}</p>
                                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Present</p>
                                    </div>
                                    <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                                        <p className="text-xl font-bold text-red-600">{data.attendanceStats.absentMarked}</p>
                                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Absent</p>
                                    </div>
                                    <div className={`p-4 rounded-xl text-center ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                        <p className="text-xl font-bold text-blue-600">{data.attendanceStats.presentPct}%</p>
                                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rate</p>
                                    </div>
                                </div>

                                {/* Recent attendance records */}
                                <div>
                                    <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Recent Records</h3>
                                    <div className="space-y-2">
                                        {data.recentAttendance.slice(0, 5).map((a, i) => (
                                            <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                                <div>
                                                    <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{a.studentRoll}</span>
                                                    <span className={`text-xs ml-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{a.studentCourse}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${a.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {a.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`text-center py-8 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                <CheckCircle size={32} className="mx-auto mb-2 opacity-40" />
                                <p className="text-sm">No attendance records yet</p>
                                <button onClick={() => navigate('/attendance')} className="mt-3 text-xs text-emerald-500 hover:text-emerald-400 font-semibold">
                                    Mark Attendance →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    Users, BookOpen, Calendar, CheckCircle, Clock, 
    TrendingUp, ChevronRight, AlertCircle, Sparkles,
    UserCheck, ClipboardList, Zap, GraduationCap, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { StatCard } from '@/components/dashboard/StatCard';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const TeacherDashboard = () => {
    const { isDarkMode, roleTheme } = useTheme();
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

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col justify-center items-center h-[80vh] gap-4">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                className="max-w-[1400px] mx-auto space-y-8 pb-12 px-4"
            >
                {/* Faculty Command Banner */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${roleTheme} z-0`} />
                    <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 -ml-20 -mb-20 bg-slate-900/20 rounded-full blur-2xl" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Faculty Portal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                                Good Day, <span className="opacity-80"></span> {teacherName.split(' ')[0]}
                            </h1>
                            <p className="text-white/80 font-bold max-w-md text-sm md:text-base">
                                {data.teacher?.designation || 'Academic Faculty'} 
                                {data.teacher?.department ? ` • ${data.teacher.department}` : ''}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="glass-card !bg-white/10 p-5 rounded-3xl border border-white/20 text-center min-w-[140px]">
                                <p className="text-3xl font-black">{data.totalStudents}</p>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Total Students</p>
                            </div>
                            <div className="glass-card !bg-white/10 p-5 rounded-3xl border border-white/20 text-center min-w-[140px]">
                                <p className="text-3xl font-black">{data.attendanceStats.presentPct}%</p>
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mt-1">Class Attendance</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Mark Attendance', icon: UserCheck, color: 'from-emerald-500 to-teal-600', action: () => navigate('/attendance') },
                        { label: 'My Students', icon: Users, color: 'from-indigo-500 to-blue-600', action: () => navigate('/students') },
                        { label: 'Manage Exams', icon: ClipboardList, color: 'from-purple-500 to-pink-600', action: () => navigate('/exams') },
                        { label: 'View Timetable', icon: Clock, color: 'from-orange-500 to-amber-600', action: () => navigate('/timetable') },
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* My Students Card */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] lg:col-span-1">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <GraduationCap className="text-primary" size={24} />
                                My Students
                            </h2>
                            <button onClick={() => navigate('/students')} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        
                        {data.students.length > 0 ? (
                            <div className="space-y-4">
                                {data.students.slice(0, 6).map((s, i) => (
                                    <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                                        <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/10">
                                            <Users size={18} />
                                        </div>
                                        <div className="overflow-hidden flex-1">
                                            <p className="text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">{s.name}</p>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">R-{s.rollNo} • {s.course}</p>
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                                            Sem {s.semester}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 opacity-50">
                                <Users size={48} className="mx-auto mb-4" />
                                <p className="font-bold">No students assigned</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Attendance Overview */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem] lg:col-span-2">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                            <Target className="text-primary" size={24} />
                            Attendance Stats
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {[
                                { label: 'Present', value: data.attendanceStats.presentMarked, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                { label: 'Absent', value: data.attendanceStats.absentMarked, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                                { label: 'Attendance %', value: `${data.attendanceStats.presentPct}%`, color: 'text-sky-500', bg: 'bg-sky-500/10' },
                            ].map((stat, i) => (
                                <div key={i} className={`p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm ${stat.bg}`}>
                                    <p className={`text-3xl font-black mb-1 tracking-tighter ${stat.color}`}>{stat.value}</p>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Attendance Records */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Attendance Records</h3>
                                <button onClick={() => navigate('/attendance')} className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</button>
                            </div>
                            
                            <div className="space-y-3">
                                {data.recentAttendance.length > 0 ? (
                                    data.recentAttendance.slice(0, 5).map((a, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-2 h-2 rounded-full ${a.status === 'present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
                                                <div>
                                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none mb-1">{a.studentRoll}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{a.studentCourse}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-slate-900 dark:text-white">
                                                    {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                                </p>
                                                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${a.status === 'present' ? 'text-emerald-500' : 'text-rose-500'}`}>{a.status}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl p-10 text-center opacity-40">
                                        <ClipboardList size={32} className="mx-auto mb-3" />
                                        <p className="text-sm font-bold uppercase tracking-widest">Awaiting Attendance Records</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Layout>
    );
};


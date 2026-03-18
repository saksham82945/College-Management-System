import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    BookOpen, CreditCard, Calendar, CheckCircle, TrendingUp, 
    Clock, Award, AlertCircle, Sparkles, ChevronRight, ArrowRight,
    User, GraduationCap, ShieldCheck, Mail, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickAction } from '@/components/dashboard/QuickAction';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

export const StudentDashboard = () => {
    const { isDarkMode, roleTheme } = useTheme();
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

    const studentName = user?.fullName || data.student?.name || 'Student';
    const studentProfile = data.student || {};

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
                {/* Personalized Welcome Header */}
                <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-br ${roleTheme} z-0`} />
                    <div className="absolute top-0 right-0 w-96 h-96 -mr-32 -mt-32 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-primary-dark/20 rounded-full blur-2xl" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                    <Sparkles size={20} className="text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Student Portal</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                                Welcome back, {studentName.split(' ')[0]}!
                            </h1>
                            <p className="text-white/80 font-bold max-w-md text-sm md:text-base">
                                {studentProfile.course || 'Course not set'}
                                {studentProfile.semester ? ` • Semester ${studentProfile.semester}` : ''}
                                {studentProfile.section ? ` • Section ${studentProfile.section}` : ''}
                            </p>
                            
                            <div className="flex flex-wrap gap-4 mt-8">
                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                        <span className="text-sm font-black uppercase tracking-tighter">Active Student</span>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">Roll Number</p>
                                    <p className="text-sm font-black uppercase tracking-tighter text-white">
                                        {studentProfile.rollNo || 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex flex-col items-end">
                            <div className="glass-card !bg-white/10 p-6 rounded-3xl border border-white/20 text-right min-w-[200px]">
                                <Activity size={32} className="mb-4 text-white ml-auto" />
                                <p className="text-4xl font-black leading-none">{data.attendance.presentPct}%</p>
                                <p className="text-xs font-bold text-white/60 mt-2 uppercase tracking-widest">Attendance Status</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Attendance Status" 
                        value={data.attendance.presentPct >= 75 ? 'Good' : 'Shortage'} 
                        icon={CheckCircle} 
                        color={data.attendance.presentPct >= 75 ? 'text-emerald-500' : 'text-danger'} 
                        bg={data.attendance.presentPct >= 75 ? 'bg-emerald-500/10' : 'bg-danger/10'} 
                    />
                    <StatCard 
                        title="Fees Paid" 
                        value={data.fees.paid > 0 ? `₹${(data.fees.paid / 1000).toFixed(0)}k` : '₹0'} 
                        icon={CreditCard} 
                        color="text-indigo-500" 
                        bg="bg-indigo-500/10" 
                    />
                    <StatCard 
                        title="Total Present" 
                        value={data.attendance.present} 
                        icon={BookOpen} 
                        color="text-sky-500" 
                        bg="bg-sky-500/10" 
                    />
                    <StatCard 
                        title="Total Absent" 
                        value={data.attendance.absent} 
                        icon={TrendingUp} 
                        color="text-rose-500" 
                        bg="bg-rose-500/10" 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Student Profile Card */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <User className="text-primary" size={24} />
                                Student Profile
                            </h2>
                            <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                <ArrowRight size={18} />
                            </button>
                        </div>

                        {data.student ? (
                            <div className="space-y-6">
                                {[
                                    { label: 'Full Name', value: studentProfile.name, icon: User },
                                    { label: 'Roll Number', value: studentProfile.rollNo, icon: ShieldCheck },
                                    { label: 'Course', value: studentProfile.course, icon: BookOpen },
                                    { label: 'Semester', value: `Semester ${studentProfile.semester || 'N/A'}`, icon: Clock },
                                    { label: 'Email Address', value: studentProfile.email, icon: Mail },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-primary/5 text-primary">
                                                <GraduationCap size={16} />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-black text-slate-900 dark:text-white">{item.value || '—'}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 opacity-50">
                                <AlertCircle size={48} className="mx-auto mb-4" />
                                <p className="font-bold">Profile Not Found</p>
                            </div>
                        )}
                    </motion.div>

                    {/* Attendance Analysis */}
                    <motion.div variants={itemVariants} className="glass-card p-8 rounded-[2.5rem]">
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8 flex items-center gap-3">
                            <Activity className="text-primary" size={24} />
                            Attendance Analytics
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-slate-100 dark:text-slate-800" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                    <motion.circle 
                                        initial={{ strokeDasharray: "0 251.2" }}
                                        animate={{ strokeDasharray: `${(data.attendance.presentPct / 100) * 251.2} 251.2` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className={data.attendance.presentPct >= 75 ? 'text-emerald-500' : 'text-rose-500'}
                                        strokeWidth="10" 
                                        strokeDashcap="round"
                                        stroke="currentColor" 
                                        fill="transparent" 
                                        r="40" cx="50" cy="50" 
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">{data.attendance.presentPct}%</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yield</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 w-full">
                                <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Present</span>
                                        <span className="text-xl font-black text-emerald-600">{data.attendance.present}</span>
                                    </div>
                                    <div className="w-full h-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(data.attendance.present / data.attendance.total) * 100}%` }}
                                            className="h-full bg-emerald-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="p-5 rounded-3xl bg-rose-500/5 border border-rose-500/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-600">Absent</span>
                                        <span className="text-xl font-black text-rose-600">{data.attendance.absent}</span>
                                    </div>
                                    <div className="w-full h-1 bg-rose-100 dark:bg-rose-900/30 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(data.attendance.absent / data.attendance.total) * 100}%` }}
                                            className="h-full bg-rose-500 rounded-full"
                                        />
                                    </div>
                                </div>

                                {data.attendance.presentPct < 75 && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                                        <AlertCircle className="text-amber-500 shrink-0" size={18} />
                                        <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-tight">
                                            Warning: Attendance below 75% threshold
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Timetable', icon: Calendar, color: 'from-purple-500 to-indigo-600', path: '/timetable' },
                        { label: 'Attendance', icon: CheckCircle, color: 'from-emerald-500 to-teal-600', path: '/attendance' },
                        { label: 'Fees', icon: CreditCard, color: 'from-orange-500 to-amber-600', path: '/fees' },
                        { label: 'Grades', icon: Award, color: 'from-sky-500 to-blue-600', path: '/grades' },
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
            </motion.div>
        </Layout>
    );
};


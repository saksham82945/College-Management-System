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


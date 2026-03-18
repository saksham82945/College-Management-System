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


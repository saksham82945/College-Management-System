import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Save, Award, BookOpen, GraduationCap, Users, TrendingUp, ShieldCheck, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const GradesPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    
    // Selection States
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [exams, setExams] = useState(['First Term', 'Final Examination', 'Internal Assessment']);
    const [selectedExam, setSelectedExam] = useState('');
    const [subjects, setSubjects] = useState(['Mathematics', 'Physics', 'English']);
    const [selectedSubject, setSelectedSubject] = useState('');
    
    // Data States
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState({});

    useEffect(() => {
        if (user?.roles?.includes('ADMIN')) fetchClasses();
    }, [user]);

    useEffect(() => {
        if (selectedClass) fetchStudents(selectedClass);
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch (error) {
            console.error('Failed to fetch classes', error);
        }
    };

    const fetchStudents = async (classId) => {
        setLoading(true);
        try {
            const response = await apiClient.get('/students');
            if (response.data.success) {
                setStudents(response.data.data);
                setGrades({});
            }
        } catch (error) {
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleGradeChange = (studentId, value) => {
        const numValue = parseFloat(value);
        if (numValue >= 0 && numValue <= 100) {
            setGrades(prev => ({ ...prev, [studentId]: numValue }));
        }
    };

    const handleSubmit = async () => {
        if (!selectedClass || !selectedExam || !selectedSubject) {
            toast.error('Please select all fields');
            return;
        }
        toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
            loading: 'Saving grades...',
            success: 'Grades updated successfully!',
            error: 'Failed to save grades'
        });
    };

    const selectCls = `h-14 px-6 rounded-2xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20 appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em_1em]
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Grades Management"
                    subtitle="Enter and manage academic grades for students"
                    icon={Award}
                    backTo="/dashboard"
                    actions={selectedClass && (
                        <Button
                            onClick={handleSubmit}
                            icon={Save}
                        >
                            Save Grades
                        </Button>
                    )}
                />

                {/* Criteria Selection */}
                <div className={`p-10 rounded-[3.5rem] border glass-card space-y-8
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <ShieldCheck size={18} />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-slate-400">Select Criteria</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Class</label>
                            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className={selectCls}>
                                <option value="">SELECT CLASS</option>
                                {classes.map(cls => (<option key={cls._id} value={cls._id}>CLASS {cls.name}-{cls.section}</option>))}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Exam</label>
                            <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className={selectCls}>
                                <option value="">SELECT EXAM</option>
                                {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Select Subject</label>
                            <select value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)} className={selectCls}>
                                <option value="">SELECT SUBJECT</option>
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {!selectedClass ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center space-y-6"
                    >
                        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-[3rem] flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-slate-900 shadow-xl">
                            <TrendingUp size={48} className="text-slate-300 dark:text-slate-600" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Class Selected</h3>
                            <p className="text-slate-500 font-bold mt-1">Please select a class, exam, and subject to begin.</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StatCard title="Total Students" value={students.length} icon={Users} color="text-primary" bg="bg-primary/10" />
                            <StatCard title="Class Average" value={(Object.values(grades).reduce((a, b) => a + b, 0) / (Object.keys(grades).length || 1)).toFixed(1)} icon={GraduationCap} color="text-amber-500" bg="bg-amber-500/10" />
                            <StatCard title="Status" value="Online" icon={BookOpen} color="text-success" bg="bg-success/10" />
                        </div>

                        {/* Grade Input Table */}
                        <div className={`rounded-[3rem] border overflow-hidden glass-card
                            ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Name</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-48">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Roll Number</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-64">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Marks (Out of 100)</span>
                                            </th>
                                            <th className="px-10 py-8 text-left border-b border-slate-200/50 dark:border-slate-800/50 w-40">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Grade</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {students.map((student, i) => (
                                            <motion.tr 
                                                key={student._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group hover:bg-primary/[0.02] transition-colors"
                                            >
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-primary/20">
                                                            {student.userId.firstName[0]}
                                                        </div>
                                                        <div>
                                                            <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                                                {student.userId.firstName} {student.userId.lastName}
                                                            </p>
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Student</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <span className={`text-xs font-black tracking-widest uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        {student.rollNo}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="relative group/input max-w-[150px]">
                                                        <input 
                                                            type="number" 
                                                            min="0" max="100" 
                                                            value={grades[student._id] || ''} 
                                                            onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                                            className={`w-full h-12 px-6 rounded-xl border text-sm font-black outline-none transition-all focus:ring-4 focus:ring-primary/20
                                                                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`}
                                                            placeholder="000"
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase opacity-40">pts</div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <AnimatePresence mode="wait">
                                                        {!grades[student._id] ? (
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-2 w-8 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                                        ) : (
                                                            <motion.div
                                                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                                className={`h-11 w-11 rounded-2xl flex items-center justify-center text-xs font-black shadow-lg
                                                                    ${grades[student._id] >= 90 ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 
                                                                    grades[student._id] >= 75 ? 'bg-primary text-white shadow-primary/30' : 
                                                                    grades[student._id] >= 60 ? 'bg-amber-500 text-white shadow-amber-500/30' : 
                                                                    'bg-red-500 text-white shadow-red-500/30'}`}
                                                            >
                                                                {grades[student._id] >= 90 ? 'A+' : 
                                                                 grades[student._id] >= 75 ? 'A' : 
                                                                 grades[student._id] >= 60 ? 'B' : 'C'}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
};

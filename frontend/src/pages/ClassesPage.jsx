import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, Search, Users, Calendar, BookOpen, Edit2, ShieldCheck, GraduationCap, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button, Input } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { isDarkMode } = useTheme();
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        academicYear: new Date().getFullYear().toString(),
        classTeacher: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
        fetchTeachers();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch (error) {
            console.error('Failed to fetch classes', error);
            toast.error('Failed to load classes');
        } finally {
            setLoading(false);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await apiClient.get('/teachers');
            if (response.data.success) setTeachers(response.data.data);
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isEditing = !!formData.id;
        const promise = isEditing 
            ? apiClient.put(`/classes/${formData.id}`, formData)
            : apiClient.post('/classes', formData);

        toast.promise(promise, {
            loading: isEditing ? 'Updating class...' : 'Creating new class...',
            success: isEditing ? 'Class updated successfully!' : 'Class created successfully!',
            error: (err) => err.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} class`
        }).then(() => {
            setShowModal(false);
            fetchClasses();
            setFormData({
                name: '',
                section: '',
                academicYear: new Date().getFullYear().toString(),
                classTeacher: ''
            });
        });
    };

    const filteredClasses = classes.filter(cls => 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.section.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Classes"
                    subtitle={`Managing ${classes.length} academic classes`}
                    icon={BookOpen}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            onClick={() => setShowModal(true)} 
                            icon={Plus}
                        >
                            Add Class
                        </Button>
                    }
                />

                {/* Overview Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Total Classes" value={classes.length} icon={ShieldCheck} color="text-primary" bg="bg-primary/10" />
                    <StatCard title="Total Students" value={classes.reduce((acc, c) => acc + (c.studentCount || 0), 0)} icon={Users} color="text-emerald-500" bg="bg-emerald-500/10" />
                    <StatCard title="Current Year" value={new Date().getFullYear()} icon={Calendar} color="text-amber-500" bg="bg-amber-500/10" />
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1 w-full max-w-xl">
                        <Input 
                            type="search" 
                            placeholder="Search for classes, sections or teachers..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon={Search}
                        />
                    </div>
                </div>

                {/* Classes Matrix */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Loading Classes</span>
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-32 text-center glass-card rounded-[3.5rem] border border-dashed border-slate-200 dark:border-slate-800"
                    >
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shrink-0">
                            <GraduationCap size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black tracking-tight text-slate-400 uppercase">No Classes Found</h3>
                        <p className="text-slate-500 font-bold mt-1">No classes have been registered yet.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredClasses.map((cls, i) => (
                                <motion.div 
                                    key={cls._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group relative"
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-indigo-600 rounded-[3rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                                    <div className={`relative glass-card rounded-[3rem] border overflow-hidden transition-all duration-500
                                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-2'}`}>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
                                                        {cls.name}
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cls.name}</h3>
                                                        <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary text-[10px] font-black tracking-widest uppercase">Section {cls.section}</span>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setFormData({
                                                            id: cls._id,
                                                            name: cls.name,
                                                            section: cls.section,
                                                            academicYear: cls.academicYear,
                                                            classTeacher: cls.classTeacher?._id || cls.classTeacher || ''
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </div>

                                            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                                        <Users size={14} />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{cls.studentCount} Students</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400">
                                                        <Calendar size={14} />
                                                    </div>
                                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Year {cls.academicYear}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">CT</div>
                                                    <span className="text-[11px] font-black text-slate-600 dark:text-slate-400">
                                                        {cls.classTeacher ? cls.classTeacher.fullName : 'Teacher Not Assigned'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => navigate(`/classes/${cls._id}`)}
                                            className={`w-full py-5 px-8 flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] transition-all
                                                ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-primary border-t border-slate-100'}`}
                                        >
                                            View Details
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Addition Modal */}
                <AnimatePresence>
                    {showModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowModal(false)}
                                className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`relative w-full max-w-xl rounded-[3rem] p-10 border shadow-2xl overflow-hidden
                                    ${isDarkMode ? 'bg-slate-950 border-slate-800 shadow-none' : 'bg-white border-slate-100'}`}
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {formData.id ? 'Edit Class' : 'Add New Class'}
                                    </h2>
                                    <button onClick={() => setShowModal(false)} className="p-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <Input 
                                            label="Class Name" 
                                            placeholder="e.g. 10" 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                                            required 
                                        />
                                        <Input 
                                            label="Section" 
                                            placeholder="e.g. A" 
                                            value={formData.section} 
                                            onChange={(e) => setFormData({ ...formData, section: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <Input 
                                        label="Academic Year" 
                                        value={formData.academicYear} 
                                        onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })} 
                                        required 
                                    />
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Class Teacher</label>
                                        <select 
                                            className={`w-full h-14 px-6 rounded-2xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20 appearance-none
                                                ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary'}`}
                                            value={formData.classTeacher} 
                                            onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                                        >
                                            <option value="">SELECT TEACHER</option>
                                            {teachers.filter(t => t.userId).map(teacher => (
                                                <option key={teacher._id} value={teacher.userId._id}>{teacher.userId.fullName}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button type="submit" className="flex-1">Add Class</Button>
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

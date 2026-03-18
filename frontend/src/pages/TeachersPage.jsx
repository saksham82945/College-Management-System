import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useResource } from '@/hooks/useResource';
import { Plus, Search, Mail, Phone, BookOpen, ArrowLeft, UserPlus, Edit2, Trash2, Filter, GraduationCap, Award, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, PageHeader } from '@/components';
import { useTheme } from '@/context/ThemeContext';

export const TeachersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { data: teachers, loading, remove } = useResource({ endpoint: '/teachers' });

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate faculty appointment from digital registry?')) return;
        await remove(id);
    };

    const filteredTeachers = teachers.filter(teacher => 
        (teacher.userId?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.employeeId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (teacher.department?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Faculty Directorate"
                    subtitle={`${teachers.length} academic professionals registered`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/teachers/add')}
                        >
                            Commission Faculty
                        </Button>
                    }
                />

                <div className="space-y-8">
                    {/* Intelligence & Navigation Grid */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Input 
                                type="search" 
                                placeholder="Quantum search by faculty name, ID, or tenure..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                icon={Search}
                                className="!space-y-0"
                            />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Tenure Filters
                        </Button>
                    </div>

                    {/* Faculty Matrix */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                                <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">Accessing Archives</span>
                        </div>
                    ) : filteredTeachers.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                        >
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                                <UserPlus className="text-slate-400" size={40}/>
                            </div>
                            <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-2">Registry Vacant</h3>
                            <p className="text-slate-500 max-w-sm text-center mb-8 font-bold text-sm uppercase tracking-tighter opacity-60">
                                No academic personnel identified in current digital footprint.
                            </p>
                            <Button variant="primary" onClick={() => navigate('/teachers/add')} icon={Plus}>
                                Register First Faculty
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredTeachers.map((teacher, i) => (
                                    <motion.div 
                                        key={teacher._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                                        <div className="relative glass-card rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
                                            <div className="p-8">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="relative">
                                                        <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${roleTheme || 'from-primary to-secondary'} flex items-center justify-center text-white font-black text-2xl shadow-xl relative z-10`}>
                                                            {teacher.userId?.fullName?.charAt(0) || '?'}
                                                        </div>
                                                    </div>
                                                    <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                                                        teacher.status === 'active' 
                                                        ? 'bg-success/10 text-success border border-success/20' 
                                                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                                                    }`}>
                                                        {teacher.status}
                                                    </div>
                                                </div>

                                                <div className="space-y-1 mb-6">
                                                    <h3 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                                        {teacher.userId?.fullName || 'Anonymous Scholar'}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Award size={14} className="text-primary/60" />
                                                        <span className="text-xs font-black uppercase tracking-widest text-primary/80">{teacher.designation || 'Faculty'}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <BookOpen size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight">{teacher.department}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-500">
                                                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900">
                                                            <Mail size={14}/>
                                                        </div>
                                                        <span className="text-xs font-bold tracking-tight truncate">{teacher.userId?.email || 'No digital identifier'}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50/50 dark:bg-slate-900/50 px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={12} className="text-slate-400" />
                                                    <span className="text-[10px] font-black font-mono tracking-widest text-slate-500 opacity-60">ID: {teacher.employeeId}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2"
                                                        onClick={() => navigate(`/teachers/edit/${teacher._id}`)}
                                                    >
                                                        <Edit2 size={14}/>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="xs" 
                                                        className="!p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                                                        onClick={() => handleDelete(teacher._id)}
                                                    >
                                                        <Trash2 size={14}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};


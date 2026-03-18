import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button, DataTable, Input, Modal } from '@/components';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { Plus, GraduationCap, Search, Filter, User, Mail, ShieldCheck, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';
import { motion } from 'framer-motion';

export const StudentsPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [page, searchTerm]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/students?page=${page}&size=25&search=${searchTerm}`);
            const d = response.data.data;
            if (d && d.students) {
                setStudents(d.students);
                setTotal(d.total || d.students.length);
            } else if (Array.isArray(d)) {
                setStudents(d);
                setTotal(d.length);
            } else {
                setStudents([]);
                setTotal(0);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch students');
            console.error('Fetch Students Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await apiClient.delete(`/students/${id}`);
            toast.success('Student deleted successfully');
            fetchStudents();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete student');
        }
    };

    const columns = [
        { 
            key: 'name', 
            label: 'Student Name', 
            render: (v, row) => (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className={`absolute -inset-1 bg-gradient-to-br ${roleTheme} rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-sm`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleTheme} text-white flex items-center justify-center text-sm font-black shrink-0 relative z-10 shadow-lg`}>
                            {(row.name || row.fullName || 'S')[0]}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{row.name || row.fullName}</span>
                        <div className="flex items-center gap-1.5 opacity-50">
                            <Mail size={10} />
                            <span className="text-[10px] font-bold truncate max-w-[150px]">{row.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        { 
            key: 'rollNo', 
            label: 'Roll Number', 
            render: (v) => v ? (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary/60" />
                    <span className={`text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-primary-light' : 'text-primary-dark'}`}>{v}</span>
                </div>
            ) : '—' 
        },
        { 
            key: 'course', 
            label: 'Course', 
            render: (v) => v ? (
                <div className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-tighter text-slate-500 whitespace-nowrap inline-block">
                    {v}
                </div>
            ) : '—'
        },
        { 
            key: 'semester', 
            label: 'Semester', 
            render: (v) => <span className="font-bold text-sm">Sem {v || '—'}</span> 
        },
        {
            key: 'status',
            label: 'Status',
            render: (value) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${value === 'active' ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-50'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        value === 'active' ? 'text-success' : 'text-slate-500'
                     }`}>
                        {value || 'active'}
                    </span>
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Options',
            render: (_, row) => (
                isAdmin ? (
                    <Button 
                        variant="danger" 
                        size="xs" 
                        icon={Trash2}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row._id || row.id);
                        }}
                    >
                        Delete
                    </Button>
                ) : (
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">—</span>
                )
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Student Registry"
                    subtitle={`List of all ${total} registered students`}
                    icon={GraduationCap}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/students/add')}
                        >
                            Add Student
                        </Button>
                    }
                />

                <div className="space-y-6">
                    {/* Search & Intelligence Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Search by name, roll number, or course..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all ${
                                    isDarkMode 
                                    ? 'bg-slate-900/50 border-slate-800 text-white focus:border-primary' 
                                    : 'bg-white border-slate-100 text-slate-900 focus:border-primary shadow-sm'
                                }`}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        </div>
                        <Button variant="secondary" icon={Filter} size="md">
                            Filter Results
                        </Button>
                    </div>

                    {/* Data Matrix */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800"
                    >
                        <DataTable 
                            columns={columns} 
                            data={students} 
                            loading={loading}
                            emptyTitle="No students found"
                            emptyDescription="Try adjusting your search filters to find the student you're looking for."
                            onRowClick={(row) => navigate(`/students/${row._id || row.id}`)}
                        />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};


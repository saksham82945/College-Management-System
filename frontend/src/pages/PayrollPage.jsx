import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { IndianRupee, Download, CheckCircle, Clock, Users, ShieldCheck, Wallet, ArrowUpRight, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { apiClient } from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';

export const PayrollPage = () => {
    const { isDarkMode } = useTheme();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const [teachersRes, staffRes] = await Promise.all([
                    apiClient.get('/teachers'),
                    apiClient.get('/staff')
                ]);

                const toArray = (d) => Array.isArray(d) ? d : (Array.isArray(d?.teachers) ? d.teachers : Array.isArray(d?.staff) ? d.staff : []);

                const teachers = toArray(teachersRes.data.data).map(t => {
                    const base = t.salary?.base || (typeof t.salary === 'number' ? t.salary : 0);
                    return {
                        id: `teacher-${t._id}`,
                        _id: t._id,
                        name: t.userId?.fullName || 'Academic Faculty',
                        email: t.userId?.email || '—',
                        role: 'Faculty',
                        department: t.department || 'General',
                        designation: t.designation || 'Lecturer',
                        salary: base + (t.salary?.allowances || 0) - (t.salary?.deductions || 0),
                        status: 'Pending',
                        date: '—',
                        type: 'teacher'
                    };
                });

                const staff = toArray(staffRes.data.data).map(s => {
                    const base = s.salary?.base || (typeof s.salary === 'number' ? s.salary : 0);
                    return {
                        id: `staff-${s._id}`,
                        _id: s._id,
                        name: s.userId?.fullName || 'Administrative Staff',
                        email: s.userId?.email || '—',
                        role: s.role || 'Staff',
                        department: s.department || 'Admin',
                        designation: s.role || 'Coordinator',
                        salary: base + (s.salary?.allowances || 0) - (s.salary?.deductions || 0),
                        status: 'Pending',
                        date: '—',
                        type: 'staff'
                    };
                });

                setEmployees([...teachers, ...staff]);
            } catch (error) {
                console.error('Payroll load error:', error);
                toast.error('Failed to load payroll data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleProcessPayment = (id) => {
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: 'Processing payment...',
            success: 'Payment processed successfully! 💸',
            error: 'Payment failed',
        }).then(() => {
            setEmployees(prev => prev.map(e => e.id === id ? { ...e, status: 'Paid', date: new Date().toLocaleDateString('en-IN') } : e));
        });
    };

    const totalSalary = employees.reduce((acc, e) => acc + (e.salary || 0), 0);
    const pendingCount = employees.filter(e => e.status !== 'Paid').length;
    const paidCount = employees.filter(e => e.status === 'Paid').length;

    const filteredEmployees = employees.filter(emp => {
        if (filter === 'faculty') return emp.type === 'teacher';
        if (filter === 'staff') return emp.type === 'staff';
        return true;
    });

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-6 pb-24 space-y-12">
                <PageHeader
                    title="Payroll Management"
                    subtitle={`Managing payroll for ${employees.length} employees`}
                    icon={Wallet}
                    backTo="/dashboard"
                    actions={
                        <Button variant="secondary" icon={Download}>
                            Export Report
                        </Button>
                    }
                />

                {/* Economic Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Total Salary" value={`₹${totalSalary.toLocaleString('en-IN')}`} icon={IndianRupee} color="text-indigo-400" bg="bg-indigo-400/10" />
                    <StatCard title="Pending Payments" value={pendingCount} icon={Clock} color="text-amber-500" bg="bg-amber-500/10" />
                    <StatCard title="Completed Payments" value={paidCount} icon={CheckCircle} color="text-emerald-500" bg="bg-emerald-500/10" />
                </div>

                {/* Navigation Controls */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                    <div className={`p-1.5 rounded-[2rem] border glass-card flex gap-1
                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
                        {['all', 'faculty', 'staff'].map(key => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all
                                    ${filter === key 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                                        : 'text-slate-500 hover:text-primary'}`}
                            >
                                {key} ({employees.filter(e => key === 'all' ? true : (key === 'faculty' ? e.type === 'teacher' : e.type === 'staff')).length})
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <Users size={14} className="text-slate-400" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Personnel</p>
                    </div>
                </div>

                {/* Ledger Registry */}
                <div className={`rounded-[3.5rem] border overflow-hidden glass-card
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <div className="p-10 border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Payroll Records</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Financial audit records</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Employee Name</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Department / Role</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Salary</span></th>
                                    <th className="px-10 py-8 text-left"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</span></th>
                                    <th className="px-10 py-8 text-right"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                <AnimatePresence>
                                    {filteredEmployees.map((emp, i) => (
                                        <motion.tr 
                                            key={emp.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: i * 0.03 }}
                                            className="group hover:bg-primary/[0.02] transition-colors"
                                        >
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shadow-xl transition-transform group-hover:scale-110
                                                        ${emp.type === 'teacher' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20' : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20'}`}>
                                                        {emp.name[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{emp.name}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{emp.designation}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{emp.department}</span>
                                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full w-fit ${emp.type === 'teacher' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                        {emp.role.toUpperCase()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee size={12} className="text-emerald-500" />
                                                    <p className={`font-black text-sm ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                                        {(emp.salary || 0).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest
                                                    ${emp.status === 'Paid' 
                                                        ? 'bg-emerald-500/10 text-emerald-500' 
                                                        : 'bg-amber-500/10 text-amber-500 animate-pulse'}`}>
                                                    {emp.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                    {emp.status}
                                                </div>
                                                {emp.date !== '—' && <p className="text-[9px] font-bold text-slate-400 mt-1 pl-1">{emp.date}</p>}
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                {emp.status !== 'Paid' ? (
                                                    <Button 
                                                        onClick={() => handleProcessPayment(emp.id)}
                                                        size="sm"
                                                        icon={ArrowUpRight}
                                                    >
                                                        Pay
                                                    </Button>
                                                ) : (
                                                    <button className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                                                        <FileText size={18} />
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};


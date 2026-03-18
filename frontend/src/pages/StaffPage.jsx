import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { Plus, Search, Users, Briefcase, Filter, ArrowRight, Wallet, Activity, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, PageHeader, Button, Input } from '@/components';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export const StaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode, roleTheme } = useTheme();
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/staff');
            const d = response.data.data;
            setStaff(Array.isArray(d) ? d : (d?.staff || []));
        } catch (error) {
            toast.error('Failed to load staff');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this staff member?')) return;
        try {
            await apiClient.delete(`/staff/${id}`);
            toast.success('Staff deleted successfully');
            fetchStaff();
        } catch (error) {
            toast.error('Failed to delete staff');
        }
    };

    const filteredStaff = staff.filter(s =>
        s.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: 'employeeId',
            label: 'Employee ID',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-secondary/60" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-secondary-light' : 'text-secondary-dark'}`}>
                        {member.employeeId}
                    </span>
                </div>
            )
        },
        {
            key: 'name',
            label: 'Staff Member',
            render: (_, member) => (
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <div className={`absolute -inset-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-40 transition-opacity blur-sm`} />
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-black shrink-0 relative z-10 shadow-lg`}>
                            {(member.userId?.fullName || 'S')[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-black text-sm tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {member.userId?.fullName || 'N/A'}
                        </span>
                        <div className="flex items-center gap-1.5 opacity-50">
                            <span className="text-[10px] font-bold truncate max-w-[150px] uppercase tracking-widest">{member.userId?.email}</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            key: 'role',
            label: 'Designation',
            render: (_, member) => (
                <div className="px-3 py-1.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 inline-flex items-center gap-2">
                    <Briefcase size={12} className="text-indigo-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
                        {member.role}
                    </span>
                </div>
            )
        },
        {
            key: 'department',
            label: 'Department',
            render: (_, member) => (
                <span className="text-xs font-bold uppercase tracking-tight opacity-70">
                    {member.department}
                </span>
            )
        },
        {
            key: 'salary',
            label: 'Salary (Month)',
            render: (_, member) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-emerald-500">
                        <Wallet size={12} />
                        <span className="font-black text-sm tracking-tighter">
                            ₹{((member.salary?.base || 0) + (member.salary?.allowances || 0) - (member.salary?.deductions || 0)).toLocaleString('en-IN')}
                        </span>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Monthly Net</span>
                </div>
            )
        },
        {
            key: 'status',
            label: 'Status',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-400 opacity-50'}`} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                        member.status === 'active' ? 'text-success' : 'text-slate-500'
                    }`}>
                        {member.status === 'active' ? 'Active' : member.status}
                    </span>
                </div>
            )
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (_, member) => (
                <div className="flex items-center gap-2">
                    <Button 
                        variant="danger" 
                        size="xs" 
                        icon={Trash2}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(member._id);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-[1400px] mx-auto px-4 pb-12">
                <PageHeader
                    title="Faculty & Staff"
                    subtitle={`${staff.length} staff members registered`}
                    icon={Users}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="primary" 
                            icon={Plus}
                            onClick={() => navigate('/staff/add')}
                        >
                            Add Staff
                        </Button>
                    }
                />

                {/* Performance Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Total Personnel', value: staff.length, icon: Users, color: 'from-blue-500 to-indigo-600' },
                        { label: 'Active Staff', value: staff.filter(s => s.status === 'active').length, icon: Activity, color: 'from-emerald-500 to-teal-600' },
                        { label: 'Departments', value: [...new Set(staff.map(s => s.department))].length, icon: Briefcase, color: 'from-amber-500 to-orange-600' },
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-6 rounded-[2rem] border transition-all duration-300 flex items-center gap-6 group hover:shadow-2xl
                                ${isDarkMode 
                                    ? 'bg-slate-900/60 border-slate-800/50 hover:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]' 
                                    : 'glass-card border-slate-200 hover:shadow-primary/5 shadow-xl shadow-slate-200/50'}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tighter">{stat.value}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* Search & Intelligence Controls */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input 
                                type="text" 
                                placeholder="Search by name, ID or role..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-12 pr-6 py-4 rounded-2xl border transition-all ${
                                    isDarkMode 
                                    ? 'bg-slate-900 border-slate-800 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-[inner_0_2px_4px_rgba(0,0,0,0.3)]' 
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
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-[2.5rem] overflow-hidden border transition-all duration-500
                            ${isDarkMode 
                                ? 'bg-slate-900/40 border-slate-800/50 shadow-2xl shadow-black/40' 
                                : 'glass-card border-slate-200 shadow-2xl shadow-slate-200/50'}`}
                    >
                        <DataTable
                            columns={columns}
                            data={filteredStaff}
                            loading={loading}
                            emptyTitle="No staff found"
                            emptyDescription="Try adjusting your filters to find the staff member you are looking for."
                            onRowClick={(row) => navigate(`/staff/${row._id}`)}
                        />
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};


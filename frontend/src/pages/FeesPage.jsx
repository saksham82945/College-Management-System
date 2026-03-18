import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, CreditCard, ChevronRight, X, IndianRupee, Layers, CalendarClock, Tag, ShieldCheck, TrendingUp, Wallet, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

const FREQUENCY_LABELS = {
    yearly: { label: 'Yearly', color: 'bg-indigo-500/10 text-indigo-500', icon: CalendarClock },
    semester: { label: 'Semester', color: 'bg-blue-500/10 text-blue-500', icon: Layers },
    monthly: { label: 'Monthly', color: 'bg-amber-500/10 text-amber-500', icon: TrendingUp },
    'one-time': { label: 'One-time', color: 'bg-emerald-500/10 text-emerald-500', icon: CreditCard },
};

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

export const FeesPage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');

    const [feeTypes, setFeeTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Assignment State
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedFeeForAssign, setSelectedFeeForAssign] = useState(null);
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Create Form State
    const [newFee, setNewFee] = useState({
        name: '',
        amount: '',
        frequency: 'yearly',
        description: '',
        isOptional: false,
    });

    useEffect(() => {
        fetchFeeTypes();
        if (isAdmin) fetchClasses();
    }, [isAdmin]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) setClasses(response.data.data);
        } catch {
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) setFeeTypes(response.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', { ...newFee, amount: Number(newFee.amount) });
            toast.success('Fee type created successfully');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch {
            toast.error('Failed to create fee type');
        }
    };

    const openAssignModal = (fee) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) { toast.error('Please select a class and due date'); return; }
        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate,
            });
            toast.success('Fees assigned to class');
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Assignment failed');
        }
    };

    const totalAmount = feeTypes.reduce((sum, f) => sum + (f.amount || 0), 0);

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Fees Management"
                    subtitle="Manage fee structures and assign them to classes."
                    icon={Wallet}
                    backTo="/dashboard"
                    actions={isAdmin && (
                        <Button
                            onClick={() => setShowCreateModal(true)}
                            icon={Plus}
                        >
                            Create Fee Type
                        </Button>
                    )}
                />

                {/* Fees Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Fee Types" 
                        value={feeTypes.length} 
                        icon={Layers} 
                        color="text-primary" 
                        bg="bg-primary/10" 
                    />
                    <StatCard 
                        title="Total Fee Amount" 
                        value={`₹${formatINR(totalAmount)}`} 
                        icon={IndianRupee} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Optional Fees" 
                        value={feeTypes.filter((f) => f.isOptional).length} 
                        icon={ShieldCheck} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Fee Types */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {feeTypes.map((fee, i) => {
                            const freq = FREQUENCY_LABELS[fee.frequency] || { label: fee.frequency, color: 'bg-slate-100 text-slate-600', icon: CreditCard };
                            return (
                                <motion.div
                                    key={fee._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`rounded-[2.5rem] border p-8 transition-all duration-500 glass-card group
                                        ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10'}`}
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'}`}>
                                            <Banknote size={24} className="text-primary" />
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${freq.color}`}>
                                            <freq.icon size={12} />
                                            {freq.label}
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div>
                                            <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900 group-hover:text-primary transition-colors'}`}>
                                                {fee.name}
                                            </h3>
                                            {fee.isOptional && (
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Optional</span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1">
                                            <span className="text-sm font-black text-success">₹</span>
                                            <span className="text-4xl font-black tracking-tighter text-success">{formatINR(fee.amount)}</span>
                                        </div>

                                        <p className={`text-sm font-medium leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500 font-medium'}`}>
                                            {fee.description || 'Fee for academic and administrative services.'}
                                        </p>
                                    </div>

                                    {isAdmin && (
                                        <div className={`pt-6 border-t flex items-center justify-between ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                <ShieldCheck size={12} />
                                                {fee.code || 'CODE'}
                                            </div>
                                            <button
                                                onClick={() => openAssignModal(fee)}
                                                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:gap-3 transition-all"
                                            >
                                                Assign to Class <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full py-32 text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4">
                                <CreditCard size={40} className="text-slate-300 dark:text-slate-600" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Fee Types</h3>
                                <p className="text-slate-500 font-bold mt-1">No fee structures found.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals are kept with standard redesign apply */}
            <AnimatePresence>
                {(showCreateModal || (showAssignModal && selectedFeeForAssign)) && (
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
                                        {showCreateModal ? <Layers size={18} /> : <Tag size={18} />}
                                    </div>
                                    {showCreateModal ? 'New Fee Type' : 'Assign Fees to Class'}
                                </h2>
                                <button onClick={() => { setShowCreateModal(false); setShowAssignModal(false); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            {showCreateModal ? (
                                <form onSubmit={handleCreateFee} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Fee Name</label>
                                        <input
                                            value={newFee.name}
                                            onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                                            className={inputCls}
                                            placeholder="e.g. Tuition Fee"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={newFee.amount}
                                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                                                className={inputCls}
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Frequency</label>
                                            <select
                                                value={newFee.frequency}
                                                onChange={(e) => setNewFee({ ...newFee, frequency: e.target.value })}
                                                className={inputCls}
                                            >
                                                <option value="yearly">Yearly</option>
                                                <option value="semester">Semester</option>
                                                <option value="monthly">Monthly</option>
                                                <option value="one-time">One-time</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Description</label>
                                        <textarea
                                            value={newFee.description}
                                            onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                            className={`${inputCls} h-24 pt-3 resize-none`}
                                            placeholder="Describe the purpose of this fee..."
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14">Create Fee Type</Button>
                                </form>
                            ) : (
                                <form onSubmit={handleAssignFee} className="p-10 space-y-8">
                                    <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">Fee Type</p>
                                            <h4 className="text-lg font-black tracking-tight">{selectedFeeForAssign.name}</h4>
                                        </div>
                                        <p className="text-2xl font-black text-success">₹{formatINR(selectedFeeForAssign.amount)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Class</label>
                                        <select
                                            value={selectedClassId}
                                            onChange={(e) => setSelectedClassId(e.target.value)}
                                            className={inputCls}
                                            required
                                        >
                                            <option value="">— Select Class —</option>
                                            {classes.map((cls) => (
                                                <option key={cls._id} value={cls._id}>Class {cls.name} / {cls.section}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Due Date</label>
                                        <input
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                            className={inputCls}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-14" variant="secondary">Assign Fee</Button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};


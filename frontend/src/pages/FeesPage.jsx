import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, CreditCard, ChevronRight, X, IndianRupee, Layers, CalendarClock, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';

const FREQUENCY_LABELS = {
    yearly: { label: 'Yearly', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300' },
    semester: { label: 'Semester', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    monthly: { label: 'Monthly', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    'one-time': { label: 'One Time', color: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
};

const formatINR = (amount) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

export const FeesPage = () => {
    const { isDarkMode } = useThemeStore();
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
            console.error('Failed to fetch classes');
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) setFeeTypes(response.data.data);
        } catch (error) {
            console.error('Failed to fetch fees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', { ...newFee, amount: Number(newFee.amount) });
            toast.success('Fee structure created successfully!');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch {
            toast.error('Failed to create fee structure');
        }
    };

    const openAssignModal = (fee) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) { toast.error('Please fill all fields'); return; }
        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate,
            });
            toast.success('Fee assigned to class successfully!');
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to assign fee');
        }
    };

    const totalAmount = feeTypes.reduce((sum, f) => sum + (f.amount || 0), 0);

    const card = isDarkMode
        ? 'bg-gray-800/70 border border-gray-700/60 hover:border-indigo-500/50 hover:shadow-indigo-900/30'
        : 'bg-white border border-gray-100 hover:border-indigo-200 hover:shadow-indigo-50';

    const inputCls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-primary/40 ${isDarkMode
            ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-500 focus:border-primary'
            : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-primary focus:bg-white'
        }`;

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
            >
                {/* ── Page Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                                <IndianRupee size={22} className="text-indigo-500" />
                            </div>
                            <h1 className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Fee Management
                            </h1>
                        </div>
                        <p className={`text-sm ml-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Define fee structures and assign them to classes
                        </p>
                    </div>

                    {isAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-semibold transition-colors"
                        >
                            <Plus size={18} /> New Fee Structure
                        </motion.button>
                    )}
                </div>

                {/* ── Summary Strip ── */}
                {feeTypes.length > 0 && (
                    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl border ${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50 border-gray-100'
                        }`}>
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Total Fee Types
                            </p>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {feeTypes.length}
                            </p>
                        </div>
                        <div>
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Combined Amount
                            </p>
                            <p className="text-2xl font-bold text-indigo-500">
                                ₹{formatINR(totalAmount)}
                            </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                Optional Fees
                            </p>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {feeTypes.filter((f) => f.isOptional).length}
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Fee Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence>
                        {feeTypes.map((fee, i) => {
                            const freq = FREQUENCY_LABELS[fee.frequency] || { label: fee.frequency, color: 'bg-gray-100 text-gray-600' };
                            return (
                                <motion.div
                                    key={fee._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 120 }}
                                    layout
                                    className={`rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg group ${card}`}
                                >
                                    {/* Top Row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-indigo-500/15' : 'bg-indigo-50'}`}>
                                            <IndianRupee size={20} className="text-indigo-500" />
                                        </div>
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${freq.color}`}>
                                            {freq.label}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className={`text-base font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {fee.name}
                                    </h3>

                                    {fee.isOptional && (
                                        <span className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded mb-2 ${isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                                            }`}>Optional</span>
                                    )}

                                    {/* Amount */}
                                    <div className={`flex items-baseline gap-0.5 mt-2 mb-3 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        <span className="text-lg font-semibold">₹</span>
                                        <span className="text-3xl font-extrabold leading-none">{formatINR(fee.amount)}</span>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm leading-relaxed line-clamp-2 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {fee.description || 'No description provided.'}
                                    </p>

                                    {/* Footer */}
                                    {isAdmin && (
                                        <div className={`pt-3.5 border-t flex justify-between items-center ${isDarkMode ? 'border-gray-700/60' : 'border-gray-100'}`}>
                                            {fee.code && (
                                                <span className={`text-[11px] font-mono ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {fee.code}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => openAssignModal(fee)}
                                                className="ml-auto flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors group-hover:translate-x-0.5 duration-200"
                                            >
                                                Assign to Class <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Empty State */}
                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4">
                            <div className={`p-5 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                                <CreditCard size={40} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} />
                            </div>
                            <div className="text-center">
                                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    No fee structures yet
                                </p>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {isAdmin ? 'Click "New Fee Structure" to get started.' : 'No fee structures have been created.'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Loading Skeletons */}
                    {loading && Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`rounded-2xl p-5 animate-pulse ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <div className={`h-10 w-10 rounded-xl mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-4 w-2/3 rounded mb-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-8 w-1/2 rounded mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                            <div className={`h-3 w-full rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Create Fee Modal ── */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 12 }}
                            className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`flex justify-between items-center px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                                        <Layers size={16} className="text-indigo-500" />
                                    </div>
                                    <h2 className="text-base font-bold">Create Fee Structure</h2>
                                </div>
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleCreateFee} className="px-6 py-5 space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Fee Name
                                    </label>
                                    <input
                                        value={newFee.name}
                                        onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                                        className={inputCls}
                                        placeholder="e.g. Tuition Fee, Lab Fee"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Amount (₹)
                                        </label>
                                        <div className="relative">
                                            <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>₹</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={newFee.amount}
                                                onChange={(e) => setNewFee({ ...newFee, amount: e.target.value })}
                                                className={`${inputCls} pl-7`}
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            Frequency
                                        </label>
                                        <select
                                            value={newFee.frequency}
                                            onChange={(e) => setNewFee({ ...newFee, frequency: e.target.value })}
                                            className={inputCls}
                                        >
                                            <option value="yearly">Yearly</option>
                                            <option value="semester">Semester</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="one-time">One Time</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Description <span className="text-gray-400 font-normal normal-case">(optional)</span>
                                    </label>
                                    <textarea
                                        value={newFee.description}
                                        onChange={(e) => setNewFee({ ...newFee, description: e.target.value })}
                                        className={`${inputCls} min-h-[80px] resize-none`}
                                        placeholder="Brief description of this fee..."
                                    />
                                </div>

                                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={newFee.isOptional}
                                        onChange={(e) => setNewFee({ ...newFee, isOptional: e.target.checked })}
                                        className="w-4 h-4 accent-indigo-600 rounded"
                                    />
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Mark as optional fee</span>
                                </label>

                                <div className={`flex gap-3 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-colors"
                                    >
                                        Create Structure
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Assign Fee Modal ── */}
            <AnimatePresence>
                {showAssignModal && selectedFeeForAssign && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 12 }}
                            className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-900'
                                }`}
                        >
                            {/* Modal Header */}
                            <div className={`flex justify-between items-center px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-2.5">
                                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                                        <Tag size={16} className="text-green-500" />
                                    </div>
                                    <h2 className="text-base font-bold">Assign Fee to Class</h2>
                                </div>
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Selected Fee Summary */}
                            <div className={`mx-6 mt-5 p-4 rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-gray-700/60' : 'bg-indigo-50'}`}>
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-600' : 'bg-white shadow-sm'}`}>
                                    <IndianRupee size={18} className="text-indigo-500" />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Selected Fee</p>
                                    <p className={`font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{selectedFeeForAssign.name}</p>
                                </div>
                                <div className="ml-auto shrink-0">
                                    <p className={`text-lg font-extrabold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                                        ₹{formatINR(selectedFeeForAssign.amount)}
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleAssignFee} className="px-6 py-5 space-y-4">
                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Select Class
                                    </label>
                                    <select
                                        value={selectedClassId}
                                        onChange={(e) => setSelectedClassId(e.target.value)}
                                        className={inputCls}
                                        required
                                    >
                                        <option value="">— Choose a class —</option>
                                        {classes.map((cls) => (
                                            <option key={cls._id} value={cls._id}>
                                                Class {cls.name} — {cls.section}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <CalendarClock size={12} className="inline mr-1" />Due Date
                                    </label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        className={inputCls}
                                        required
                                    />
                                </div>

                                <div className={`flex gap-3 pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setShowAssignModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-green-500/25 transition-colors"
                                    >
                                        Assign Fee
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

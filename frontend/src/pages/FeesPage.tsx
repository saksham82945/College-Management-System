
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, DollarSign, Calendar, CreditCard, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';

export const FeesPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');

    const [feeTypes, setFeeTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Assignment State
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedFeeForAssign, setSelectedFeeForAssign] = useState<any>(null);
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Create Form State
    const [newFee, setNewFee] = useState({
        name: '',
        amount: '',
        frequency: 'yearly',
        description: '',
        isOptional: false
    });

    useEffect(() => {
        fetchFeeTypes();
        if (isAdmin) fetchClasses();
    }, [isAdmin]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) {
                setClasses(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch classes');
        }
    };

    const fetchFeeTypes = async () => {
        try {
            const response = await apiClient.get('/finance/structure');
            if (response.data.success) {
                setFeeTypes(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch fees', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateFee = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.post('/finance/structure', {
                ...newFee,
                amount: Number(newFee.amount)
            });
            toast.success('Fee Structure Created');
            setShowCreateModal(false);
            fetchFeeTypes();
            setNewFee({ name: '', amount: '', frequency: 'yearly', description: '', isOptional: false });
        } catch (error) {
            toast.error('Failed to create fee type');
        }
    };

    const openAssignModal = (fee: any) => {
        setSelectedFeeForAssign(fee);
        setShowAssignModal(true);
    };

    const handleAssignFee = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClassId || !dueDate) {
            toast.error('Please fill all fields');
            return;
        }

        try {
            await apiClient.post('/finance/assign-class', {
                feeTypeId: selectedFeeForAssign._id,
                classId: selectedClassId,
                dueDate
            });
            toast.success(`Fee assigned to class successfully`);
            setShowAssignModal(false);
            setSelectedClassId('');
            setDueDate('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to assign fee');
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <Layout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fee Management</h1>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage fee structures and assignments</p>
                    </div>
                    {isAdmin && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 font-medium hover:bg-primary/90 transition-colors"
                        >
                            <Plus size={20} /> Create Fee Type
                        </motion.button>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {feeTypes.map((fee) => (
                            <motion.div
                                key={fee._id}
                                variants={itemVariants}
                                layout
                                className={`p-6 rounded-2xl border transition-all group ${isDarkMode
                                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                        <DollarSign size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {fee.frequency}
                                    </span>
                                </div>

                                <h3 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{fee.name}</h3>
                                <p className={`text-2xl font-extrabold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>₹{fee.amount.toLocaleString()}</p>

                                <p className={`text-sm mb-6 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {fee.description || 'No description provided.'}
                                </p>

                                {isAdmin && (
                                    <div className={`pt-4 border-t flex justify-between items-center ${isDarkMode ? 'border-gray-700' : 'border-gray-50'}`}>
                                        <span className={`text-xs font-mono opacity-50 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{fee.code}</span>
                                        <button
                                            onClick={() => openAssignModal(fee)}
                                            className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 duration-300"
                                        >
                                            Assign to Class <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty State */}
                    {!loading && feeTypes.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                            <CreditCard size={48} className="mb-4 opacity-50" />
                            <p>No fee structures found.</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Create Modal */}
            <AnimatePresence>
                {showCreateModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Create Fee Structure</h2>
                                <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors dark:hover:bg-gray-700">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreateFee} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 opacity-80">Fee Name</label>
                                    <input
                                        value={newFee.name}
                                        onChange={e => setNewFee({ ...newFee, name: e.target.value })}
                                        className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                            }`}
                                        placeholder="e.g. Tuition Fee"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 opacity-80">Amount (₹)</label>
                                        <input
                                            type="number"
                                            value={newFee.amount}
                                            onChange={e => setNewFee({ ...newFee, amount: e.target.value })}
                                            className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                                }`}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 opacity-80">Frequency</label>
                                        <select
                                            value={newFee.frequency}
                                            onChange={e => setNewFee({ ...newFee, frequency: e.target.value })}
                                            className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <option value="yearly">Yearly</option>
                                            <option value="semester">Semester</option>
                                            <option value="monthly">Monthly</option>
                                            <option value="one-time">One Time</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 opacity-80">Description</label>
                                    <textarea
                                        value={newFee.description}
                                        onChange={e => setNewFee({ ...newFee, description: e.target.value })}
                                        className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[80px] ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                            }`}
                                        placeholder="Optional details..."
                                    />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl font-medium border transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 shadow-lg shadow-primary/25"
                                    >
                                        Create Fee
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Assign Modal */}
            <AnimatePresence>
                {showAssignModal && selectedFeeForAssign && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
                        >
                            <h2 className="text-xl font-bold mb-2">Assign Fee</h2>
                            <p className="opacity-70 text-sm mb-6">
                                Assigning <strong>{selectedFeeForAssign.name}</strong> to specific class sections.
                            </p>

                            <form onSubmit={handleAssignFee} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 opacity-80">Select Class</label>
                                    <select
                                        value={selectedClassId}
                                        onChange={e => setSelectedClassId(e.target.value)}
                                        className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                            }`}
                                        required
                                    >
                                        <option value="">-- Choose Class --</option>
                                        {classes.map((cls: any) => (
                                            <option key={cls._id} value={cls._id}>Class {cls.name} - {cls.section}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 opacity-80">Due Date</label>
                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className={`w-full p-2.5 rounded-lg border outline-none focus:ring-2 focus:ring-primary/50 transition-all ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-primary' : 'bg-white border-gray-200'
                                            }`}
                                        required
                                    />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAssignModal(false)}
                                        className={`flex-1 py-2.5 rounded-xl font-medium border transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 shadow-lg shadow-green-600/25"
                                    >
                                        Assign Now
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import {
    ChevronLeft, User, Mail, Phone, Calendar, Users,
    GraduationCap, CreditCard, AlertTriangle, Trash2, TrendingUp, FileText
} from 'lucide-react';

export const StudentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id || id === 'undefined') {
            toast.error('Invalid student ID');
            navigate('/students');
            return;
        }
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get(`/students/${id}/full-profile`);
                // Backend returns { success: true, data: { student, stats, financials } }
                const payload = response.data?.data || response.data;
                if (payload?.student) {
                    setData(payload);
                } else {
                    toast.error('Student profile data is empty');
                }
            } catch (error) {
                const msg = error.response?.data?.message || 'Failed to load student profile';
                toast.error(msg);
                console.error('Profile fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete ${data?.student?.userId?.fullName || 'this student'}? This action cannot be undone.`)) return;
        setDeleting(true);
        try {
            await apiClient.delete(`/students/${id}`);
            toast.success('Student deleted successfully');
            navigate('/students');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete student');
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                    <p className="text-sm text-gray-500">Loading student profile...</p>
                </div>
            </Layout>
        );
    }

    if (!data || !data.student) {
        return (
            <Layout>
                <div className="max-w-md mx-auto mt-20 text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={28} className="text-amber-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Student not found</h2>
                    <p className="text-gray-500 mb-6 text-sm">This student profile could not be loaded. The record may not exist.</p>
                    <button
                        onClick={() => navigate('/students')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
                    >
                        Back to Students
                    </button>
                </div>
            </Layout>
        );
    }

    const { student, stats = {}, financials = [] } = data;
    const name = student.userId?.fullName || 'Unknown Student';
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const infoItem = (label, value) => (
        <div className="flex justify-between py-2.5 border-b border-gray-50 last:border-0">
            <dt className="text-gray-500 text-sm">{label}</dt>
            <dd className="font-medium text-gray-800 text-sm text-right">{value || <span className="text-gray-300">N/A</span>}</dd>
        </div>
    );

    return (
        <Layout>
            <div className="max-w-5xl mx-auto">
                {/* Top navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/students')}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
                    >
                        <ChevronLeft size={18} />
                        Back to Students
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                            <Trash2 size={15} />
                            {deleting ? 'Deleting...' : 'Delete Student'}
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            Promote Student
                        </button>
                        <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
                        {initials}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                        <p className="text-indigo-600 font-medium text-sm mt-0.5">Roll No: {student.rollNo || 'N/A'}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <GraduationCap size={14} className="text-gray-400" />
                                {student.course || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FileText size={14} className="text-gray-400" />
                                Semester {student.semester || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users size={14} className="text-gray-400" />
                                Section {student.section || 'N/A'}
                            </span>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        student.status === 'active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                    }`}>
                        {student.status || 'active'}
                    </span>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                            <TrendingUp size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Attendance</p>
                            <p className="text-xl font-bold text-green-600">{stats.attendancePercentage || 0}%</p>
                            <p className="text-xs text-gray-400">{stats.totalAttendance || 0} days present</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                            <CreditCard size={20} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Fees Due</p>
                            <p className="text-xl font-bold text-red-600">₹{(stats.pendingFees || 0).toLocaleString('en-IN')}</p>
                            <p className="text-xs text-gray-400">Outstanding amount</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex border-b border-gray-100">
                        {['profile', 'fees'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3.5 font-medium text-sm transition-colors capitalize ${
                                    activeTab === tab
                                        ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50'
                                        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`}
                            >
                                {tab === 'profile' ? 'Profile Details' : 'Fee History'}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <User size={14} className="text-indigo-500" /> General Information
                                    </h3>
                                    <dl className="bg-gray-50 rounded-lg p-4">
                                        {infoItem('Email', student.userId?.email)}
                                        {infoItem('Phone', student.userId?.phone)}
                                        {infoItem('Date of Birth', student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString('en-IN') : null)}
                                        {infoItem('Gender', student.gender ? student.gender.charAt(0).toUpperCase() + student.gender.slice(1) : null)}
                                        {infoItem('Address', student.address?.city ? `${student.address.city}, ${student.address.state || ''}` : null)}
                                    </dl>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                        <Users size={14} className="text-indigo-500" /> Guardian Information
                                    </h3>
                                    <dl className="bg-gray-50 rounded-lg p-4">
                                        {infoItem("Father's Name", student.guardianInfo?.fatherName)}
                                        {infoItem("Mother's Name", student.guardianInfo?.motherName)}
                                        {infoItem("Guardian Phone", student.guardianInfo?.fatherPhone)}
                                        {infoItem("Relation", student.guardianInfo?.relation)}
                                    </dl>
                                </div>
                            </div>
                        )}

                        {activeTab === 'fees' && (
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-4">Fee Payment History</h3>
                                {!Array.isArray(financials) || financials.length === 0 ? (
                                    <div className="text-center py-10">
                                        <CreditCard size={32} className="text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500 text-sm">No fee history found for this student.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-gray-50 text-left">
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Fee Type</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Amount</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Due Date</th>
                                                    <th className="px-4 py-3 text-gray-500 font-medium text-xs uppercase">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {financials.map((fee) => (
                                                    <tr key={fee._id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-3">{fee.feeTypeId?.name || 'General Fee'}</td>
                                                        <td className="px-4 py-3 font-mono font-medium">₹{(fee.amount || 0).toLocaleString('en-IN')}</td>
                                                        <td className="px-4 py-3 text-gray-500">{fee.dueDate ? new Date(fee.dueDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                                fee.status === 'paid'
                                                                    ? 'bg-green-50 text-green-700'
                                                                    : fee.status === 'overdue'
                                                                    ? 'bg-red-50 text-red-700'
                                                                    : 'bg-amber-50 text-amber-700'
                                                            }`}>
                                                                {fee.status || 'pending'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

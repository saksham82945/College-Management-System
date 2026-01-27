import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { ChevronLeft, User } from 'lucide-react';
export const StudentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get(`/students/${id}/full-profile`);
                if (response.data.success) {
                    setData(response.data.data);
                }
            }
            catch (error) {
                toast.error('Failed to load student profile');
            }
            finally {
                setLoading(false);
            }
        };
        if (id)
            fetchProfile();
    }, [id]);
    if (loading)
        return <Layout><div>Loading...</div></Layout>;
    if (!data)
        return <Layout><div>Student not found</div></Layout>;
    const { student, stats, financials } = data;
    return (<Layout>
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigate('/students')} className="flex items-center text-gray-600 hover:text-gray-900">
                    <ChevronLeft size={20} className="mr-1" /> Back to Students
                </button>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Promote Student</button>
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Edit Profile</button>
                </div>
            </div>

            {/* Header Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6 flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                    <User size={40} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{student.userId?.fullName}</h1>
                    <p className="text-gray-500">Roll No: {student.rollNo}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>Class: {student.classId?.name} - {student.section}</span>
                        <span>•</span>
                        <span>Status: {student.status}</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Attendance</p>
                    <p className="text-xl font-bold text-green-600">{stats.attendancePercentage}%</p>
                    <p className="text-xs text-gray-400">{stats.totalAttendance} days present</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm">Fees Due</p>
                    <p className="text-xl font-bold text-red-600">₹{stats.pendingFees}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b">
                    <button className={`px-6 py-3 font-medium text-sm ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveTab('profile')}>
                        Profile Details
                    </button>
                    <button className={`px-6 py-3 font-medium text-sm ${activeTab === 'fees' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 hover:text-gray-900'}`} onClick={() => setActiveTab('fees')}>
                        Fee History
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'profile' && (<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center"><User size={18} className="mr-2" /> General Information</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between"><dt className="text-gray-500">Email:</dt><dd>{student.userId?.email}</dd></div>
                                <div className="flex justify-between"><dt className="text-gray-500">Phone:</dt><dd>{student.userId?.phone}</dd></div>
                                <div className="flex justify-between"><dt className="text-gray-500">Date of Birth:</dt><dd>{new Date(student.dateOfBirth).toLocaleDateString()}</dd></div>
                                <div className="flex justify-between"><dt className="text-gray-500">Gender:</dt><dd className="capitalize">{student.gender || 'N/A'}</dd></div>
                            </dl>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center"><User size={18} className="mr-2" /> Guardian Information</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between"><dt className="text-gray-500">Father:</dt><dd>{student.guardianInfo?.fatherName}</dd></div>
                                <div className="flex justify-between"><dt className="text-gray-500">Mother:</dt><dd>{student.guardianInfo?.motherName}</dd></div>
                                <div className="flex justify-between"><dt className="text-gray-500">Phone:</dt><dd>{student.guardianInfo?.fatherPhone}</dd></div>
                            </dl>
                        </div>
                    </div>)}
                    {activeTab === 'fees' && (<div>
                        <h3 className="font-bold text-gray-800 mb-4">Fee Payments</h3>
                        {financials.length === 0 ? <p className="text-gray-500">No fee history found.</p> : (<ul>
                            {financials.map((fee) => (<li key={fee._id}>...</li>))}
                        </ul>)}
                    </div>)}
                </div>
            </div>

        </div>
    </Layout>);
};

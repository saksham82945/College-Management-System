import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { Plus, Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable } from '@/components/DataTable';
import { useThemeStore } from '@/store/theme';

export const StaffPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useThemeStore();
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
            setStaff(response.data.data || []);
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
        { label: 'Employee ID', render: (member) => <span className={`font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{member.employeeId}</span> },
        { label: 'Name', render: (member) => <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{member.userId?.fullName || 'N/A'}</span> },
        { label: 'Role', render: (member) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{member.role}</span> },
        { label: 'Department', render: (member) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{member.department}</span> },
        { label: 'Phone', render: (member) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{member.contactInfo?.phone || member.userId?.phone || 'N/A'}</span> },
        { label: 'Salary', render: (member) => <span className="font-mono">₹{((member.salary?.base || 0) + (member.salary?.allowances || 0) - (member.salary?.deductions || 0)).toLocaleString('en-IN')}</span> },
        {
            label: 'Status', render: (member) => (
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {member.status}
                </span>
            )
        },
        {
            label: 'Actions', headerClassName: 'text-right', cellClassName: 'text-right space-x-2', render: (member) => (
                <>
                    <button onClick={() => navigate(`/staff/${member._id}`)} className="text-blue-600 hover:text-blue-800 font-medium">View</button>
                    <button onClick={() => handleDelete(member._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </>
            )
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            <Users className="inline mr-2" size={32} />
                            Staff Management
                        </h1>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                            Manage non-teaching staff members
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/staff/add')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Staff
                    </button>
                </div>

                {/* Search Bar */}
                <div className={`mb-6 relative ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, employee ID, or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                            : 'bg-white border-gray-200 placeholder-gray-400'
                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                </div>

                {/* Staff Table */}
                <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <DataTable
                        columns={columns}
                        data={filteredStaff}
                        loading={loading}
                        emptyTitle="No staff members found"
                        emptyDescription="Click 'Add Staff' to add your first staff member."
                        headerClassName={isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'}
                    />
                </div>
            </div>
        </Layout>
    );
};

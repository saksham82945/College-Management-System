import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { IndianRupee, Download, Filter, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/store/theme';
import { apiClient } from '@/services/api';
import { DataTable } from '@/components/DataTable';

export const PayrollPage = () => {
    const { isDarkMode } = useThemeStore();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'faculty', 'staff'

    // Fetch faculty (teachers) and staff data
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const [teachersRes, staffRes] = await Promise.all([
                    apiClient.get('/teachers'),
                    apiClient.get('/staff')
                ]);

                const teachers = (teachersRes.data.data || []).map(t => {
                    let netSalary = 0;
                    if (typeof t.salary === 'object' && t.salary !== null) {
                        const base = t.salary.base || 0;
                        const allowances = t.salary.allowances || 0;
                        const deductions = t.salary.deductions || 0;
                        netSalary = base + allowances - deductions;
                    } else if (typeof t.salary === 'number') {
                        netSalary = t.salary;
                    }

                    return {
                        id: `teacher-${t._id}`,
                        name: t.userId?.fullName || 'N/A',
                        role: 'Faculty',
                        department: t.department || 'N/A',
                        designation: t.designation || 'N/A',
                        salary: netSalary,
                        baseSalary: t.salary?.base || t.salary || 0,
                        status: 'Pending',
                        date: '-',
                        type: 'teacher'
                    };
                });

                const staff = (staffRes.data.data || []).map(s => {
                    let netSalary = 0;
                    if (typeof s.salary === 'object' && s.salary !== null) {
                        const base = s.salary.base || 0;
                        const allowances = s.salary.allowances || 0;
                        const deductions = s.salary.deductions || 0;
                        netSalary = base + allowances - deductions;
                    } else if (typeof s.salary === 'number') {
                        netSalary = s.salary;
                    }

                    return {
                        id: `staff-${s._id}`,
                        name: s.userId?.fullName || 'N/A',
                        role: s.role || 'Staff',
                        department: s.department || 'N/A',
                        designation: s.role || 'N/A',
                        salary: netSalary,
                        baseSalary: s.salary?.base || s.salary || 0,
                        status: 'Pending',
                        date: '-',
                        type: 'staff'
                    };
                });

                setEmployees([...teachers, ...staff]);
            } catch (error) {
                console.error('Error fetching employees:', error);
                toast.error('Failed to load employee data');
                setEmployees([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleProcessPayment = (id) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing Salary...',
                success: 'Salary Disbursed Successfully!',
                error: 'Failed to process.',
            }
        ).then(() => {
            setEmployees(
                employees.map((e) =>
                    e.id === id
                        ? { ...e, status: 'Paid', date: new Date().toISOString().split('T')[0] }
                        : e
                )
            );
        });
    };

    const totalSalary = employees.reduce((acc, e) => acc + (e.salary || 0), 0);
    const pendingCount = employees.filter((e) => e.status !== 'Paid').length;
    const completedCount = employees.filter((e) => e.status === 'Paid').length;

    // Filter employees based on selected filter
    const filteredEmployees = employees.filter(emp => {
        if (filter === 'all') return true;
        if (filter === 'faculty') return emp.type === 'teacher';
        if (filter === 'staff') return emp.type === 'staff';
        return true;
    });

    const columns = [
        { label: 'Employee', render: (emp) => <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{emp.name}</span> },
        { label: 'Role', render: (emp) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{emp.role}</span> },
        { label: 'Department', render: (emp) => <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{emp.department}</span> },
        { label: 'Base Salary', render: (emp) => <span className="font-mono">₹{(emp.salary || 0).toLocaleString('en-IN')}</span> },
        { label: 'Last Payment', render: (emp) => <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{emp.date}</span> },
        {
            label: 'Status', render: (emp) => (
                <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${emp.status === 'Paid'
                            ? 'bg-green-100 text-green-700'
                            : emp.status === 'Processing'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-orange-100 text-orange-700'
                        }`}
                >
                    {emp.status === 'Paid' ? <CheckCircle size={10} /> : <Clock size={10} />}
                    {emp.status}
                </span>
            )
        },
        {
            label: 'Action', headerClassName: 'text-right', cellClassName: 'text-right', render: (emp) => (
                <>
                    {emp.status !== 'Paid' && (
                        <button
                            onClick={() => handleProcessPayment(emp.id)}
                            className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-black transition-colors"
                        >
                            Process
                        </button>
                    )}
                    {emp.status === 'Paid' && (
                        <button className="text-gray-400 text-xs font-medium cursor-not-allowed">
                            Payslip
                        </button>
                    )}
                </>
            )
        }
    ];

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Payroll Management
                    </h1>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        March 2024 Cycle
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <Download size={18} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                        <IndianRupee size={18} /> Run Payroll
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                    <p className="text-blue-100 font-medium mb-1">Total Salary Output</p>
                    <h3 className="text-3xl font-bold">₹{totalSalary.toLocaleString('en-IN')}</h3>
                </div>
                <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <p className={`font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Pending Disbursals
                    </p>
                    <h3 className="text-3xl font-bold text-orange-500">{pendingCount}</h3>
                </div>
                <div className={`p-6 rounded-2xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <p className={`font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Completed
                    </p>
                    <h3 className="text-3xl font-bold text-green-600">{completedCount}</h3>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="mb-6 flex gap-3">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    All ({employees.length})
                </button>
                <button
                    onClick={() => setFilter('faculty')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'faculty'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Faculty ({employees.filter(e => e.type === 'teacher').length})
                </button>
                <button
                    onClick={() => setFilter('staff')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'staff'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : isDarkMode
                            ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                >
                    Staff ({employees.filter(e => e.type === 'staff').length})
                </button>
            </div>

            {/* Payroll Table */}
            <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Faculty & Staff List
                    </h3>
                    <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border ${isDarkMode
                        ? 'bg-gray-700 text-gray-400 border-gray-600'
                        : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                        <Filter size={14} /> Filter: All
                    </div>
                </div>
                <div className="overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        loading={loading}
                        emptyTitle="No employees found"
                        emptyDescription="We couldn't find any employees matching the current filters."
                        headerClassName={isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-500'}
                    />
                </div>
            </div>
        </Layout>
    );
};

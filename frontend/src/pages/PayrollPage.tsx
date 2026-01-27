import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { DollarSign, Download, Filter, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export const PayrollPage: React.FC = () => {
    // Mock Payroll Data
    const [employees, setEmployees] = useState([
        { id: 1, name: 'Mrs. Sharma', role: 'Teacher', salary: 45000, status: 'Paid', date: '2024-03-01' },
        { id: 2, name: 'Mr. Verma', role: 'Teacher', salary: 48000, status: 'Pending', date: '-' },
        { id: 3, name: 'John Smith', role: 'Librarian', salary: 25000, status: 'Paid', date: '2024-03-02' },
        { id: 4, name: 'Sarah Jones', role: 'Accountant', salary: 32000, status: 'Processing', date: '-' },
    ]);

    const handleProcessPayment = (id: number) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing Salary...',
                success: 'Salary Disbursed Successfully!',
                error: 'Failed to process.',
            }
        ).then(() => {
            setEmployees(employees.map(e => e.id === id ? { ...e, status: 'Paid', date: new Date().toISOString().split('T')[0] } : e));
        });
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
                    <p className="text-gray-500 text-sm">March 2024 Cycle</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download size={18} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
                        <DollarSign size={18} /> Run Payroll
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                    <p className="text-blue-100 font-medium mb-1">Total Salary Output</p>
                    <h3 className="text-3xl font-bold">₹{employees.reduce((acc, e) => acc + e.salary, 0).toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium mb-1">Pending Disbursals</p>
                    <h3 className="text-3xl font-bold text-orange-500">{employees.filter(e => e.status !== 'Paid').length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium mb-1">Completed</p>
                    <h3 className="text-3xl font-bold text-green-600">{employees.filter(e => e.status === 'Paid').length}</h3>
                </div>
            </div>

            {/* Payroll Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Employee List</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border">
                        <Filter size={14} /> Filter: All
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Base Salary</th>
                                <th className="px-6 py-4">Last Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {employees.map(employee => (
                                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">{employee.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{employee.role}</td>
                                    <td className="px-6 py-4 font-mono">₹{employee.salary.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-500">{employee.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                                            ${employee.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                employee.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {employee.status === 'Paid' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {employee.status !== 'Paid' && (
                                            <button
                                                onClick={() => handleProcessPayment(employee.id)}
                                                className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded hover:bg-black transition-colors"
                                            >
                                                Process
                                            </button>
                                        )}
                                        {employee.status === 'Paid' && (
                                            <button className="text-gray-400 text-xs font-medium cursor-not-allowed">Payslip</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

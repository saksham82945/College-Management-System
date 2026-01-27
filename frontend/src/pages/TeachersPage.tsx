import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useResource } from '@/hooks/useResource';
import { Plus, Search, Mail, Phone, BookOpen, ArrowLeft, UserPlus, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Teacher {
    _id: string;
    userId: {
        fullName: string;
        email: string;
    };
    employeeId: string;
    department: string;
    designation: string;
    status: string;
    contactInfo?: {
        phone: string;
    };
}

export const TeachersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { data: teachers, loading, remove } = useResource<Teacher>({ endpoint: '/teachers' });

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            await remove(id);
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                            title="Back to Dashboard"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
                            <p className="text-gray-500">Manage faculty members</p>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search teachers..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => navigate('/teachers/add')}
                            className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
                        >
                            <Plus size={20} className="mr-2" /> Add Teacher
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                        <p>Loading faculty data...</p>
                    </div>
                ) : filteredTeachers.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <UserPlus className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Teachers Found</h3>
                        <p className="text-gray-500 max-w-sm text-center mb-6">
                            Start by adding your first teacher to the system. You can manage their profile, classes, and performance here.
                        </p>
                        <button
                            onClick={() => navigate('/teachers/add')}
                            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium"
                        >
                            Add New Teacher
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (
                            <div key={teacher._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-bold text-xl ring-2 ring-white shadow-sm">
                                            {teacher.userId.fullName?.charAt(0) || '?'}
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${teacher.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {teacher.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-primary transition-colors">
                                        {teacher.userId.fullName}
                                    </h3>
                                    <p className="text-primary font-medium text-sm mb-4">{teacher.designation}</p>

                                    <div className="space-y-2.5 text-sm text-gray-600">
                                        <div className="flex items-center gap-2.5">
                                            <BookOpen size={16} className="text-gray-400" />
                                            <span className="truncate">{teacher.department}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Mail size={16} className="text-gray-400" />
                                            <span className="truncate">{teacher.userId.email}</span>
                                        </div>
                                        {teacher.contactInfo?.phone && (
                                            <div className="flex items-center gap-2.5">
                                                <Phone size={16} className="text-gray-400" />
                                                <span>{teacher.contactInfo.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-mono bg-white px-2 py-1 rounded border">ID: {teacher.employeeId}</span>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigate(`/teachers/edit/${teacher._id}`)}
                                            className="text-gray-600 hover:text-primary font-semibold transition-colors flex items-center gap-1"
                                        >
                                            <Edit2 size={14} /> Edit
                                        </button>
                                        <div className="w-px h-4 bg-gray-300"></div>
                                        <button
                                            onClick={() => handleDelete(teacher._id)}
                                            className="text-red-500 hover:text-red-700 font-semibold transition-colors flex items-center gap-1"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};


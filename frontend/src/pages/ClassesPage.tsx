import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Plus, Search, Users, Calendar, BookOpen, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/store/theme';

interface ClassType {
    _id: string;
    name: string;
    section: string;
    academicYear: string;
    classTeacher?: {
        firstName: string;
        lastName: string;
        email: string;
    };
    studentCount: number;
}

interface Teacher {
    _id: string;
    userId: {
        _id: string;
        firstName: string;
        lastName: string;
    };
}

export const ClassesPage: React.FC = () => {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { isDarkMode } = useThemeStore();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        section: '',
        academicYear: new Date().getFullYear().toString(),
        classTeacher: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchClasses();
        fetchTeachers();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) {
                setClasses(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch classes', error);
            toast.error('Failed to load classes');
        } finally {
            setLoading(false);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await apiClient.get('/teachers');
            if (response.data.success) {
                setTeachers(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch teachers', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiClient.post('/classes', formData);
            toast.success('Class created successfully');
            setShowModal(false);
            fetchClasses();
            setFormData({
                name: '',
                section: '',
                academicYear: new Date().getFullYear().toString(),
                classTeacher: ''
            });
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to create class');
        }
    };

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.section.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const inputClasses = `w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 transition-all ${isDarkMode
        ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500/50'
        : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20'
        }`;

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Class Management</h1>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Manage academic classes and sections</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search classes..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${isDarkMode
                                ? 'bg-gray-900 border-gray-700 text-white focus:ring-purple-500/20'
                                : 'bg-white border-gray-200 text-gray-900 focus:ring-primary/20'
                                }`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                        <Plus size={20} className="mr-2" /> New Class
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filteredClasses.length === 0 ? (
                <div className={`text-center py-20 rounded-2xl border border-dashed ${isDarkMode ? 'bg-gray-900/50 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                    <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                            <BookOpen size={32} className="text-purple-500" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">No Classes Found</h3>
                    <p className="mb-6">Get started by creating your first class</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Create Class
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredClasses.map((cls) => (
                        <div key={cls._id} className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                            }`}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center text-purple-600 font-bold text-xl border border-purple-500/20">
                                            {cls.name}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                Class {cls.name}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                Section {cls.section}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className={`p-1.5 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-50 text-gray-500'
                                            }`}>
                                            <Edit size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Users size={16} className="mr-3 opacity-70" />
                                        {cls.studentCount} Students Enrolled
                                    </div>
                                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <Calendar size={16} className="mr-3 opacity-70" />
                                        Academic Year {cls.academicYear}
                                    </div>
                                    <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold mr-3">T</div>
                                        {cls.classTeacher
                                            ? `${cls.classTeacher.firstName} ${cls.classTeacher.lastName}`
                                            : 'No Class Teacher Assigned'}
                                    </div>
                                </div>
                            </div>
                            <div className={`px-6 py-3 border-t flex justify-between items-center ${isDarkMode ? 'bg-gray-800/50 border-gray-800' : 'bg-gray-50 border-gray-100'
                                }`}>
                                < button
                                    className="text-purple-500 text-sm font-medium hover:underline"
                                    onClick={() => navigate(`/classes/${cls._id}`)}
                                >
                                    View Details
                                </button>
                                <button className="text-sm font-medium text-gray-500 hover:text-purple-500 transition-colors">
                                    Attendance
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Class Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'
                        }`}>
                        <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Create New Class
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Class Name
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="e.g. 10"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Section
                                    </label>
                                    <input
                                        type="text"
                                        className={inputClasses}
                                        placeholder="e.g. A"
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Academic Year
                                </label>
                                <input
                                    type="text"
                                    className={inputClasses}
                                    value={formData.academicYear}
                                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Class Teacher
                                </label>
                                <select
                                    className={inputClasses}
                                    value={formData.classTeacher}
                                    onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
                                >
                                    <option value="">Select Teacher</option>
                                    {teachers.map(teacher => (
                                        <option key={teacher._id} value={teacher.userId._id || teacher._id}>
                                            {teacher.userId.firstName} {teacher.userId.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Create Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

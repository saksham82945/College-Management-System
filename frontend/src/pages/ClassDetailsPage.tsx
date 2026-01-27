import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import toast from 'react-hot-toast';
import { ChevronLeft, Users, Calendar, BookOpen, Clock, Mail } from 'lucide-react';
import { useThemeStore } from '@/store/theme';

export const ClassDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useThemeStore();
    const [classData, setClassData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('students');

    // State for students
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await apiClient.get(`/classes/${id}`);
                if (response.data.success) {
                    setClassData(response.data.data);
                }

                // Fetch students
                const studentsRes = await apiClient.get('/students'); // In real app, use filtering `?classId=${id}`
                if (studentsRes.data.success) {
                    // Client side filter for demo if backend filter not ready
                    const classStudents = studentsRes.data.data.filter((s: any) => s.classId?._id === id || s.classId === id);
                    setStudents(classStudents);
                }
            } catch (error) {
                toast.error('Failed to load class details');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchClassDetails();
    }, [id]);

    if (loading) return <Layout><div className="p-8 text-center">Loading...</div></Layout>;
    if (!classData) return <Layout><div className="p-8 text-center">Class not found</div></Layout>;

    const tabs = [
        { id: 'students', label: 'Students' },
        { id: 'schedule', label: 'Timetable' },
        { id: 'attendance', label: 'Attendance' },
    ];

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate('/classes')}
                        className={`flex items-center ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        <ChevronLeft size={20} className="mr-1" /> Back to Classes
                    </button>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
                            Edit Class
                        </button>
                    </div>
                </div>

                {/* Header Info */}
                <div className={`rounded-2xl p-8 mb-8 shadow-lg ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700'
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
                    }`}>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    Class {classData.name}
                                </h1>
                                <span className="px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold border border-purple-500/20">
                                    Section {classData.section}
                                </span>
                            </div>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                                Academic Year {classData.academicYear}
                            </p>
                        </div>

                        <div className={`flex items-center gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                {classData.classTeacher?.firstName?.[0] || 'T'}
                            </div>
                            <div>
                                <p className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    Class Teacher
                                </p>
                                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {classData.classTeacher
                                        ? `${classData.classTeacher.firstName} ${classData.classTeacher.lastName}`
                                        : 'Not Assigned'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
                            <div className="flex items-center gap-2 mb-1 text-purple-500">
                                <Users size={18} />
                                <span className="font-semibold">{classData.studentCount || 0}</span>
                            </div>
                            <p className="text-xs text-gray-500">Total Students</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white shadow-sm border border-gray-100'}`}>
                            <div className="flex items-center gap-2 mb-1 text-blue-500">
                                <BookOpen size={18} />
                                <span className="font-semibold">{classData.subjects?.length || 0}</span>
                            </div>
                            <p className="text-xs text-gray-500">Subjects</p>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab.id
                                    ? 'text-purple-600'
                                    : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-t-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'students' && (
                    <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        {/* Student List Table placeholder */}
                        <div className="p-8 text-center text-gray-500">
                            {students.length > 0 ? (
                                <div>Student list will appear here</div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Users size={48} className="text-gray-300 mb-4" />
                                    <p>No students enrolled in this class yet.</p>
                                    <button className="mt-4 text-purple-600 font-medium hover:underline">
                                        Enroll Students
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                    <div className={`rounded-xl shadow-sm border p-8 text-center ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                        }`}>
                        <div className="flex flex-col items-center">
                            <Calendar size={48} className="text-gray-300 mb-4" />
                            <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Class Timetable</h3>
                            <p className="text-gray-500 mb-6">Schedule management coming soon.</p>
                            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                Configure Schedule
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

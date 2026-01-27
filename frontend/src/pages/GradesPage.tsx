import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Save, Search, Award, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';

export const GradesPage: React.FC = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useThemeStore();
    const [loading, setLoading] = useState(false);

    // Selection States
    const [classes, setClasses] = useState<any[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [exams, setExams] = useState<any[]>(['Midterm', 'Final', 'Unit Test 1']); // Mock for now
    const [selectedExam, setSelectedExam] = useState('');
    const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Physics', 'English']); // Mock
    const [selectedSubject, setSelectedSubject] = useState('');

    // Data States
    const [students, setStudents] = useState<any[]>([]);
    const [grades, setGrades] = useState<Record<string, number>>({});

    useEffect(() => {
        if (user?.roles?.includes('TEACHER') || user?.roles?.includes('ADMIN')) {
            fetchClasses();
        }
    }, [user]);

    useEffect(() => {
        if (selectedClass) {
            fetchStudents(selectedClass);
        }
    }, [selectedClass]);

    const fetchClasses = async () => {
        try {
            const response = await apiClient.get('/classes');
            if (response.data.success) {
                setClasses(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch classes', error);
        }
    };

    const fetchStudents = async (classId: string) => {
        setLoading(true);
        try {
            // Fetch students for class
            const response = await apiClient.get('/students'); // Should be filtered by classId
            if (response.data.success) {
                setStudents(response.data.data);
                // Reset grades
                setGrades({});
            }
        } catch (error) {
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleGradeChange = (studentId: string, value: string) => {
        const numValue = parseFloat(value);
        if (numValue >= 0 && numValue <= 100) {
            setGrades(prev => ({ ...prev, [studentId]: numValue }));
        }
    };

    const handleSubmit = async () => {
        if (!selectedClass || !selectedExam || !selectedSubject) {
            toast.error('Please select all fields');
            return;
        }

        // Mock submission
        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1000)),
            {
                loading: 'Saving grades...',
                success: 'Grades published successfully!',
                error: 'Failed to save grades'
            }
        );
    };

    const inputClasses = `rounded-lg border px-3 py-2 focus:ring-2 transition-all ${isDarkMode
        ? 'bg-gray-800 border-gray-700 text-white focus:ring-purple-500/50'
        : 'bg-white border-gray-200 text-gray-900 focus:ring-purple-500/20'
        }`;

    // Student View
    if (user?.roles?.includes('STUDENT')) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto">
                    <h1 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>My Grades</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg"><TrendingUp size={20} /></div>
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>CGPA</span>
                            </div>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>8.5</p>
                        </div>
                        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Award size={20} /></div>
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rank</span>
                            </div>
                            <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>5th</p>
                        </div>
                    </div>

                    <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Results</h3>
                        </div>
                        <div className="p-6 text-center text-gray-500">
                            No recent grades published.
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Teacher/Admin View
    return (
        <Layout>
            <div className={`flex flex-col md:flex-row justify-between items-center mb-6 gap-4`}>
                <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Grade Management</h1>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Enter and publish student marks</p>
                </div>

                <div className="flex gap-2 items-center flex-wrap">
                    <select
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>Class {cls.name}-{cls.section}</option>
                        ))}
                    </select>
                    <select
                        value={selectedExam}
                        onChange={e => setSelectedExam(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Select Exam</option>
                        {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                    </select>
                    <select
                        value={selectedSubject}
                        onChange={e => setSelectedSubject(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Select Subject</option>
                        {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                </div>
            </div>

            {!selectedClass ? (
                <div className={`text-center py-20 rounded-2xl border border-dashed ${isDarkMode ? 'bg-gray-900/50 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                    <Award size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold">Select Criteria</h3>
                    <p>Choose class, exam, and subject to enter grades</p>
                </div>
            ) : (
                <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                    }`}>
                    <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Student List ({students.length})
                        </h3>
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                        >
                            <Save size={16} /> Publish Grades
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className={isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Student</th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Roll No</th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Marks (Out of 100)</th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Grade</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                                {students.map(student => (
                                    <tr key={student._id} className={isDarkMode ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {student.userId.firstName} {student.userId.lastName}
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {student.rollNo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={grades[student._id] || ''}
                                                onChange={(e) => handleGradeChange(student._id, e.target.value)}
                                                className={`w-24 px-3 py-1 rounded border focus:outline-none focus:ring-2 ${isDarkMode
                                                    ? 'bg-gray-800 border-gray-600 text-white focus:ring-purple-500'
                                                    : 'bg-white border-gray-300 focus:ring-purple-200'
                                                    }`}
                                                placeholder="0-100"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${!grades[student._id] ? 'bg-gray-100 text-gray-400' :
                                                grades[student._id] >= 90 ? 'bg-green-100 text-green-700' :
                                                    grades[student._id] >= 75 ? 'bg-blue-100 text-blue-700' :
                                                        grades[student._id] >= 60 ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                }`}>
                                                {grades[student._id] ?
                                                    (grades[student._id] >= 90 ? 'A+' :
                                                        grades[student._id] >= 75 ? 'A' :
                                                            grades[student._id] >= 60 ? 'B' : 'C')
                                                    : '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    );
};

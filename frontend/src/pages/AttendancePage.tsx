import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { apiClient } from '@/services/api';
import { Calendar, CheckCircle, XCircle, Save, Search, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/store/theme';

interface Student {
    _id: string;
    userId: {
        firstName: string;
        lastName: string;
    };
    admissionNumber: string;
    classId?: string; // Assuming student has classId
}

interface ClassType {
    _id: string;
    name: string;
    section: string;
}

export const AttendancePage: React.FC = () => {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});
    const [loading, setLoading] = useState(false);
    const { isDarkMode } = useThemeStore();

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            fetchStudents(selectedClass);
        } else {
            setStudents([]);
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
            // In a real app, query by classId. For now fetching all and filtering if backend doesn't support filter
            const response = await apiClient.get('/students');
            if (response.data.success) {
                // Filter client side if needed or backend handles it
                // assuming backend returns all for now, we filter if possible
                // Implementation depends on backend student controller
                setStudents(response.data.data);

                // Initialize attendance as present for all
                const initialAttendance: any = {};
                response.data.data.forEach((s: Student) => {
                    initialAttendance[s._id] = 'present';
                });
                setAttendance(initialAttendance);
            }
        } catch (error) {
            console.error('Failed to fetch students', error);
            toast.error('Failed to load students');
        } finally {
            setLoading(false);
        }
    };

    const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSubmit = async () => {
        if (!selectedClass) {
            toast.error('Please select a class');
            return;
        }

        const attendanceEntries = students.map(student => ({
            studentId: student._id,
            status: attendance[student._id] || 'present'
        }));

        try {
            await apiClient.post('/attendance', {
                classId: selectedClass,
                date,
                attendanceEntries
            });
            toast.success('Attendance marked successfully');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to mark attendance');
        }
    };

    return (
        <Layout>
            <div className={`flex flex-col md:flex-row justify-between items-center mb-6 gap-4`}>
                <div>
                    <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Attendance</h1>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Mark and view daily attendance</p>
                </div>

                <div className="flex gap-4 items-center">
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
                            }`}
                    />
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className={`px-4 py-2 rounded-lg border min-w-[200px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
                            }`}
                    >
                        <option value="">Select Class</option>
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>
                                Class {cls.name} - {cls.section}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!selectedClass ? (
                <div className={`text-center py-20 rounded-2xl border border-dashed ${isDarkMode ? 'bg-gray-900/50 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                    <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold">Select a Class</h3>
                    <p>Choose a class and date to start marking attendance</p>
                </div>
            ) : (
                <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                    }`}>
                    <div className={`p-4 border-b flex justify-between items-center ${isDarkMode ? 'border-gray-800' : 'border-gray-100'
                        }`}>
                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            Student List ({students.length})
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const newAttendance = { ...attendance };
                                    students.forEach(s => newAttendance[s._id] = 'present');
                                    setAttendance(newAttendance);
                                }}
                                className="text-xs px-3 py-1 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20"
                            >
                                Mark All Present
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium"
                            >
                                <Save size={16} /> Save Attendance
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className={isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                                <tr>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Student</th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Roll No</th>
                                    <th className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${isDarkMode ? 'divide-gray-800' : 'divide-gray-100'}`}>
                                {students.map((student) => (
                                    <tr key={student._id} className={isDarkMode ? 'hover:bg-gray-800/30' : 'hover:bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 font-bold text-xs ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {student.userId.firstName[0]}{student.userId.lastName[0]}
                                                </div>
                                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                                    {student.userId.firstName} {student.userId.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {student.admissionNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleAttendanceChange(student._id, 'present')}
                                                    className={`p-2 rounded-lg transition-all ${attendance[student._id] === 'present'
                                                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                                            : isDarkMode ? 'bg-gray-800 text-gray-500 hover:text-green-500' : 'bg-gray-100 text-gray-400 hover:text-green-600'
                                                        }`}
                                                    title="Present"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleAttendanceChange(student._id, 'absent')}
                                                    className={`p-2 rounded-lg transition-all ${attendance[student._id] === 'absent'
                                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                            : isDarkMode ? 'bg-gray-800 text-gray-500 hover:text-red-500' : 'bg-gray-100 text-gray-400 hover:text-red-600'
                                                        }`}
                                                    title="Absent"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
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

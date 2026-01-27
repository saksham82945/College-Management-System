import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Calendar, Clock, BookOpen, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';

export const ExamsPage = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useThemeStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [exams, setExams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '', date: '', time: '', course: 'BCA'
    });

    const fetchExams = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/exams');
            if (response.data && response.data.success) {
                setExams(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch exams:', error);
            toast.error('Failed to load exams');
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchExams();
    }, []);

    const canCreateExam = user?.roles?.includes('ADMIN') || user?.roles?.includes('TEACHER');

    const handleCreateExam = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/exams', formData);
            if (response.data && response.data.success) {
                toast.success('Exam scheduled successfully');
                setIsCreateModalOpen(false);
                fetchExams(); // Refresh list
                setFormData({ title: '', date: '', time: '', course: 'BCA' }); // Reset form
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to schedule exam');
        }
    };

    const cardClass = `p-6 rounded-xl border transition-all ${isDarkMode
        ? 'bg-gray-800 border-gray-700 hover:border-purple-500/50'
        : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
        }`;

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Examination Schedule</h1>
                        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Upcoming exams and tests</p>
                    </div>
                    {canCreateExam && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Schedule Exam
                        </button>
                    )}
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
                    <button className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-purple-100 text-purple-700 border border-purple-200'}`}>All Exams</button>
                    <button className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Upcoming</button>
                    <button className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${isDarkMode ? 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Completed</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Loading exams...
                        </div>
                    ) : exams.length === 0 ? (
                        <div className={`col-span-full text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            No exams currently scheduled.
                        </div>
                    ) : exams.map((exam) => (
                        <div key={exam.id} className={cardClass}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                                    <BookOpen size={24} />
                                </div>
                                <span className={`text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {exam.type || 'Written'}
                                </span>
                            </div>

                            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{exam.title}</h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={16} />
                                    <span>{new Date(exam.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={16} />
                                    <span>{exam.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-purple-500 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    <span>{exam.course || exam.class}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white'}`}>
                            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule New Exam</h2>
                            <form onSubmit={handleCreateExam} className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Exam Title</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`}
                                        placeholder="e.g., Midterm Database Management"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                                        <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`} />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</label>
                                        <input required type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`} />
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Course</label>
                                    <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`}>
                                        <option value="BCA">BCA</option>
                                        <option value="BBA">BBA</option>
                                        <option value="MBA">MBA</option>
                                        <option value="MBA (HR)">MBA (HR)</option>
                                        <option value="MBA (Finance)">MBA (Finance)</option>
                                        <option value="MCA">MCA</option>
                                        <option value="BSc IT">BSc IT</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className={`px-4 py-2 rounded text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700">
                                        Schedule
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

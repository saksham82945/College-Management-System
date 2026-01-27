import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { useThemeStore } from '@/store/theme';
import { Calendar, Clock, BookOpen, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const ExamsPage: React.FC = () => {
    const { user } = useAuthStore();
    const { isDarkMode } = useThemeStore();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Mock Data
    const [exams, setExams] = useState([
        { id: 1, title: 'Midterm Physics', date: '2025-03-15', time: '10:00 AM', subject: 'Physics', class: 'Class 12-A', type: 'Written' },
        { id: 2, title: 'Final Mathematics', date: '2025-04-10', time: '09:00 AM', subject: 'Mathematics', class: 'Class 10-B', type: 'Written' },
        { id: 3, title: 'English Oral Test', date: '2025-03-20', time: '11:00 AM', subject: 'English', class: 'Class 9-A', type: 'Oral' },
    ]);

    const canCreateExam = user?.roles?.includes('ADMIN') || user?.roles?.includes('TEACHER');

    const handleCreateExam = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Exam scheduled successfully');
        setIsCreateModalOpen(false);
        // Add logic to save to backend
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
                    {exams.map(exam => (
                        <div key={exam.id} className={cardClass}>
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                                    <BookOpen size={24} />
                                </div>
                                <span className={`text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {exam.type}
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
                                    <span>{exam.class}</span>
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
                                    <input required type="text" className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`} placeholder="e.g., Midterm Physics" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                                        <input required type="date" className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`} />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</label>
                                        <input required type="time" className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`} />
                                    </div>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Class</label>
                                    <select className={`w-full p-2 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'}`}>
                                        <option>Class 10-A</option>
                                        <option>Class 12-B</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setIsCreateModalOpen(false)} className={`px-4 py-2 rounded text-sm font-medium ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}>Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700">Schedule</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

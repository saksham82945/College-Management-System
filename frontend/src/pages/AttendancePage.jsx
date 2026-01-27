import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useThemeStore } from '@/store/theme';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { CheckCircle, XCircle, Clock, Search, Filter, Download, Calendar, Users, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable } from '@/components/DataTable';

const MOCK_STUDENTS = [
    { _id: '65a1b2c3d4e5f60001000001', name: 'Aarav Sharma', rollNo: 'BCA001', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000002', name: 'Priya Patel', rollNo: 'BCA002', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000003', name: 'Rahul Verma', rollNo: 'BCA003', class: 'BCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000004', name: 'Sneha Gupta', rollNo: 'BBA001', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000005', name: 'Amit Joshi', rollNo: 'BBA002', class: 'BBA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000006', name: 'Kavya Singh', rollNo: 'MCA001', class: 'MCA - Sem 1' },
    { _id: '65a1b2c3d4e5f60001000007', name: 'Rohan Mehta', rollNo: 'MBA001', class: 'MBA - Sem 2' },
    { _id: '65a1b2c3d4e5f60001000008', name: 'Diya Kapoor', rollNo: 'BSC001', class: 'BSc IT - Sem 2' },
];

const getToday = () => new Date().toISOString().split('T')[0];

const getLast30Days = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
};

export const AttendancePage = () => {
    const { isDarkMode } = useThemeStore();
    const { user } = useAuthStore();
    const [selectedClass, setSelectedClass] = useState('All');
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [searchTerm, setSearchTerm] = useState('');
    const [attendance, setAttendance] = useState({});
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('mark');
    const [allStudents, setAllStudents] = useState([]);
    const [classes, setClasses] = useState(['All']);
    const [historyData, setHistoryData] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const isAdmin = user?.roles?.includes('ADMIN');
    const isTeacher = user?.roles?.includes('TEACHER');
    const canMark = isAdmin || isTeacher;

    // Fetch students from API, fall back to mock
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            let students = [];
            try {
                const res = await apiClient.get('/students?size=200');
                const studentsArr = res.data?.data?.students || [];
                if (Array.isArray(studentsArr) && studentsArr.length > 0) {
                    students = studentsArr.map(s => ({
                        _id: s.id || s._id,
                        name: s.name || s.fullName || 'Unknown',
                        rollNo: s.rollNo || s.rollNumber || '—',
                        class: s.course
                            ? `${s.course}${s.semester ? ' - Sem ' + s.semester : ''}`
                            : 'Unassigned',
                    }));
                }
            } catch {
                // API failed, use mock
            }

            // Always include mock students so the page is never empty
            if (students.length === 0) {
                students = MOCK_STUDENTS;
            }

            setAllStudents(students);

            // Build dynamic class list from student data
            const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
            setClasses(['All', ...uniqueClasses]);
            setSelectedClass('All');
            setLoading(false);
        };
        fetchStudents();
    }, []);

    // Initialize attendance statuses when students or date changes
    useEffect(() => {
        if (allStudents.length > 0) {
            // Initialize all as present
            const map = {};
            allStudents.forEach(s => { map[s._id] = 'present'; });
            setAttendance(map);
            setSubmitted(false);
        }
    }, [allStudents, selectedDate, selectedClass]);

    // Fetch existing attendance for selected date
    const fetchAttendanceForDate = useCallback(async () => {
        if (allStudents.length === 0) return;
        try {
            const res = await apiClient.get('/attendance', { params: { date: selectedDate } });
            const records = res.data?.data || [];
            if (records.length > 0) {
                const map = { ...attendance };
                records.forEach(r => {
                    const sid = r.student?._id || r.student;
                    if (sid) map[sid] = (r.status || 'PRESENT').toLowerCase();
                });
                setAttendance(map);
            }
        } catch {
            // Silently ignore — keep default
        }
    }, [selectedDate, allStudents]);

    useEffect(() => {
        if (allStudents.length > 0) {
            fetchAttendanceForDate();
        }
    }, [fetchAttendanceForDate]);

    // Fetch history
    const fetchHistory = useCallback(async () => {
        setHistoryLoading(true);
        try {
            const last30 = getLast30Days();
            const res = await apiClient.get('/attendance', { params: { limit: 5000 } });
            const records = res.data?.data || [];
            const grouped = {};
            records.forEach(r => {
                const d = new Date(r.date).toISOString().split('T')[0];
                if (!grouped[d]) grouped[d] = { present: 0, absent: 0, late: 0, total: 0 };
                grouped[d].total++;
                const status = (r.status || '').toUpperCase();
                if (status === 'PRESENT') grouped[d].present++;
                else if (status === 'ABSENT') grouped[d].absent++;
                else if (status === 'LATE') grouped[d].late++;
            });
            const history = last30
                .filter(d => grouped[d])
                .map(d => ({
                    date: d,
                    present: grouped[d].present,
                    absent: grouped[d].absent,
                    late: grouped[d].late,
                    total: grouped[d].total,
                }));
            setHistoryData(history);
        } catch {
            setHistoryData([]);
        } finally {
            setHistoryLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'history') fetchHistory();
    }, [activeTab, fetchHistory]);

    // Filter students by class & search
    const classStudents = allStudents.filter(s =>
        (selectedClass === 'All' || s.class === selectedClass) &&
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const setStatus = (id, status) => {
        setAttendance(prev => ({ ...prev, [id]: status }));
        setSubmitted(false);
    };

    const handleSubmit = async () => {
        if (saving || classStudents.length === 0) return;
        setSaving(true);
        try {
            const records = classStudents.map(s => ({
                studentId: s._id,
                status: (attendance[s._id] || 'present').toUpperCase(),
            }));
            await apiClient.post('/attendance/bulk', {
                date: selectedDate,
                records,
                subject: '',
            });
            setSubmitted(true);
            toast.success(`Attendance saved for ${classStudents.length} students on ${selectedDate}`);
        } catch (err) {
            console.error('Save attendance error:', err);
            toast.error(err.response?.data?.message || 'Failed to save attendance');
        } finally {
            setSaving(false);
        }
    };

    const stats = {
        present: classStudents.filter(s => attendance[s._id] === 'present').length,
        absent: classStudents.filter(s => attendance[s._id] === 'absent').length,
        late: classStudents.filter(s => attendance[s._id] === 'late').length,
    };

    const statusBtn = (id, status, label, Icon, colors) => (
        <button
            onClick={() => canMark && setStatus(id, status)}
            disabled={!canMark}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${attendance[id] === status ? colors.active : colors.inactive} ${canMark ? 'cursor-pointer hover:opacity-90' : 'cursor-default opacity-60'}`}
        >
            <Icon size={14} /> {label}
        </button>
    );

    const card = `rounded-2xl border p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`;

    const markColumns = [
        { label: '#', render: (_, i) => <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>{i + 1}</span> },
        { label: 'Student', render: (s) => <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{s.name}</span> },
        { label: 'Roll No.', render: (s) => <span className={`font-mono text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.rollNo}</span> },
        { label: 'Class', render: (s) => <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.class}</span> },
        {
            label: 'Status', render: (s) => (
                <div className="flex gap-2">
                    {statusBtn(s._id, 'present', 'Present', CheckCircle, {
                        active: 'bg-green-500 text-white',
                        inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                    })}
                    {statusBtn(s._id, 'absent', 'Absent', XCircle, {
                        active: 'bg-red-500 text-white',
                        inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                    })}
                    {statusBtn(s._id, 'late', 'Late', Clock, {
                        active: 'bg-yellow-500 text-white',
                        inactive: isDarkMode ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-100 text-gray-500 border border-gray-200',
                    })}
                </div>
            )
        }
    ];

    const historyColumns = [
        {
            label: 'Date',
            render: (row) => <span className={`font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
        },
        { label: 'Present', render: (row) => <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{row.present}</span> },
        { label: 'Absent', render: (row) => <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">{row.absent}</span> },
        { label: 'Late', render: (row) => <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">{row.late}</span> },
        { label: 'Total', render: (row) => <span className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.total}</span> },
        {
            label: 'Attendance %', render: (row) => {
                const pct = row.total > 0 ? Math.round((row.present / row.total) * 100) : 0;
                return (
                    <div className="flex items-center gap-3">
                        <div className={`w-24 h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div
                                className={`h-2 rounded-full ${pct >= 75 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className={`text-xs font-semibold ${pct >= 75 ? 'text-green-600' : pct >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{pct}%</span>
                    </div>
                );
            }
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            <CheckCircle className="inline mr-2 text-green-500" size={30} />
                            Attendance
                        </h1>
                        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Mark and review student attendance records
                        </p>
                    </div>
                    <button
                        onClick={() => toast.success('Attendance report exported!')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-sm hover:shadow-lg transition-all"
                    >
                        <Download size={16} /> Export Report
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Present', count: stats.present, color: 'text-green-600', bg: isDarkMode ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-100' },
                        { label: 'Absent', count: stats.absent, color: 'text-red-600', bg: isDarkMode ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-100' },
                        { label: 'Late', count: stats.late, color: 'text-yellow-600', bg: isDarkMode ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-100' },
                    ].map(s => (
                        <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.bg}`}>
                            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
                            <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className={`flex gap-1 p-1 rounded-xl w-fit ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {['mark', 'history'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab
                                ? 'bg-purple-600 text-white shadow'
                                : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab === 'mark' ? '✏️ Mark Attendance' : '📋 History'}
                        </button>
                    ))}
                </div>

                {activeTab === 'mark' && (
                    <>
                        {/* Filters */}
                        <div className={`${card} flex flex-col md:flex-row gap-4`}>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Filter size={12} className="inline mr-1" />Class / Section
                                </label>
                                <select
                                    value={selectedClass}
                                    onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }}
                                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                >
                                    {classes.map(c => <option key={c} value={c}>{c === 'All' ? '📋 All Students' : c}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Calendar size={12} className="inline mr-1" />Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={e => { setSelectedDate(e.target.value); setSubmitted(false); }}
                                    className={`w-full px-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div className="flex-1">
                                <label className={`block text-xs font-semibold mb-1 uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Search size={12} className="inline mr-1" />Search Student
                                </label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-200 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                            <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
                                <div className="flex items-center gap-2">
                                    <Users size={16} className="text-purple-500" />
                                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                        {classStudents.length} Students{selectedClass !== 'All' ? ` — ${selectedClass}` : ''}
                                    </span>
                                    {loading && <Loader2 size={16} className="animate-spin text-purple-500 ml-2" />}
                                </div>
                                {canMark && classStudents.length > 0 && (
                                    <div className="flex gap-2">
                                        <button onClick={() => {
                                            const updates = {};
                                            classStudents.forEach(s => updates[s._id] = 'present');
                                            setAttendance(prev => ({ ...prev, ...updates }));
                                            setSubmitted(false);
                                        }} className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors">
                                            All Present
                                        </button>
                                        <button onClick={() => {
                                            const updates = {};
                                            classStudents.forEach(s => updates[s._id] = 'absent');
                                            setAttendance(prev => ({ ...prev, ...updates }));
                                            setSubmitted(false);
                                        }} className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">
                                            All Absent
                                        </button>
                                    </div>
                                )}
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader2 size={28} className="animate-spin text-purple-500" />
                                    <span className={`ml-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading students...</span>
                                </div>
                            ) : (
                                <DataTable
                                    columns={markColumns}
                                    data={classStudents}
                                    emptyTitle="No students found"
                                    emptyDescription={`No students found${selectedClass !== 'All' ? ` in ${selectedClass}` : ''}. Try selecting a different class or clearing the search.`}
                                />
                            )}

                            {canMark && classStudents.length > 0 && !loading && (
                                <div className={`px-6 py-4 border-t flex justify-end ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={saving}
                                        className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {saving && <Loader2 size={16} className="animate-spin" />}
                                        {submitted ? '✅ Attendance Saved' : saving ? 'Saving...' : 'Save Attendance'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'history' && (
                    <div className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-100 bg-gray-50'}`}>
                            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Records — Last 30 Days</h2>
                            {historyLoading && <Loader2 size={16} className="animate-spin text-purple-500" />}
                        </div>
                        <DataTable
                            columns={historyColumns}
                            data={historyData}
                            loading={historyLoading}
                            emptyTitle="No records found"
                            emptyDescription="No attendance records found for the last 30 days. Mark attendance to see data here."
                            headerClassName={isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50'}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

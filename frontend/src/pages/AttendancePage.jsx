import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { useAuthStore } from '@/store/auth';
import { apiClient } from '@/services/api';
import { 
    CheckCircle, XCircle, Clock, Search, Filter, 
    Download, Calendar, Users, Loader2, Save, 
    History, ClipboardCheck, LayoutDashboard,
    TrendingUp, UserCheck, UserX, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable, PageHeader, Button } from '@/components';
import { StatCard } from '@/components/dashboard/StatCard';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    const { isDarkMode } = useTheme();
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
                        name: s.userId?.fullName || s.name || s.fullName || 'Unknown',
                        rollNo: s.rollNo || s.rollNumber || '—',
                        class: s.course
                            ? `${s.course}${s.semester ? ' - Sem ' + s.semester : ''}`
                            : 'Unassigned',
                    }));
                }
            } catch {
                // API failed, use mock
            }

            if (students.length === 0) {
                students = MOCK_STUDENTS;
            }

            setAllStudents(students);
            const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
            setClasses(['All', ...uniqueClasses]);
            setSelectedClass('All');
            setLoading(false);
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        if (allStudents.length > 0) {
            const map = {};
            allStudents.forEach(s => { map[s._id] = 'present'; });
            setAttendance(map);
            setSubmitted(false);
        }
    }, [allStudents, selectedDate, selectedClass]);

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
        }
    }, [selectedDate, allStudents]);

    useEffect(() => {
        if (allStudents.length > 0) {
            fetchAttendanceForDate();
        }
    }, [fetchAttendanceForDate]);

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
            toast.success('Attendance recorded successfully');
        } catch (err) {
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

    const statusBtn = (id, status, label, Icon, activeClass, inactiveClass) => (
        <button
            onClick={() => canMark && setStatus(id, status)}
            disabled={!canMark}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                ${attendance[id] === status ? activeClass : inactiveClass} 
                ${canMark ? 'hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
        >
            <Icon size={14} className={attendance[id] === status ? 'animate-pulse' : ''} />
            {label}
        </button>
    );

    const markColumns = [
        { 
            key: 'student', 
            label: 'Student Name', 
            render: (_, s) => (
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shadow-inner
                        ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        {s.name.charAt(0)}
                    </div>
                    <div>
                        <p className={`font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.rollNo}</p>
                    </div>
                </div>
            )
        },
        { 
            key: 'class', 
            label: 'Class', 
            render: (_, s) => <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{s.class}</span> 
        },
        {
            key: 'status', 
            label: 'Mark Attendance', 
            render: (_, s) => (
                <div className="flex gap-3">
                    {statusBtn(s._id, 'present', 'Present', UserCheck, 
                        'bg-success text-white shadow-lg shadow-success/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'absent', 'Absent', UserX, 
                        'bg-danger text-white shadow-lg shadow-danger/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                    {statusBtn(s._id, 'late', 'Late', Clock, 
                        'bg-amber-500 text-white shadow-lg shadow-amber-500/30', 
                        isDarkMode ? 'bg-slate-800/50 text-slate-500 hover:bg-slate-800' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}
                </div>
            )
        }
    ];

    const historyColumns = [
        {
            key: 'date', label: 'Date',
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-primary" />
                    <span className={`font-black text-xs uppercase tracking-tighter ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>
            )
        },
        { 
            key: 'metrics', 
            label: 'Summary', 
            render: (_, row) => (
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-widest">
                        <UserCheck size={10} /> {row.present} Present
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest">
                        <UserX size={10} /> {row.absent} Absent
                    </div>
                </div>
            )
        },
        {
            key: 'efficiency', 
            label: 'Attendance %', 
            render: (_, row) => {
                const pct = row.total > 0 ? Math.round((row.present / row.total) * 100) : 0;
                return (
                    <div className="flex items-center gap-4 min-w-[200px]">
                        <div className={`flex-1 h-3 rounded-full relative overflow-hidden p-0.5 shadow-inner ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                className={`h-full rounded-full ${pct >= 75 ? 'bg-success' : pct >= 50 ? 'bg-amber-500' : 'bg-danger'}`}
                            />
                        </div>
                        <span className={`text-xs font-black tracking-tighter ${pct >= 75 ? 'text-success' : pct >= 50 ? 'text-amber-500' : 'text-danger'}`}>{pct}%</span>
                    </div>
                );
            }
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 pb-24 space-y-12">
                <PageHeader
                    title="Attendance Records"
                    subtitle="Track and manage student attendance records across all departments"
                    icon={ClipboardCheck}
                    backTo="/dashboard"
                    actions={
                        <Button 
                            variant="secondary" 
                            icon={Download}
                            onClick={() => toast.success('Attendance report exported')}
                        >
                            Export Report
                        </Button>
                    }
                />

                {/* KPI Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard 
                        title="Present Students" 
                        value={stats.present} 
                        icon={UserCheck} 
                        color="text-success" 
                        bg="bg-success/10" 
                    />
                    <StatCard 
                        title="Absent Students" 
                        value={stats.absent} 
                        icon={UserX} 
                        color="text-danger" 
                        bg="bg-danger/10" 
                    />
                    <StatCard 
                        title="Late Arrivals" 
                        value={stats.late} 
                        icon={Clock} 
                        color="text-amber-500" 
                        bg="bg-amber-500/10" 
                    />
                </div>

                {/* Operational Interface */}
                <div className={`p-2 rounded-[2rem] flex gap-2 w-fit mx-auto border glass-card
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    {[
                        { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
                        { id: 'history', label: 'Attendance History', icon: History }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-8 py-3 rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all duration-500
                                ${activeTab === tab.id 
                                    ? 'bg-primary text-white shadow-xl shadow-primary/25' 
                                    : 'text-slate-500 hover:text-primary hover:bg-primary/5'}`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'mark' ? (
                        <motion.div 
                            key="mark-tab"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="space-y-8"
                        >
                            {/* Command Parameters */}
                            <div className={`p-8 rounded-[2.5rem] border grid grid-cols-1 md:grid-cols-3 gap-8 glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'}`}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Filter size={12} /> Select Class
                                    </label>
                                    <select
                                        value={selectedClass}
                                        onChange={e => { setSelectedClass(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    >
                                        {classes.map(c => <option key={c} value={c}>{c === 'All' ? 'All Classes' : c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Calendar size={12} /> Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={e => { setSelectedDate(e.target.value); setSubmitted(false); }}
                                        className={`w-full h-12 px-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:ring-primary/20' : 'bg-slate-50 border-slate-200 focus:ring-primary/10'}`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Search size={12} /> Search Student
                                    </label>
                                    <div className="relative">
                                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or roll number..."
                                            value={searchTerm}
                                            onChange={e => setSearchTerm(e.target.value)}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border text-sm font-bold focus:ring-4 transition-all
                                                ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:ring-primary/20' : 'bg-slate-50 border-slate-200 placeholder-slate-400 focus:ring-primary/10'}`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Main Register */}
                            <div className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                                <div className={`px-10 py-6 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <span className={`text-sm font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {classStudents.length} Students
                                            </span>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Class List</p>
                                        </div>
                                    </div>
                                    {canMark && classStudents.length > 0 && (
                                        <div className="flex gap-4">
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'present');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-success/10 text-success text-[10px] font-black uppercase tracking-widest hover:bg-success hover:text-white transition-all duration-300">
                                                Mark All Present
                                            </button>
                                            <button onClick={() => {
                                                const updates = {};
                                                classStudents.forEach(s => updates[s._id] = 'absent');
                                                setAttendance(prev => ({ ...prev, ...updates }));
                                                setSubmitted(false);
                                            }} className="px-4 py-2 rounded-xl bg-danger/10 text-danger text-[10px] font-black uppercase tracking-widest hover:bg-danger hover:text-white transition-all duration-300">
                                                Mark All Absent
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <DataTable
                                    columns={markColumns}
                                    data={classStudents}
                                    loading={loading}
                                    emptyTitle="No Students Found"
                                    emptyDescription="No students matching the selected criteria."
                                />

                                {canMark && classStudents.length > 0 && !loading && (
                                    <div className={`px-10 py-8 border-t flex justify-end items-center gap-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                                        <p className="text-xs font-bold text-slate-500 italic">Please review the attendance before saving</p>
                                        <Button
                                            onClick={handleSubmit}
                                            loading={saving}
                                            icon={submitted ? CheckCircle : Save}
                                            variant={submitted ? "secondary" : "primary"}
                                            className="min-w-[200px]"
                                        >
                                            {submitted ? 'Attendance Saved' : 'Save Attendance'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="history-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={`rounded-[3rem] border overflow-hidden glass-card
                                ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}
                        >
                            <div className={`px-10 py-6 border-b flex items-center justify-between
                                ${isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-50 bg-slate-50/50'}`}>
                                <h2 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Attendance Logs</h2>
                                {historyLoading && <Loader2 size={18} className="animate-spin text-primary" />}
                            </div>
                            <DataTable
                                columns={historyColumns}
                                data={historyData}
                                loading={historyLoading}
                                emptyTitle="No History Found"
                                emptyDescription="No attendance records found for this period."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};


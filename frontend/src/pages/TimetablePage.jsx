import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Calendar, Plus, Clock, User, BookOpen, GraduationCap, X, CalendarDays, ShieldCheck, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { schedules } from '@/data/mockSchedules';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader, Button } from '@/components';
import { useTheme } from '@/context/ThemeContext';
import { useAuthStore } from '@/store/auth';

export const TimetablePage = () => {
    const { isDarkMode } = useTheme();
    const { user } = useAuthStore();
    const isAdmin = user?.roles?.includes('ADMIN');
    const [selectedProgram, setSelectedProgram] = useState('BCA-1');
    const [selectedSemester, setSelectedSemester] = useState(1);
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await apiClient.get('/teachers');
                if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
                    setTeachers(response.data.data);
                }
            } catch (error) {
                setTeachers([]);
            }
        };
        fetchTeachers();
    }, []);

    const [newSlot, setNewSlot] = useState({
        day: 'Monday',
        time: '09:00 AM',
        subject: '',
        teacher: '',
        room: ''
    });

    const programs = [
        { id: 'BCA-1', name: 'BCA - Year 1' },
        { id: 'BCA-2', name: 'BCA - Year 2' },
        { id: 'BCA-3', name: 'BCA - Year 3' },
        { id: 'BBA-1', name: 'BBA - Year 1' },
        { id: 'BBA-2', name: 'BBA - Year 2' },
        { id: 'BBA-3', name: 'BBA - Year 3' },
        { id: 'MBA-1', name: 'MBA - Year 1' },
        { id: 'MBA-2', name: 'MBA - Year 2' },
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'];
    const semesters = [1, 2];
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const key = `${selectedProgram}-sem${selectedSemester}`;
        setSchedule(schedules[key] || schedules[selectedProgram] || []);
    }, [selectedProgram, selectedSemester]);

    const getSlot = (day, time) => schedule.find(s => s.day === day && s.time === time);

    const handleAddSlot = (e) => {
        e.preventDefault();
        const existingSlot = schedule.find(s => s.day === newSlot.day && s.time === newSlot.time);
        if (existingSlot) {
            toast.error('Temporal conflict detected at this interval');
            return;
        }
        const updated = [...schedule, { ...newSlot }];
        setSchedule(updated);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
        toast.success('Schedule sequence initialized');
        setNewSlot({ day: 'Monday', time: '09:00 AM', subject: '', teacher: '', room: '' });
        setShowAddSlot(false);
    };

    const handleEditSlot = (slot) => {
        setEditingSlot(slot);
        setNewSlot({ ...slot, room: slot.room || '' });
        setShowAddSlot(true);
    };

    const handleUpdateSlot = (e) => {
        e.preventDefault();
        if (!editingSlot) return;
        const updatedSchedule = schedule.map(slot => {
            if (slot.day === editingSlot.day && slot.time === editingSlot.time) {
                return { ...newSlot };
            }
            return slot;
        });
        setSchedule(updatedSchedule);
        schedules[`${selectedProgram}-sem${selectedSemester}`] = updatedSchedule;
        toast.success('Schedule sequence updated');
        setEditingSlot(null);
        setShowAddSlot(false);
    };

    const handleDeleteSlot = (slot) => {
        if (confirm(`Authorize removal of ${slot.subject} from registry?`)) {
            const updated = schedule.filter(s => !(s.day === slot.day && s.time === slot.time));
            setSchedule(updated);
            schedules[`${selectedProgram}-sem${selectedSemester}`] = updated;
            toast.success('Sequence removed from registry');
        }
    };

    const getSubjectColor = (subject) => {
        const colors = [
            'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            'bg-blue-500/10 text-blue-500 border-blue-500/20',
            'bg-amber-500/10 text-amber-500 border-amber-500/20',
            'bg-purple-500/10 text-purple-500 border-purple-500/20',
        ];
        const index = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    const inputCls = `w-full h-12 px-4 rounded-xl border text-sm font-bold outline-none transition-all focus:ring-4 focus:ring-primary/20
        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-600 focus:border-primary' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-primary placeholder-slate-400'}`;

    return (
        <Layout>
            <div className="max-w-[1600px] mx-auto px-6 pb-24 space-y-10">
                <PageHeader
                    title="Calendar Matrix"
                    subtitle="Coordinate academic sequences and operational timeframes"
                    icon={CalendarDays}
                    actions={
                        <div className="flex items-center gap-4">
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
                                {semesters.map(sem => (
                                    <button
                                        key={sem}
                                        onClick={() => setSelectedSemester(sem)}
                                        className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${selectedSemester === sem
                                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        Semester {sem}
                                    </button>
                                ))}
                            </div>
                            <select 
                                value={selectedProgram} 
                                onChange={(e) => setSelectedProgram(e.target.value)} 
                                className="h-12 px-6 rounded-2xl border-none bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase tracking-wider outline-none focus:ring-4 focus:ring-primary/20"
                            >
                                {programs.map(prog => (<option key={prog.id} value={prog.id}>{prog.name}</option>))}
                            </select>
                            {isAdmin && (
                                <Button onClick={() => setShowAddSlot(true)} icon={Plus}>Initialize Slot</Button>
                            )}
                        </div>
                    }
                />

                {/* Timetable Matrix Grid */}
                <div className={`rounded-[3rem] border overflow-hidden glass-card transition-all duration-500
                    ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50'}`}>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50/50'}>
                                <th className="px-10 py-8 text-left border-b border-r border-slate-200/50 dark:border-slate-800/50 w-48">
                                    <div className="flex items-center gap-3">
                                        <Clock size={16} className="text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Time / Day</span>
                                    </div>
                                </th>
                                {timeSlots.map(time => (
                                    <th key={time} className="px-6 py-8 text-center border-b border-slate-200/50 dark:border-slate-800/50">
                                        <span className="text-xs font-black text-slate-800 dark:text-white tracking-widest">{time}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {days.map(day => (
                                <tr key={day} className="group hover:bg-primary/[0.02] transition-colors">
                                    <td className="px-10 py-10 border-r border-slate-200/50 dark:border-slate-800/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{day}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                                            </div>
                                        </div>
                                    </td>
                                    {timeSlots.map(time => {
                                        const slot = getSlot(day, time);
                                        return (
                                            <td key={`${day}-${time}`} className="p-4 border-slate-200/50 dark:border-slate-800/50 min-w-[200px]">
                                                {slot ? (
                                                    <motion.div 
                                                        whileHover={{ y: -4, scale: 1.02 }}
                                                        className={`p-6 rounded-[2rem] border-2 group/card relative overflow-hidden transition-all duration-300 ${getSubjectColor(slot.subject)}`}
                                                    >
                                                        <div className="space-y-4 relative z-10">
                                                            <h4 className="font-black text-sm tracking-tight leading-tight line-clamp-2 pr-4">{slot.subject}</h4>
                                                            <div className="space-y-2 opacity-80">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                    <User size={12} strokeWidth={3} /> {slot.teacher}
                                                                </div>
                                                                {slot.room && (
                                                                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                                                        <MapPin size={12} strokeWidth={3} /> {slot.room}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Action Hover Controls */}
                                                        {isAdmin && (
                                                            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all translate-x-4 group-hover/card:translate-x-0">
                                                                <button onClick={() => handleEditSlot(slot)} className="p-2 bg-white/20 hover:bg-white/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <Plus className="rotate-45" size={14} strokeWidth={4} />
                                                                </button>
                                                                <button onClick={() => handleDeleteSlot(slot)} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl backdrop-blur-md transition-all">
                                                                    <X size={14} strokeWidth={4} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ) : (
                                                    <div className="h-full min-h-[120px] rounded-[2rem] border-2 border-dashed border-slate-100 dark:border-slate-800/50 flex items-center justify-center transition-opacity opacity-0 hover:opacity-100 group/empty">
                                                        {isAdmin ? (
                                                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group-hover/empty:scale-110 transition-transform cursor-pointer">
                                                                <Plus size={20} className="text-slate-300 dark:text-slate-600" />
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 opacity-0" />
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Initialization Modal */}
                <AnimatePresence>
                    {showAddSlot && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className={`w-full max-w-lg rounded-[3.5rem] border overflow-hidden
                                    ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-2xl shadow-slate-950/20'}`}
                            >
                                <div className={`px-12 py-10 border-b flex items-center justify-between
                                    ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-50 bg-slate-50/50'}`}>
                                    <div>
                                        <h2 className="text-2xl font-black tracking-tight flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 text-primary rounded-[1.2rem]">
                                                {editingSlot ? <ShieldCheck size={20} /> : <Plus size={20} />}
                                            </div>
                                            {editingSlot ? 'Refine Sequence' : 'Initialize Sequence'}
                                        </h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 ml-16">
                                            {selectedProgram} • SEM {selectedSemester}
                                        </p>
                                    </div>
                                    <button onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="p-12 space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Temporal Axis</label>
                                            <select value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })} className={inputCls}>
                                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Clock Registry</label>
                                            <select value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} className={inputCls}>
                                                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Academic Subject</label>
                                        <input required value={newSlot.subject} onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })} placeholder="e.g. ADVANCED DATA STRUCTURES" className={inputCls} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Faculty Registry</label>
                                            <select required value={newSlot.teacher} onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })} className={inputCls}>
                                                <option value="">IDENTITY SELECT</option>
                                                {teachers.length > 0
                                                    ? teachers.map(t => <option key={t._id} value={t.userId?.fullName || 'IDENT-X'}>{t.userId?.fullName || 'IDENT-X'}</option>)
                                                    : [...new Set(Object.values(schedules).flat().map(s => s.teacher))].sort().map(name => (
                                                        <option key={name} value={name}>{name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Spatial Unit</label>
                                            <input value={newSlot.room} onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })} placeholder="e.g. TECH-LAB 402" className={inputCls} />
                                        </div>
                                    </div>

                                    <div className="flex gap-6 pt-4">
                                        <Button type="button" variant="ghost" onClick={() => { setShowAddSlot(false); setEditingSlot(null); }} className="flex-1 h-14">Discard</Button>
                                        <Button type="submit" className="flex-1 h-14">{editingSlot ? 'Sync Protocol' : 'Initialize Protocol'}</Button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};


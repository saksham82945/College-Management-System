import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Calendar, Plus, Clock, User, BookOpen, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { apiClient } from '@/services/api';
import { schedules } from '@/data/mockSchedules';
export const TimetablePage = () => {
    const [selectedProgram, setSelectedProgram] = useState('BCA');
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
                } else {
                    // No teachers from API — extract unique names from hardcoded schedules as fallback
                    setTeachers([]);
                }
            }
            catch (error) {
                console.error('Failed to fetch teachers', error);
                setTeachers([]);
            }
        };
        fetchTeachers();
    }, []);
    // Form state for adding new slot
    const [newSlot, setNewSlot] = useState({
        day: 'Monday',
        time: '09:00 AM',
        subject: '',
        teacher: '',
        room: ''
    });
    // College Programs
    const programs = [
        { id: 'BCA-1', name: 'BCA - Year 1' },
        { id: 'BCA-2', name: 'BCA - Year 2' },
        { id: 'BCA-3', name: 'BCA - Year 3' },
        { id: 'BBA-1', name: 'BBA - Year 1' },
        { id: 'BBA-2', name: 'BBA - Year 2' },
        { id: 'BBA-3', name: 'BBA - Year 3' },
        { id: 'MBA-1', name: 'MBA - Year 1' },
        { id: 'MBA-2', name: 'MBA - Year 2' },
        { id: 'BCOM-1', name: 'B.Com - Year 1' },
        { id: 'BCOM-2', name: 'B.Com - Year 2' },
        { id: 'BCOM-3', name: 'B.Com - Year 3' },
    ];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'];
    // Program-specific schedules are now imported
    const scheduleKey = `${selectedProgram}-${selectedSemester}`;
    const [schedule, setSchedule] = useState(schedules[scheduleKey] || []);
    React.useEffect(() => {
        setSchedule(schedules[scheduleKey] || []);
    }, [selectedProgram, selectedSemester, scheduleKey]);
    const getSlot = (day, time) => {
        return schedule.find(s => s.day === day && s.time === time);
    };
    const handleAddSlot = (e) => {
        e.preventDefault();
        // Check if slot already exists at this time
        const existingSlot = schedule.find(s => s.day === newSlot.day && s.time === newSlot.time);
        if (existingSlot) {
            toast.error('A class already exists at this time slot!');
            return;
        }
        // Add the new slot to schedule
        const slotToAdd = {
            day: newSlot.day,
            time: newSlot.time,
            subject: newSlot.subject,
            teacher: newSlot.teacher,
            room: newSlot.room || undefined
        };
        setSchedule([...schedule, slotToAdd]);
        toast.success('Timetable slot added successfully!');
        // Reset form and close modal
        setNewSlot({
            day: 'Monday',
            time: '09:00 AM',
            subject: '',
            teacher: '',
            room: ''
        });
        setShowAddSlot(false);
    };
    const handleEditSlot = (slot) => {
        setEditingSlot(slot);
        setNewSlot({
            day: slot.day,
            time: slot.time,
            subject: slot.subject,
            teacher: slot.teacher,
            room: slot.room || ''
        });
        setShowAddSlot(true);
    };
    const handleUpdateSlot = (e) => {
        e.preventDefault();
        if (!editingSlot)
            return;
        // Update the slot in schedule
        const updatedSchedule = schedule.map(slot => {
            if (slot.day === editingSlot.day && slot.time === editingSlot.time &&
                slot.subject === editingSlot.subject && slot.teacher === editingSlot.teacher) {
                return {
                    day: newSlot.day,
                    time: newSlot.time,
                    subject: newSlot.subject,
                    teacher: newSlot.teacher,
                    room: newSlot.room || undefined
                };
            }
            return slot;
        });
        setSchedule(updatedSchedule);
        toast.success('Timetable slot updated successfully!');
        // Reset state
        setEditingSlot(null);
        setNewSlot({
            day: 'Monday',
            time: '09:00 AM',
            subject: '',
            teacher: '',
            room: ''
        });
        setShowAddSlot(false);
    };
    const handleDeleteSlot = (slot) => {
        if (confirm(`Are you sure you want to delete ${slot.subject}?`)) {
            const updatedSchedule = schedule.filter(s => !(s.day === slot.day && s.time === slot.time && s.subject === slot.subject));
            setSchedule(updatedSchedule);
            toast.success('Timetable slot deleted successfully!');
        }
    };
    const getSubjectColor = (subject) => {
        const colors = [
            'bg-blue-50 border-blue-200 text-blue-700',
            'bg-purple-50 border-purple-200 text-purple-700',
            'bg-green-50 border-green-200 text-green-700',
            'bg-orange-50 border-orange-200 text-orange-700',
            'bg-pink-50 border-pink-200 text-pink-700',
            'bg-indigo-50 border-indigo-200 text-indigo-700',
        ];
        const index = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };
    return (<Layout>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <GraduationCap className="text-indigo-600" size={28} />
                    Course Timetable
                </h1>
                <p className="text-gray-500 text-sm">Manage academic schedules by program</p>
            </div>
            <div className="flex gap-4 flex-wrap items-center">
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {semesters.map(sem => (
                        <button
                            key={sem}
                            onClick={() => setSelectedSemester(sem)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${selectedSemester === sem
                                ? 'bg-white text-indigo-700 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Semester {sem}
                        </button>
                    ))}
                </div>
                <select value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)} className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 font-medium">
                    {programs.map(prog => (<option key={prog.id} value={prog.id}>{prog.name}</option>))}
                </select>
                <button onClick={() => setShowAddSlot(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                    <Plus size={18} /> Add Slot
                </button>
            </div>
        </div>

        {/* Program Info */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6 border border-indigo-100">
            <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <Calendar className="text-indigo-600" size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800">
                        {programs.find(p => p.id === selectedProgram)?.name} - Semester {selectedSemester}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {schedule.length} classes scheduled this week
                    </p>
                </div>
            </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[900px]">
                <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                        <th className="px-6 py-4 text-left font-semibold text-sm w-32">
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                Day / Time
                            </div>
                        </th>
                        {timeSlots.map(time => (<th key={time} className="px-4 py-4 text-center font-semibold text-sm">
                            {time}
                        </th>))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {days.map(day => (<tr key={day} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-700 bg-gray-50/70">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                                {day}
                            </div>
                        </td>
                        {timeSlots.map(time => {
                            const slot = getSlot(day, time);
                            return (<td key={`${day}-${time}`} className="p-2 border-l border-gray-100">
                                {slot ? (<div className={`${getSubjectColor(slot.subject)} p-3 rounded-lg border-2 group hover:shadow-md transition-all min-h-[100px] relative`}>
                                    <p className="font-bold text-sm mb-2 pr-16">{slot.subject}</p>
                                    <div className="space-y-1">
                                        <p className="text-xs flex items-center gap-1 opacity-80">
                                            <User size={12} /> {slot.teacher}
                                        </p>
                                        {slot.room && (<p className="text-xs flex items-center gap-1 opacity-80">
                                            <BookOpen size={12} /> {slot.room}
                                        </p>)}
                                    </div>
                                    {/* Edit and Delete buttons */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditSlot(slot)} className="p-1 bg-white/80 hover:bg-white rounded shadow-sm transition-colors" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDeleteSlot(slot)} className="p-1 bg-white/80 hover:bg-white rounded shadow-sm transition-colors" title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>) : (<div className="h-[100px] rounded-lg border-2 border-dashed border-transparent hover:border-gray-300 flex items-center justify-center group cursor-pointer opacity-0 hover:opacity-100 transition-all">
                                    <Plus className="text-gray-400" size={20} />
                                </div>)}
                            </td>);
                        })}
                    </tr>))}
                </tbody>
            </table>
        </div>

        {/* Add/Edit Slot Modal */}
        {showAddSlot && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onClick={() => { setShowAddSlot(false); setEditingSlot(null); }}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <h2 className="text-xl font-bold">
                        {editingSlot ? 'Edit Schedule Slot' : 'Add Schedule Slot'}
                    </h2>
                    <p className="text-sm opacity-90">
                        For {programs.find(p => p.id === selectedProgram)?.name} - Semester {selectedSemester}
                    </p>
                </div>
                <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <select value={newSlot.day} onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <select value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
                                {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input required value={newSlot.subject} onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })} placeholder="e.g. Data Structures" className="w-full pl-9 pr-4 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <select required value={newSlot.teacher} onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })} className="w-full pl-9 pr-4 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white">
                                <option value="">Select Teacher</option>
                                {teachers.length > 0
                                    ? teachers.map(teacher => {
                                        const name = teacher.userId?.fullName
                                            || (teacher.userId?.firstName ? `${teacher.userId.firstName} ${teacher.userId.lastName || ''}`.trim() : null)
                                            || teacher.userId?.email
                                            || 'Unknown Teacher';
                                        return (<option key={teacher._id} value={name}>
                                            {name}
                                        </option>);
                                    })
                                    : [...new Set(Object.values(schedules).flat().map(s => s.teacher))].sort().map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                        <input value={newSlot.room} onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })} placeholder="e.g. Lab 101" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button type="button" onClick={() => {
                            setShowAddSlot(false);
                            setEditingSlot(null);
                            setNewSlot({
                                day: 'Monday',
                                time: '09:00 AM',
                                subject: '',
                                teacher: '',
                                room: ''
                            });
                        }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            {editingSlot ? 'Update Slot' : 'Save Slot'}
                        </button>
                    </div>
                </form>
            </div>
        </div>)}
    </Layout>);
};

import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Calendar, Plus, Clock, User, BookOpen, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

interface TimeSlot {
    day: string;
    time: string;
    subject: string;
    teacher: string;
    room?: string;
}

interface ProgramSchedule {
    [key: string]: TimeSlot[];
}

export const TimetablePage: React.FC = () => {
    const [selectedProgram, setSelectedProgram] = useState('BCA-1');
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);

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

    // Program-specific schedules
    const schedules: ProgramSchedule = {
        'BCA-1': [
            { day: 'Monday', time: '09:00 AM', subject: 'Programming in C', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
            { day: 'Monday', time: '11:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Digital Electronics', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
            { day: 'Tuesday', time: '02:00 PM', subject: 'English Communication', teacher: 'Ms. Priya Singh', room: 'Room 205' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Programming in C Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Mathematics-I', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Environmental Studies', teacher: 'Dr. Kavita Desai', room: 'Room 105' },
            { day: 'Friday', time: '09:00 AM', subject: 'Digital Electronics Lab', teacher: 'Mr. Suresh Patel', room: 'Lab 102' },
            { day: 'Friday', time: '11:00 AM', subject: 'Computer Fundamentals', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Programming Workshop', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
        ],
        'BCA-2': [
            { day: 'Monday', time: '09:00 AM', subject: 'Data Structures', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
            { day: 'Monday', time: '11:00 AM', subject: 'Object Oriented Programming', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
            { day: 'Monday', time: '02:00 PM', subject: 'Mathematics-II', teacher: 'Prof. Anita Sharma', room: 'Room 201' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Database Management Systems', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Computer Organization', teacher: 'Mr. Suresh Patel', room: 'Room 202' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Operating Systems', teacher: 'Dr. Vikram Mehta', room: 'Room 301' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Data Structures Lab', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Web Technologies', teacher: 'Mr. Karan Singh', room: 'Lab 105' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Software Engineering', teacher: 'Prof. Neha Kapoor', room: 'Room 203' },
            { day: 'Friday', time: '09:00 AM', subject: 'DBMS Lab', teacher: 'Dr. Sanjay Verma', room: 'Lab 104' },
            { day: 'Friday', time: '11:00 AM', subject: 'OOP Lab', teacher: 'Prof. Arjun Reddy', room: 'Lab 103' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Project Development Workshop', teacher: 'Industry Expert', room: 'Lab 101' },
        ],
        'BCA-3': [
            { day: 'Monday', time: '09:00 AM', subject: 'Artificial Intelligence', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
            { day: 'Monday', time: '11:00 AM', subject: 'Computer Networks', teacher: 'Prof. Rahul Joshi', room: 'Lab 202' },
            { day: 'Monday', time: '02:00 PM', subject: 'Cloud Computing', teacher: 'Mr. Amit Sharma', room: 'Lab 203' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Machine Learning', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Cyber Security', teacher: 'Prof. Rajat Khanna', room: 'Room 401' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Mobile App Development', teacher: 'Mr. Rohan Verma', room: 'Lab 204' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'AI Lab', teacher: 'Dr. Priya Deshmukh', room: 'Lab 201' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Big Data Analytics', teacher: 'Prof. Sunil Kumar', room: 'Lab 205' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Blockchain Technology', teacher: 'Dr. Ankur Agarwal', room: 'Room 402' },
            { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Dr. Rajesh Kumar', room: 'Lab 101' },
            { day: 'Friday', time: '11:00 AM', subject: 'Industry Internship', teacher: 'Project Guide', room: 'Lab 101' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Review', teacher: 'Panel of Experts', room: 'Auditorium' },
        ],
        'BBA-1': [
            { day: 'Monday', time: '09:00 AM', subject: 'Business Communication', teacher: 'Prof. Meera Agarwal', room: 'Room 401' },
            { day: 'Monday', time: '11:00 AM', subject: 'Principles of Management', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Business Economics', teacher: 'Prof. Sanjay Verma', room: 'Room 403' },
            { day: 'Tuesday', time: '02:00 PM', subject: 'Financial Accounting', teacher: 'CA Rakesh Jain', room: 'Room 404' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Business Mathematics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Computer Applications', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Priya Malhotra', room: 'Room 401' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Organizational Behavior', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
            { day: 'Friday', time: '09:00 AM', subject: 'Marketing Fundamentals', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
            { day: 'Friday', time: '11:00 AM', subject: 'Business Statistics', teacher: 'Prof. Neha Kapoor', room: 'Room 405' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Business Seminar', teacher: 'Guest Faculty', room: 'Auditorium' },
        ],
        'BBA-2': [
            { day: 'Monday', time: '09:00 AM', subject: 'Marketing Management', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
            { day: 'Monday', time: '11:00 AM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 404' },
            { day: 'Monday', time: '02:00 PM', subject: 'Cost Accounting', teacher: 'CA Rakesh Jain', room: 'Room 405' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 406' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Production Management', teacher: 'Dr. Sunil Kumar', room: 'Room 407' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 408' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'International Business', teacher: 'Prof. Vikram Singh', room: 'Room 409' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Consumer Behavior', teacher: 'Prof. Amit Khanna', room: 'Room 403' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Financial Markets', teacher: 'CA Mohan Das', room: 'Room 406' },
            { day: 'Friday', time: '09:00 AM', subject: 'E-Commerce', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
            { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Dr. Arun Gupta', room: 'Room 402' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Industry Visit', teacher: 'Coordinator', room: 'Campus Gate' },
        ],
        'BBA-3': [
            { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
            { day: 'Monday', time: '11:00 AM', subject: 'Investment Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
            { day: 'Monday', time: '02:00 PM', subject: 'Brand Management', teacher: 'Prof. Amit Khanna', room: 'Room 503' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Entrepreneurship Dev.', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Digital Marketing', teacher: 'Ms. Sneha Reddy', room: 'Lab 301' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Project Management', teacher: 'Prof. Sunil Kumar', room: 'Room 505' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 302' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Supply Chain Management', teacher: 'Dr. Arvind Patel', room: 'Room 506' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 507' },
            { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 501' },
            { day: 'Friday', time: '11:00 AM', subject: 'Internship Training', teacher: 'Industry Mentor', room: 'Room 502' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Final Project Presentation', teacher: 'Evaluation Panel', room: 'Auditorium' },
        ],
        'MBA-1': [
            { day: 'Monday', time: '09:00 AM', subject: 'Strategic Management', teacher: 'Dr. Vikram Singh', room: 'Room 501' },
            { day: 'Monday', time: '11:00 AM', subject: 'Financial Management', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Marketing Management', teacher: 'Dr. Pooja Mehta', room: 'Room 503' },
            { day: 'Tuesday', time: '02:00 PM', subject: 'Human Resource Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 504' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Operations Management', teacher: 'Dr. Sunil Kumar', room: 'Room 505' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Business Analytics', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 301' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Managerial Economics', teacher: 'Dr. Arvind Patel', room: 'Room 501' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Corporate Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 502' },
            { day: 'Friday', time: '09:00 AM', subject: 'Business Research Methods', teacher: 'Dr. Kavita Sharma', room: 'Room 503' },
            { day: 'Friday', time: '11:00 AM', subject: 'Entrepreneurship', teacher: 'Mr. Rajat Verma', room: 'Room 504' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Industry Expert Session', teacher: 'Guest Speaker', room: 'Auditorium' },
        ],
        'MBA-2': [
            { day: 'Monday', time: '09:00 AM', subject: 'Global Business Strategy', teacher: 'Dr. Vikram Singh', room: 'Room 601' },
            { day: 'Monday', time: '11:00 AM', subject: 'Mergers & Acquisitions', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
            { day: 'Monday', time: '02:00 PM', subject: 'Innovation Management', teacher: 'Dr. Ankur Agarwal', room: 'Room 603' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Financial Derivatives', teacher: 'CA Sanjay Mehta', room: 'Room 604' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Advanced Marketing', teacher: 'Dr. Pooja Mehta', room: 'Room 605' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Leadership & Change Mgmt', teacher: 'Prof. Ritu Sharma', room: 'Room 606' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Data Science for Business', teacher: 'Prof. Nikhil Agarwal', room: 'Lab 401' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Corporate Restructuring', teacher: 'Dr. Arvind Patel', room: 'Room 607' },
            { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 602' },
            { day: 'Friday', time: '09:00 AM', subject: 'Capstone Project', teacher: 'Project Supervisor', room: 'Room 601' },
            { day: 'Friday', time: '11:00 AM', subject: 'Summer Internship Review', teacher: 'Faculty Panel', room: 'Room 602' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Final Thesis Defense', teacher: 'Expert Committee', room: 'Auditorium' },
        ],
        'BCOM-1': [
            { day: 'Monday', time: '09:00 AM', subject: 'Financial Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
            { day: 'Monday', time: '11:00 AM', subject: 'Business Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Business Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
            { day: 'Tuesday', time: '02:00 PM', subject: 'Business Maths & Stats', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Cost Accounting', teacher: 'CA Mohan Das', room: 'Room 301' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Accounting', teacher: 'CA Priya Gupta', room: 'Room 305' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Income Tax Law', teacher: 'CA Sanjay Mehta', room: 'Room 302' },
            { day: 'Thursday', time: '02:00 PM', subject: 'Banking & Insurance', teacher: 'Mr. Anil Sharma', room: 'Room 303' },
            { day: 'Friday', time: '09:00 AM', subject: 'Computer Applications', teacher: 'Ms. Neha Kapoor', room: 'Lab 201' },
            { day: 'Friday', time: '11:00 AM', subject: 'Business Communication', teacher: 'Prof. Rita Singh', room: 'Room 304' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Accounting Workshop', teacher: 'CA Mohan Das', room: 'Room 301' },
        ],
        'BCOM-2': [
            { day: 'Monday', time: '09:00 AM', subject: 'Management Accounting', teacher: 'CA Rakesh Jain', room: 'Room 306' },
            { day: 'Monday', time: '11:00 AM', subject: 'Macro Economics', teacher: 'Prof. Sunita Roy', room: 'Room 302' },
            { day: 'Monday', time: '02:00 PM', subject: 'Company Law', teacher: 'Adv. Kiran Bedi', room: 'Room 303' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Goods & Services Tax', teacher: 'CA Sanjay Mehta', room: 'Room 307' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Financial Markets', teacher: 'Prof. Deepak Chopra', room: 'Room 308' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Auditing Principles', teacher: 'CA Mohan Das', room: 'Room 301' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Tax Planning', teacher: 'CA Priya Gupta', room: 'Room 305' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Business Statistics', teacher: 'Prof. Rajiv Malhotra', room: 'Room 304' },
            { day: 'Thursday', time: '02:00 PM', subject: 'E-Commerce & Taxation', teacher: 'Mr. Rohit Sharma', room: 'Lab 201' },
            { day: 'Friday', time: '09:00 AM', subject: 'Fundamentals of Investment', teacher: 'CA Rakesh Jain', room: 'Room 306' },
            { day: 'Friday', time: '11:00 AM', subject: 'Business Ethics', teacher: 'Prof. Rita Singh', room: 'Room 304' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Tally & Accounting Software', teacher: 'Mr. Anil Sharma', room: 'Lab 202' },
        ],
        'BCOM-3': [
            { day: 'Monday', time: '09:00 AM', subject: 'Advanced Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
            { day: 'Monday', time: '11:00 AM', subject: 'International Economics', teacher: 'Prof. Sunita Roy', room: 'Room 402' },
            { day: 'Monday', time: '02:00 PM', subject: 'Strategic Cost Mgmt', teacher: 'CA Rakesh Jain', room: 'Room 403' },
            { day: 'Tuesday', time: '10:00 AM', subject: 'Advanced Tax Planning', teacher: 'CA Sanjay Mehta', room: 'Room 404' },
            { day: 'Tuesday', time: '12:00 PM', subject: 'Portfolio Management', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
            { day: 'Wednesday', time: '09:00 AM', subject: 'Financial Statement Analysis', teacher: 'CA Priya Gupta', room: 'Room 406' },
            { day: 'Wednesday', time: '11:00 AM', subject: 'Corporate Governance', teacher: 'Adv. Priya Malhotra', room: 'Room 407' },
            { day: 'Thursday', time: '10:00 AM', subject: 'Forensic Accounting', teacher: 'CA Mohan Das', room: 'Room 401' },
            { day: 'Thursday', time: '02:00 PM', subject: 'International Finance', teacher: 'Prof. Deepak Chopra', room: 'Room 405' },
            { day: 'Friday', time: '09:00 AM', subject: 'Major Project', teacher: 'Project Guide', room: 'Room 401' },
            { day: 'Friday', time: '11:00 AM', subject: 'Professional Training', teacher: 'Industry Expert', room: 'Room 402' },
            { day: 'Saturday', time: '09:00 AM', subject: 'Final Year Project Viva', teacher: 'Examination Panel', room: 'Auditorium' },
        ],
    };

    const [schedule, setSchedule] = useState<TimeSlot[]>(schedules[selectedProgram] || []);

    React.useEffect(() => {
        setSchedule(schedules[selectedProgram] || []);
    }, [selectedProgram]);

    const getSlot = (day: string, time: string) => {
        return schedule.find(s => s.day === day && s.time === time);
    };

    const handleAddSlot = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if slot already exists at this time
        const existingSlot = schedule.find(
            s => s.day === newSlot.day && s.time === newSlot.time
        );

        if (existingSlot) {
            toast.error('A class already exists at this time slot!');
            return;
        }

        // Add the new slot to schedule
        const slotToAdd: TimeSlot = {
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

    const handleEditSlot = (slot: TimeSlot) => {
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

    const handleUpdateSlot = (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingSlot) return;

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

    const handleDeleteSlot = (slot: TimeSlot) => {
        if (confirm(`Are you sure you want to delete ${slot.subject}?`)) {
            const updatedSchedule = schedule.filter(s =>
                !(s.day === slot.day && s.time === slot.time && s.subject === slot.subject)
            );
            setSchedule(updatedSchedule);
            toast.success('Timetable slot deleted successfully!');
        }
    };

    const getSubjectColor = (subject: string) => {
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

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <GraduationCap className="text-indigo-600" size={28} />
                        Course Timetable
                    </h1>
                    <p className="text-gray-500 text-sm">Manage academic schedules by program</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    <select
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 font-medium"
                    >
                        {programs.map(prog => (
                            <option key={prog.id} value={prog.id}>{prog.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setShowAddSlot(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
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
                            {programs.find(p => p.id === selectedProgram)?.name}
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
                            {timeSlots.map(time => (
                                <th key={time} className="px-4 py-4 text-center font-semibold text-sm">
                                    {time}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {days.map(day => (
                            <tr key={day} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-700 bg-gray-50/70">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                                        {day}
                                    </div>
                                </td>
                                {timeSlots.map(time => {
                                    const slot = getSlot(day, time);
                                    return (
                                        <td key={`${day}-${time}`} className="p-2 border-l border-gray-100">
                                            {slot ? (
                                                <div className={`${getSubjectColor(slot.subject)} p-3 rounded-lg border-2 group hover:shadow-md transition-all min-h-[100px] relative`}>
                                                    <p className="font-bold text-sm mb-2 pr-16">{slot.subject}</p>
                                                    <div className="space-y-1">
                                                        <p className="text-xs flex items-center gap-1 opacity-80">
                                                            <User size={12} /> {slot.teacher}
                                                        </p>
                                                        {slot.room && (
                                                            <p className="text-xs flex items-center gap-1 opacity-80">
                                                                <BookOpen size={12} /> {slot.room}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {/* Edit and Delete buttons */}
                                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => handleEditSlot(slot)}
                                                            className="p-1 bg-white/80 hover:bg-white rounded shadow-sm transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSlot(slot)}
                                                            className="p-1 bg-white/80 hover:bg-white rounded shadow-sm transition-colors"
                                                            title="Delete"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-[100px] rounded-lg border-2 border-dashed border-transparent hover:border-gray-300 flex items-center justify-center group cursor-pointer opacity-0 hover:opacity-100 transition-all">
                                                    <Plus className="text-gray-400" size={20} />
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

            {/* Add/Edit Slot Modal */}
            {showAddSlot && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                            <h2 className="text-xl font-bold">
                                {editingSlot ? 'Edit Schedule Slot' : 'Add Schedule Slot'}
                            </h2>
                            <p className="text-sm opacity-90">
                                For {programs.find(p => p.id === selectedProgram)?.name}
                            </p>
                        </div>
                        <form onSubmit={editingSlot ? handleUpdateSlot : handleAddSlot} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                                    <select
                                        value={newSlot.day}
                                        onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                    <select
                                        value={newSlot.time}
                                        onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        required
                                        value={newSlot.subject}
                                        onChange={(e) => setNewSlot({ ...newSlot, subject: e.target.value })}
                                        placeholder="e.g. Data Structures"
                                        className="w-full pl-9 pr-4 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        required
                                        value={newSlot.teacher}
                                        onChange={(e) => setNewSlot({ ...newSlot, teacher: e.target.value })}
                                        placeholder="e.g. Dr. John Doe"
                                        className="w-full pl-9 pr-4 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                <input
                                    value={newSlot.room}
                                    onChange={(e) => setNewSlot({ ...newSlot, room: e.target.value })}
                                    placeholder="e.g. Lab 101"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddSlot(false);
                                        setEditingSlot(null);
                                        setNewSlot({
                                            day: 'Monday',
                                            time: '09:00 AM',
                                            subject: '',
                                            teacher: '',
                                            room: ''
                                        });
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    {editingSlot ? 'Update Slot' : 'Save Slot'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

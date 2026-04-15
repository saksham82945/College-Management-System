"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentDashboardStats = exports.getTeacherDashboardStats = exports.getAdminDashboardStats = void 0;
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Payment_1 = require("../models/Payment");
const Attendance_Model = require("../models/Attendance");

const getAdminDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student_1.Student.countDocuments();
        const totalTeachers = await Teacher_1.Teacher.countDocuments();

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        let chartData = [];
        let totalRevenue = 0;
        try {
            const chartDataRaw = await Payment_1.Payment.aggregate([
                { $match: { paymentDate: { $gte: sixMonthsAgo }, status: 'COMPLETED' } },
                { $group: { _id: { month: { $month: "$paymentDate" }, year: { $year: "$paymentDate" } }, revenue: { $sum: "$amount" }, students: { $addToSet: "$studentId" } } },
                { $sort: { "_id.year": 1, "_id.month": 1 } }
            ]);
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            chartData = chartDataRaw.map(item => ({ name: monthNames[item._id.month - 1], revenue: item.revenue, students: item.students.length }));
            totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
        } catch (e) { /* Payment model may not exist */ }

        const recentStudents = await Student_1.Student.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'fullName email')
            .lean();

        const Attendance = Attendance_Model.default || Attendance_Model;
        const totalRecords = await Attendance.countDocuments().catch(() => 0);
        const presentRecords = await Attendance.countDocuments({ status: 'PRESENT' }).catch(() => 0);
        const absentRecords = await Attendance.countDocuments({ status: 'ABSENT' }).catch(() => 0);

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                totalRevenue,
                pendingFees: 0,
                attendance: {
                    total: totalRecords,
                    present: presentRecords,
                    absent: absentRecords,
                    presentPct: totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0
                },
                recentAdmissions: recentStudents,
                chartData
            }
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch dashboard statistics' });
    }
};
exports.getAdminDashboardStats = getAdminDashboardStats;

const getTeacherDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const teacher = await Teacher_1.Teacher.findOne({ userId })
            .populate('userId', 'fullName email')
            .lean();

        const totalStudents = await Student_1.Student.countDocuments();
        const students = await Student_1.Student.find()
            .populate('userId', 'fullName email')
            .lean();

        const Attendance = Attendance_Model.default || Attendance_Model;
        const recentAttendance = await Attendance.find({ markedBy: userId })
            .sort({ date: -1 })
            .limit(10)
            .populate('student', 'rollNo course semester')
            .lean();

        const totalMarked = await Attendance.countDocuments({ markedBy: userId }).catch(() => 0);
        const presentMarked = await Attendance.countDocuments({ markedBy: userId, status: 'PRESENT' }).catch(() => 0);

        res.status(200).json({
            success: true,
            data: {
                teacher: teacher ? {
                    name: teacher.userId?.fullName || 'Teacher',
                    department: teacher.department || '—',
                    designation: teacher.designation || '—',
                    email: teacher.userId?.email || '—'
                } : {},
                totalStudents,
                students: students.map(s => ({
                    id: s._id,
                    name: s.userId?.fullName || 'Unknown',
                    rollNo: s.rollNo || '—',
                    course: s.course || 'Unassigned',
                    semester: s.semester || '—'
                })),
                attendanceStats: {
                    totalMarked,
                    presentMarked,
                    absentMarked: totalMarked - presentMarked,
                    presentPct: totalMarked > 0 ? Math.round((presentMarked / totalMarked) * 100) : 0
                },
                recentAttendance: recentAttendance.map(a => ({
                    date: a.date,
                    status: a.status,
                    studentRoll: a.student?.rollNo || '—',
                    studentCourse: a.student?.course || '—'
                }))
            }
        });
    } catch (error) {
        console.error('Teacher Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch teacher dashboard' });
    }
};
exports.getTeacherDashboardStats = getTeacherDashboardStats;

const getStudentDashboardStats = async (req, res) => {
    try {
        const userId = req.user?.userId;

        const student = await Student_1.Student.findOne({ userId })
            .populate('userId', 'fullName email')
            .lean();

        if (!student) {
            return res.status(200).json({
                success: true,
                data: { student: null, attendance: { total: 0, present: 0, presentPct: 0 }, fees: { paid: 0, due: 0 } }
            });
        }

        const Attendance = Attendance_Model.default || Attendance_Model;
        const totalAttendance = await Attendance.countDocuments({ student: student._id }).catch(() => 0);
        const presentAttendance = await Attendance.countDocuments({ student: student._id, status: 'PRESENT' }).catch(() => 0);

        let feesPaid = 0;
        try {
            const payments = await Payment_1.Payment.find({ studentId: student._id, status: 'COMPLETED' });
            feesPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
        } catch (e) { /* Payment model may not exist */ }

        res.status(200).json({
            success: true,
            data: {
                student: {
                    name: student.userId?.fullName || 'Student',
                    rollNo: student.rollNo || '—',
                    course: student.course || 'Unassigned',
                    semester: student.semester || '—',
                    section: student.section || '—',
                    email: student.userId?.email || '—'
                },
                attendance: {
                    total: totalAttendance,
                    present: presentAttendance,
                    absent: totalAttendance - presentAttendance,
                    presentPct: totalAttendance > 0 ? Math.round((presentAttendance / totalAttendance) * 100) : 0
                },
                fees: {
                    paid: feesPaid,
                    due: 0
                }
            }
        });
    } catch (error) {
        console.error('Student Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch student dashboard' });
    }
};
exports.getStudentDashboardStats = getStudentDashboardStats;

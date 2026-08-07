"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentDashboardStats = exports.getTeacherDashboardStats = exports.getAdminDashboardStats = void 0;
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Payment_1 = require("../models/Payment");
const Attendance_Model = require("../models/Attendance");
const StudentFee_Model = require("../models/StudentFee");
const Exam_Model = require("../models/Exam");
const Class_Model = require("../models/Class");

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
        const [attendanceStats] = await Attendance.aggregate([
            {
                $group: {
                    _id: null,
                    totalRecords: { $sum: 1 },
                    presentRecords: {
                        $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] }
                    },
                    absentRecords: {
                        $sum: { $cond: [{ $eq: ["$status", "ABSENT"] }, 1, 0] }
                    }
                }
            }
        ]).catch(() => [{ totalRecords: 0, presentRecords: 0, absentRecords: 0 }]);

        const totalRecords = attendanceStats?.totalRecords || 0;
        const presentRecords = attendanceStats?.presentRecords || 0;
        const absentRecords = attendanceStats?.absentRecords || 0;

        const attendanceTrend = await Attendance.aggregate([
            { $match: { date: { $gte: sixMonthsAgo } } },
            { $group: { 
                _id: { month: { $month: "$date" }, year: { $year: "$date" } }, 
                total: { $sum: 1 }, 
                present: { $sum: { $cond: [{ $eq: ["$status", "PRESENT"] }, 1, 0] } } 
            } },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]).catch(() => []);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const attendanceTrendData = attendanceTrend.map(item => ({
            name: monthNames[item._id.month - 1],
            attendancePct: item.total > 0 ? Math.round((item.present / item.total) * 100) : 0
        }));

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
                chartData,
                attendanceTrendData
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
            .limit(10)
            .lean();

        const Attendance = Attendance_Model.default || Attendance_Model;
        const recentAttendance = await Attendance.find({ markedBy: userId })
            .sort({ date: -1 })
            .limit(10)
            .populate('student', 'rollNo course semester')
            .lean();

        const totalMarked = await Attendance.countDocuments({ markedBy: userId }).catch(() => 0);
        const presentMarked = await Attendance.countDocuments({ markedBy: userId, status: 'PRESENT' }).catch(() => 0);

        // Assigned classes count
        let assignedClasses = 0;
        try {
            const Class = Class_Model.default || Class_Model;
            const teacherId = teacher?._id;
            if (teacherId) {
                assignedClasses = await Class.countDocuments({
                    $or: [{ classTeacher: teacherId }, { 'subjects.teacher': teacherId }]
                }).catch(() => 0);
            }
        } catch { /* Class model may not have this field */ }

        // Students with low attendance (below 75%)
        const lowAttendanceStudents = [];
        try {
            const attByStudent = await Attendance.aggregate([
                { $group: {
                    _id: '$student',
                    total: { $sum: 1 },
                    present: { $sum: { $cond: [{ $eq: ['$status', 'PRESENT'] }, 1, 0] } }
                }},
                { $project: {
                    pct: { $cond: [{ $gt: ['$total', 0] }, { $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 0] }
                }},
                { $match: { pct: { $lt: 75 } } },
                { $limit: 5 }
            ]);
            for (const rec of attByStudent) {
                const s = await Student_1.Student.findById(rec._id).populate('userId', 'fullName').lean();
                if (s) lowAttendanceStudents.push({ name: s.userId?.fullName || '—', rollNo: s.rollNo, pct: Math.round(rec.pct) });
            }
        } catch { /* non-critical */ }

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
                assignedClasses,
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
                })),
                lowAttendanceStudents
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
                data: { student: null, attendance: { total: 0, present: 0, absent: 0, presentPct: 0 }, fees: { paid: 0, due: 0 } }
            });
        }

        const Attendance = Attendance_Model.default || Attendance_Model;
        const totalAttendance = await Attendance.countDocuments({ student: student._id }).catch(() => 0);
        const presentAttendance = await Attendance.countDocuments({ student: student._id, status: 'PRESENT' }).catch(() => 0);

        // Fee data
        let feesPaid = 0;
        let feesDue = 0;
        try {
            const payments = await Payment_1.Payment.find({ studentId: student._id, status: 'COMPLETED' });
            feesPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
        } catch { /* Payment model may not exist */ }
        try {
            const StudentFee = StudentFee_Model.default || StudentFee_Model;
            const pendingFees = await StudentFee.find({ studentId: student._id, status: { $in: ['PENDING', 'PARTIAL'] } });
            feesDue = pendingFees.reduce((sum, f) => sum + Math.max(0, (f.totalAmount || 0) - (f.paidAmount || 0)), 0);
        } catch { /* StudentFee model may not exist */ }

        // Upcoming exams (next 3)
        let upcomingExams = [];
        try {
            const Exam = Exam_Model.default || Exam_Model;
            upcomingExams = await Exam.find({ date: { $gte: new Date() } })
                .sort({ date: 1 })
                .limit(3)
                .lean();
        } catch { /* Exam model may not exist */ }

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
                fees: { paid: feesPaid, due: feesDue },
                upcomingExams: upcomingExams.map(e => ({
                    id: e._id,
                    name: e.name || e.subject || 'Exam',
                    date: e.date,
                    subject: e.subject || e.name || '—',
                    duration: e.duration || '—'
                }))
            }
        });
    } catch (error) {
        console.error('Student Dashboard Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch student dashboard' });
    }
};
exports.getStudentDashboardStats = getStudentDashboardStats;

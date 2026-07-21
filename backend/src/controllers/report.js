'use strict';
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const StudentFee = require('../models/StudentFee');
const Student = require('../models/Student');

/**
 * GET /api/v1/reports/attendance
 * Query params: startDate, endDate, classId, studentId
 * Returns: attendance summary report
 */
const getAttendanceReport = async (req, res) => {
    try {
        const { startDate, endDate, classId, studentId } = req.query;

        const filter = {};
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filter.date.$lte = end;
            }
        }
        if (classId) filter.class = classId;
        if (studentId) filter.student = studentId;

        // Aggregate attendance stats per student
        const summary = await Attendance.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$student',
                    total: { $sum: 1 },
                    present: { $sum: { $cond: [{ $eq: ['$status', 'PRESENT'] }, 1, 0] } },
                    absent: { $sum: { $cond: [{ $eq: ['$status', 'ABSENT'] }, 1, 0] } },
                    late: { $sum: { $cond: [{ $eq: ['$status', 'LATE'] }, 1, 0] } },
                }
            },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            { $unwind: { path: '$student', preserveNullAndEmpty: true } },
            {
                $project: {
                    studentId: '$_id',
                    rollNo: '$student.rollNo',
                    course: '$student.course',
                    total: 1,
                    present: 1,
                    absent: 1,
                    late: 1,
                    percentage: {
                        $cond: [
                            { $gt: ['$total', 0] },
                            { $multiply: [{ $divide: ['$present', '$total'] }, 100] },
                            0
                        ]
                    }
                }
            },
            { $sort: { percentage: 1 } }
        ]);

        const totalRecords = await Attendance.countDocuments(filter);
        const presentCount = await Attendance.countDocuments({ ...filter, status: 'PRESENT' });
        const absentCount = await Attendance.countDocuments({ ...filter, status: 'ABSENT' });

        res.json({
            success: true,
            data: {
                summary,
                overall: {
                    totalRecords,
                    presentCount,
                    absentCount,
                    overallPercentage: totalRecords > 0
                        ? ((presentCount / totalRecords) * 100).toFixed(1)
                        : 0
                },
                filters: { startDate, endDate, classId, studentId }
            }
        });
    } catch (err) {
        console.error('getAttendanceReport error:', err);
        res.status(500).json({ success: false, message: 'Failed to generate attendance report', error: err.message });
    }
};

/**
 * GET /api/v1/reports/financial
 * Query params: startDate, endDate
 * Returns: fee collection summary, pending fees, revenue totals
 */
const getFinancialReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.createdAt = {};
            if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.createdAt.$lte = end;
            }
        }

        // Total payments collected
        const paymentAgg = await Payment.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: '$paymentMethod',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        const totalCollected = paymentAgg.reduce((sum, p) => sum + p.totalAmount, 0);

        // Fee status breakdown
        const feeStatusAgg = await StudentFee.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$totalAmount' },
                    paidAmount: { $sum: '$paidAmount' }
                }
            }
        ]);

        const pendingFees = feeStatusAgg.find(f => f._id === 'PENDING') || { count: 0, totalAmount: 0, paidAmount: 0 };
        const paidFees = feeStatusAgg.find(f => f._id === 'PAID') || { count: 0, totalAmount: 0, paidAmount: 0 };
        const partialFees = feeStatusAgg.find(f => f._id === 'PARTIAL') || { count: 0, totalAmount: 0, paidAmount: 0 };

        const totalStudents = await Student.countDocuments({});

        res.json({
            success: true,
            data: {
                revenue: {
                    totalCollected,
                    byPaymentMethod: paymentAgg
                },
                fees: {
                    paid: { count: paidFees.count, amount: paidFees.paidAmount },
                    pending: { count: pendingFees.count, amount: pendingFees.totalAmount - pendingFees.paidAmount },
                    partial: { count: partialFees.count, amount: partialFees.paidAmount },
                    statusBreakdown: feeStatusAgg
                },
                stats: {
                    totalStudents,
                    studentsWithFees: paidFees.count + pendingFees.count + partialFees.count
                },
                filters: { startDate, endDate }
            }
        });
    } catch (err) {
        console.error('getFinancialReport error:', err);
        res.status(500).json({ success: false, message: 'Failed to generate financial report', error: err.message });
    }
};

module.exports = { getAttendanceReport, getFinancialReport, exportAttendanceCSV, exportFinancialCSV, exportStudentsCSV };

// ─── CSV helper ─────────────────────────────────────────────────────────────
function toCSVRow(fields) {
    return fields.map(f => {
        const v = f == null ? '' : String(f);
        return v.includes(',') || v.includes('"') || v.includes('\n')
            ? `"${v.replace(/"/g, '""')}"`
            : v;
    }).join(',');
}

/**
 * GET /api/v1/reports/attendance/export
 * Downloads attendance summary as CSV
 */
const exportAttendanceCSV = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filter = {};
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) { const end = new Date(endDate); end.setHours(23, 59, 59, 999); filter.date.$lte = end; }
        }

        const AttendanceModel = Attendance.default || Attendance;
        const records = await AttendanceModel.find(filter)
            .populate('student', 'rollNo course semester')
            .sort({ date: -1 })
            .limit(2000)
            .lean();

        const headers = ['Roll No', 'Course', 'Semester', 'Date', 'Status'];
        const rows = records.map(r => toCSVRow([
            r.student?.rollNo || '—',
            r.student?.course || '—',
            r.student?.semester || '—',
            r.date ? new Date(r.date).toLocaleDateString('en-IN') : '—',
            r.status || '—',
        ]));

        const csv = [headers.join(','), ...rows].join('\n');
        const filename = `Attendance_Report_${new Date().toISOString().split('T')[0]}.csv`;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(csv);
    } catch (err) {
        console.error('exportAttendanceCSV error:', err);
        res.status(500).json({ success: false, message: 'Failed to export attendance CSV' });
    }
};

/**
 * GET /api/v1/reports/financial/export
 * Downloads payment history as CSV
 */
const exportFinancialCSV = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filter = {};
        if (startDate || endDate) {
            filter.paymentDate = {};
            if (startDate) filter.paymentDate.$gte = new Date(startDate);
            if (endDate) { const end = new Date(endDate); end.setHours(23, 59, 59, 999); filter.paymentDate.$lte = end; }
        }

        const payments = await Payment.find(filter)
            .populate({ path: 'studentId', populate: { path: 'userId', select: 'fullName' } })
            .sort({ paymentDate: -1 })
            .limit(5000)
            .lean();

        const headers = ['Receipt No', 'Student Name', 'Amount (INR)', 'Payment Method', 'Status', 'Date'];
        const rows = payments.map(p => toCSVRow([
            p.receiptNumber || p._id,
            p.studentId?.userId?.fullName || '—',
            p.amount || 0,
            p.paymentMethod || '—',
            p.status || '—',
            p.paymentDate ? new Date(p.paymentDate).toLocaleDateString('en-IN') : '—',
        ]));

        const csv = [headers.join(','), ...rows].join('\n');
        const filename = `Financial_Report_${new Date().toISOString().split('T')[0]}.csv`;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(csv);
    } catch (err) {
        console.error('exportFinancialCSV error:', err);
        res.status(500).json({ success: false, message: 'Failed to export financial CSV' });
    }
};

/**
 * GET /api/v1/reports/students/export
 * Downloads full student roster as CSV
 */
const exportStudentsCSV = async (req, res) => {
    try {
        const students = await Student.find()
            .populate('userId', 'fullName email')
            .sort({ createdAt: -1 })
            .lean();

        const headers = ['Full Name', 'Email', 'Roll No', 'Course', 'Semester', 'Section', 'Status', 'Admitted On'];
        const rows = students.map(s => toCSVRow([
            s.userId?.fullName || '—',
            s.userId?.email || '—',
            s.rollNo || '—',
            s.course || '—',
            s.semester || '—',
            s.section || '—',
            s.status || 'Active',
            s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN') : '—',
        ]));

        const csv = [headers.join(','), ...rows].join('\n');
        const filename = `Student_Roster_${new Date().toISOString().split('T')[0]}.csv`;
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.send(csv);
    } catch (err) {
        console.error('exportStudentsCSV error:', err);
        res.status(500).json({ success: false, message: 'Failed to export student CSV' });
    }
};

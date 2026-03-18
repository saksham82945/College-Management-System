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

module.exports = { getAttendanceReport, getFinancialReport };

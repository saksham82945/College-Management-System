import { Request, Response } from 'express';
import { Student } from '../models/Student';
import { Teacher } from '../models/Teacher';
import { Payment } from '../models/Payment';
import { Book } from '../models/Book';
import mongoose from 'mongoose';

export const getAdminDashboardStats = async (req: Request, res: Response) => {
    try {
        // 1. Basic Counts
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();

        // 2. Financial Stats (Current Month & Chart Data)
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        // Chart Data Aggregation (Last 6 Months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const chartDataRaw = await Payment.aggregate([
            {
                $match: {
                    paymentDate: { $gte: sixMonthsAgo },
                    status: 'COMPLETED'
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$paymentDate" },
                        year: { $year: "$paymentDate" }
                    },
                    revenue: { $sum: "$amount" },
                    students: { $addToSet: "$studentId" } // Count unique students paying
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        // Format for Recharts
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartData = chartDataRaw.map(item => ({
            name: monthNames[item._id.month - 1],
            revenue: item.revenue,
            students: item.students.length
        }));

        // Fill in missing months if needed (optional optimization)

        // Current Month Total
        const currentMonthData = chartDataRaw.find(d =>
            d._id.month === (now.getMonth() + 1) && d._id.year === now.getFullYear()
        );
        const feesCollectedCheck = currentMonthData ? currentMonthData.revenue : 0;

        // 3. Library Stats
        const dueBooks = await Book.countDocuments({ availableCopies: { $lt: 5 } }); // Mock logic for "due" or "low stock" for now

        // 4. Recent Admissions
        const recentStudents = await Student.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('userId', 'firstName lastName email') // Updated to 'userId' based on previous schema knowledge
            .lean();

        // 5. Attendance Summary (Mock for now until Attendance model populated)
        const attendanceSummary = {
            present: 85,
            absent: 15,
            leave: 5
        };

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                feesCollected: feesCollectedCheck,
                pendingFees: 45000, // Placeholder
                libraryDueBooks: dueBooks,
                attendance: attendanceSummary,
                recentAdmissions: recentStudents,
                salaryPaid: 1200000, // Placeholder
                chartData // [NEW] Return the real chart data
            }
        });

    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard statistics'
        });
    }
};

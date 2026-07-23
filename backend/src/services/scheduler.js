'use strict';
const cron = require('node-cron');

// Models and email utility — lazy-required to ensure Mongoose is connected first
let StudentFee, Student, Attendance, emailUtils, smsUtils;
const getModels = () => {
    if (!StudentFee) {
        try { StudentFee = require('../models/StudentFee'); } catch { StudentFee = null; }
        try { Student = require('../models/Student').Student; } catch { Student = null; }
        try {
            const A = require('../models/Attendance');
            Attendance = A.default || A;
        } catch { Attendance = null; }
        emailUtils = require('../utils/email');
        smsUtils = require('../utils/sms');
    }
};

// ─── Job 1: Daily fee reminders (09:00 every day) ────────────────────────────
const runFeeReminders = async () => {
    getModels();
    if (!StudentFee || !emailUtils) return;

    console.log('[Scheduler] Running daily fee reminders...');
    try {
        const overdueFees = await StudentFee.find({ status: { $in: ['PENDING', 'PARTIAL'] } })
            .populate({
                path: 'studentId',
                populate: { path: 'userId', select: 'fullName email' },
            })
            .populate('feeTypeId', 'name')
            .lean();

        let sent = 0;
        for (const fee of overdueFees) {
            const student = fee.studentId;
            if (!student?.userId) continue;

            const preferences = student.userId.preferences || { emailNotifications: true, smsNotifications: false };
            const phone = student.userId.phone;

            try {
                if (student.userId.email && preferences.emailNotifications !== false) {
                    await emailUtils.sendFeeReminderEmail(
                        {
                            name:   student.userId.fullName || 'Student',
                            email:  student.userId.email,
                            rollNo: student.rollNo || '—',
                        },
                        {
                            amount:  (fee.totalAmount || 0) - (fee.paidAmount || 0),
                            dueDate: fee.dueDate,
                            feeType: fee.feeTypeId?.name || 'General Fee',
                        }
                    );
                }
                
                if (phone && preferences.smsNotifications) {
                    await smsUtils.sendFeeReminderSms(
                        { name: student.userId.fullName || 'Student', phone },
                        {
                            amount: (fee.totalAmount || 0) - (fee.paidAmount || 0),
                            feeType: fee.feeTypeId?.name || 'General Fee',
                        }
                    );
                }
                
                sent++;
            } catch (err) {
                console.error(`[Scheduler] Fee reminder failed for ${student.userId.email || phone}:`, err.message);
            }
        }
        console.log(`[Scheduler] Fee reminders: ${sent} sent out of ${overdueFees.length} overdue.`);
    } catch (err) {
        console.error('[Scheduler] Fee reminder job error:', err.message);
    }
};

// ─── Job 2: Weekly attendance warnings (Mon 09:30) ───────────────────────────
const runAttendanceWarnings = async () => {
    getModels();
    if (!Attendance || !Student || !emailUtils) return;

    console.log('[Scheduler] Running weekly attendance warnings...');
    try {
        const students = await Student.find().populate('userId', 'fullName email').lean();
        let sent = 0;

        for (const student of students) {
            if (!student.userId) continue;
            
            const preferences = student.userId.preferences || { emailNotifications: true, smsNotifications: false };
            const phone = student.userId.phone;
            
            try {
                const [total, present] = await Promise.all([
                    Attendance.countDocuments({ student: student._id }),
                    Attendance.countDocuments({ student: student._id, status: 'PRESENT' }),
                ]);

                if (total === 0) continue;
                const pct = Math.round((present / total) * 100);
                if (pct >= 75) continue; // Only warn students below threshold

                if (student.userId.email && preferences.emailNotifications !== false) {
                    await emailUtils.sendAttendanceWarningEmail(
                        {
                            name:   student.userId.fullName,
                            email:  student.userId.email,
                            rollNo: student.rollNo || '—',
                            course: student.course || '—',
                        },
                        pct
                    );
                }
                
                if (phone && preferences.smsNotifications) {
                    await smsUtils.sendAttendanceWarningSms(
                        { name: student.userId.fullName, phone },
                        pct
                    );
                }
                sent++;
            } catch (err) {
                console.error(`[Scheduler] Attendance warning failed for ${student.userId?.email || phone}:`, err.message);
            }
        }
        console.log(`[Scheduler] Attendance warnings: ${sent} sent.`);
    } catch (err) {
        console.error('[Scheduler] Attendance warning job error:', err.message);
    }
};

// ─── Start all schedules ──────────────────────────────────────────────────────
const startScheduler = () => {
    if (process.env.NODE_ENV === 'test') {
        console.log('[Scheduler] Skipped in test environment.');
        return;
    }

    // Daily at 09:00
    cron.schedule('0 9 * * *', runFeeReminders, { timezone: 'Asia/Kolkata' });
    console.log('[Scheduler] Fee reminder job scheduled — daily at 09:00 IST');

    // Every Monday at 09:30
    cron.schedule('30 9 * * 1', runAttendanceWarnings, { timezone: 'Asia/Kolkata' });
    console.log('[Scheduler] Attendance warning job scheduled — Mondays at 09:30 IST');
};

module.exports = { startScheduler, runFeeReminders, runAttendanceWarnings };

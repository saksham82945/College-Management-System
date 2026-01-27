'use strict';
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

/**
 * GET /api/v1/attendance
 * Query params: date, studentId, classId, status
 */
const getAttendance = async (req, res) => {
    try {
        const { date, studentId, classId, status, page = 1, limit = 50 } = req.query;
        const filter = {};

        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            filter.date = { $gte: start, $lte: end };
        }
        if (studentId) filter.student = studentId;
        if (classId) filter.class = classId;
        if (status) filter.status = status;

        const skip = (Number(page) - 1) * Number(limit);
        const [records, total] = await Promise.all([
            Attendance.find(filter)
                .populate('student', 'rollNo course')
                .populate('markedBy', 'firstName lastName')
                .sort({ date: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Attendance.countDocuments(filter)
        ]);

        res.json({ data: records, total, page: Number(page), limit: Number(limit) });
    } catch (err) {
        console.error('getAttendance error:', err);
        res.status(500).json({ message: 'Failed to fetch attendance', error: err.message });
    }
};

/**
 * POST /api/v1/attendance/bulk
 * Body: { date, records: [{ studentId, status, subject, remarks }], markedBy }
 */
const markAttendanceBulk = async (req, res) => {
    try {
        const { date, records, subject = '', classId } = req.body;
        if (!records || !Array.isArray(records) || records.length === 0) {
            return res.status(400).json({ message: 'records array is required' });
        }

        const attendanceDate = date ? new Date(date) : new Date();
        const markedById = req.user?.userId;

        // Remove existing attendance for same date/subject combo
        const start = new Date(attendanceDate); start.setHours(0, 0, 0, 0);
        const end = new Date(attendanceDate); end.setHours(23, 59, 59, 999);

        const studentIds = records.map(r => r.studentId);
        await Attendance.deleteMany({
            student: { $in: studentIds },
            date: { $gte: start, $lte: end },
            subject
        });

        const docs = records.map(r => ({
            student: r.studentId,
            class: classId || null,
            subject,
            date: attendanceDate,
            status: r.status || 'PRESENT',
            markedBy: markedById,
            remarks: r.remarks || ''
        }));

        const saved = await Attendance.insertMany(docs);
        res.status(201).json({ message: 'Attendance marked successfully', count: saved.length });
    } catch (err) {
        console.error('markAttendanceBulk error:', err);
        res.status(500).json({ message: 'Failed to mark attendance', error: err.message });
    }
};

/**
 * POST /api/v1/attendance
 * Body: single record
 */
const markAttendance = async (req, res) => {
    try {
        const { studentId, date, status, subject, remarks, classId } = req.body;
        if (!studentId || !status) {
            return res.status(400).json({ message: 'studentId and status are required' });
        }

        const record = await Attendance.create({
            student: studentId,
            class: classId || null,
            subject: subject || '',
            date: date ? new Date(date) : new Date(),
            status,
            markedBy: req.user?.userId,
            remarks: remarks || ''
        });

        res.status(201).json({ message: 'Attendance recorded', data: record });
    } catch (err) {
        console.error('markAttendance error:', err);
        res.status(500).json({ message: 'Failed to record attendance', error: err.message });
    }
};

/**
 * GET /api/v1/attendance/summary/:studentId
 */
const getStudentAttendanceSummary = async (req, res) => {
    try {
        const { studentId } = req.params;
        const total = await Attendance.countDocuments({ student: studentId });
        const present = await Attendance.countDocuments({ student: studentId, status: 'PRESENT' });
        const absent = await Attendance.countDocuments({ student: studentId, status: 'ABSENT' });
        const late = await Attendance.countDocuments({ student: studentId, status: 'LATE' });

        res.json({
            studentId,
            total,
            present,
            absent,
            late,
            percentage: total > 0 ? ((present / total) * 100).toFixed(1) : 0
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get summary', error: err.message });
    }
};

/**
 * PUT /api/v1/attendance/:id
 */
const updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Record not found' });
        res.json({ message: 'Updated', data: updated });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update', error: err.message });
    }
};

/**
 * DELETE /api/v1/attendance/:id
 */
const deleteAttendance = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete', error: err.message });
    }
};

module.exports = { getAttendance, markAttendance, markAttendanceBulk, getStudentAttendanceSummary, updateAttendance, deleteAttendance };

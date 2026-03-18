'use strict';
const express = require('express');
const { getAttendanceReport, getFinancialReport } = require('../controllers/report');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

// GET /api/v1/reports/attendance - Attendance report
// Access: Admin, Teacher
router.get('/attendance', roleMiddleware(['ADMIN', 'TEACHER']), getAttendanceReport);

// GET /api/v1/reports/financial - Financial revenue report
// Access: Admin only
router.get('/financial', roleMiddleware(['ADMIN']), getFinancialReport);

module.exports = router;

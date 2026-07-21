'use strict';
const express = require('express');
const {
    getAttendanceReport, getFinancialReport,
    exportAttendanceCSV, exportFinancialCSV, exportStudentsCSV
} = require('../controllers/report');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

// JSON reports
router.get('/attendance', roleMiddleware(['ADMIN', 'TEACHER']), getAttendanceReport);
router.get('/financial', roleMiddleware(['ADMIN']), getFinancialReport);

// CSV exports
router.get('/attendance/export', roleMiddleware(['ADMIN', 'TEACHER']), exportAttendanceCSV);
router.get('/financial/export', roleMiddleware(['ADMIN']), exportFinancialCSV);
router.get('/students/export', roleMiddleware(['ADMIN']), exportStudentsCSV);

module.exports = router;

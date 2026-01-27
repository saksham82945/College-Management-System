'use strict';
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
    getAttendance,
    markAttendance,
    markAttendanceBulk,
    getStudentAttendanceSummary,
    updateAttendance,
    deleteAttendance
} = require('../controllers/attendance');

// All attendance routes require authentication
router.use(authMiddleware);

router.get('/', getAttendance);
router.post('/', roleMiddleware(['ADMIN', 'TEACHER']), markAttendance);
router.post('/bulk', roleMiddleware(['ADMIN', 'TEACHER']), markAttendanceBulk);
router.get('/summary/:studentId', getStudentAttendanceSummary);
router.put('/:id', roleMiddleware(['ADMIN', 'TEACHER']), updateAttendance);
router.delete('/:id', roleMiddleware(['ADMIN']), deleteAttendance);

module.exports = router;

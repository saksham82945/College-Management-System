const express = require('express');
const { getExams, createExam, deleteExam } = require('../controllers/exam');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(authMiddleware, getExams)
    .post(authMiddleware, roleMiddleware(['ADMIN', 'TEACHER']), createExam);

router
    .route('/:id')
    .delete(authMiddleware, roleMiddleware(['ADMIN', 'TEACHER']), deleteExam);

module.exports = router;



import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { getDashboardStats, getAttendanceReport, getFeeReport } from '../controllers/report';

const router = express.Router();

router.get('/dashboard-stats', authMiddleware, getDashboardStats);
router.get('/attendance', authMiddleware, roleMiddleware(['ADMIN']), getAttendanceReport);
router.get('/fees', authMiddleware, roleMiddleware(['ADMIN']), getFeeReport);

export default router;

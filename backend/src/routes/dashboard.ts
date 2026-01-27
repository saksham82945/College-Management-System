import express from 'express';
import { getAdminDashboardStats } from '../controllers/dashboard';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = express.Router();

// Protected route for Admin only
router.get(
    '/admin',
    authMiddleware,
    roleMiddleware(['ADMIN']),
    getAdminDashboardStats
);

export default router;

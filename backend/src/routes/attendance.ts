import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import {
  markAttendance,
  getAttendance,
  getStudentAttendance
} from '../controllers/attendance';

const router = express.Router();

router.post('/mark', authMiddleware, roleMiddleware(['TEACHER', 'ADMIN']), markAttendance);
router.get('/', authMiddleware, getAttendance);
router.get('/student/:studentId', authMiddleware, getStudentAttendance);

export default router;

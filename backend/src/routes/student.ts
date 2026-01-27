import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  promoteStudent,
  getStudentFullProfile,
} from '../controllers/student';

const router = express.Router();

router.get('/', authMiddleware, getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.post('/', authMiddleware, roleMiddleware(['ADMIN']), createStudent);
router.patch('/:id', authMiddleware, roleMiddleware(['ADMIN']), updateStudent);
router.delete('/:id', authMiddleware, roleMiddleware(['ADMIN']), deleteStudent);
router.post('/promote/:id', authMiddleware, roleMiddleware(['ADMIN']), promoteStudent);
router.get('/:id/full-profile', authMiddleware, getStudentFullProfile);

export default router;

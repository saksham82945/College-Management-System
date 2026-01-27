import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from '../controllers/teacher';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(['ADMIN']), createTeacher);
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), getAllTeachers);
router.get('/:id', authMiddleware, getTeacherById);
router.put('/:id', authMiddleware, roleMiddleware(['ADMIN']), updateTeacher);
router.delete('/:id', authMiddleware, roleMiddleware(['ADMIN']), deleteTeacher);

export default router;

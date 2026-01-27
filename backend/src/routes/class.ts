import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import { createClass, getAllClasses, getClassById, updateClass, deleteClass } from '../controllers/class';

const router = express.Router();

router.get('/', authMiddleware, getAllClasses);
router.get('/:id', authMiddleware, getClassById);
router.post('/', authMiddleware, roleMiddleware(['ADMIN']), createClass);
router.put('/:id', authMiddleware, roleMiddleware(['ADMIN']), updateClass);
router.delete('/:id', authMiddleware, roleMiddleware(['ADMIN']), deleteClass);

export default router;

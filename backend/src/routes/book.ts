import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/book';

const router = express.Router();

router.get('/', authMiddleware, getAllBooks);
router.get('/:id', authMiddleware, getBookById);
router.post('/', authMiddleware, roleMiddleware(['ADMIN']), createBook);
router.patch('/:id', authMiddleware, roleMiddleware(['ADMIN']), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware(['ADMIN']), deleteBook);

export default router;

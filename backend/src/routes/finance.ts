import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import {
  getStudentFees,
  processPayment,
  getReceipt,
  getPaymentHistory,
  createFeeType,
  getAllFeeTypes,
  assignFeeToClass,
} from '../controllers/finance';

const router = express.Router();

router.get('/student/:studentId', authMiddleware, getStudentFees);
router.get('/receipt/:id', authMiddleware, getReceipt);
router.get('/payment-history/:studentId', authMiddleware, getPaymentHistory);
router.post('/structure', authMiddleware, roleMiddleware(['ADMIN']), createFeeType); // Added
router.get('/structure', authMiddleware, getAllFeeTypes);
router.post('/assign-class', authMiddleware, roleMiddleware(['ADMIN']), assignFeeToClass); // Added
router.post('/pay', authMiddleware, processPayment);

export default router;

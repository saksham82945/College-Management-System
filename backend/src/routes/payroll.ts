import express from 'express';
import { authMiddleware, roleMiddleware } from '../middleware/auth';
import {
  getSalarySheet,
  getPayslip,
  processMonthlySalary,
  processSalaryPayment,
} from '../controllers/payroll';

const router = express.Router();

router.get('/sheet', authMiddleware, roleMiddleware(['ADMIN']), getSalarySheet);
router.get('/payslip/:id', authMiddleware, getPayslip);
router.post('/process', authMiddleware, roleMiddleware(['ADMIN']), processMonthlySalary);
router.post('/payment', authMiddleware, roleMiddleware(['ADMIN']), processSalaryPayment);

export default router;

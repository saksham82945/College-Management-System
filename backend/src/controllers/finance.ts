import { Response, Request } from 'express';
import { StudentFee } from '../models/StudentFee';
import { Payment } from '../models/Payment';
import { Receipt } from '../models/Receipt';
import { AppError } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';
import { FeeType } from '../models/FeeType';
import { Student } from '../models/Student';

export const getStudentFees = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const fees = await StudentFee.find({ studentId })
      .populate('feeTypeId')
      .lean();

    const totalPending = fees
      .filter((f: any) => f.status !== 'paid')
      .reduce((sum, f: any) => sum + (f.amountDue - f.amountPaid), 0);

    res.json({
      data: {
        fees,
        totalPending,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { studentId, feeTypeId, amount, paymentMethod, transactionRef } = req.body;

    // Validate payment
    const studentFee = await StudentFee.findOne({ studentId, feeTypeId });
    if (!studentFee) {
      throw new AppError('Fee record not found', 404, 'FEE_NOT_FOUND');
    }

    // Create payment record
    const payment = await Payment.create({
      studentId,
      amount,
      feeTypeId,
      paymentMethod,
      transactionRef,
      status: 'success',
      paidAt: new Date(),
    });

    // Update fee status
    studentFee.amountPaid += amount;
    if (studentFee.amountPaid >= studentFee.amountDue) {
      studentFee.status = 'paid';
    } else {
      studentFee.status = 'partial';
    }
    await studentFee.save();

    // Create receipt
    const receipt = await Receipt.create({
      receiptNo: `RCP-${uuidv4().slice(0, 8)}`,
      studentId,
      paymentIds: [payment._id],
      totalAmount: amount,
      feeDetails: [{ feeTypeId, amount }],
      paymentMethod,
    });

    res.status(201).json({
      message: 'Payment processed successfully',
      data: {
        paymentId: payment._id,
        receiptId: receipt._id,
        receiptNo: receipt.receiptNo,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getReceipt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const receipt = await Receipt.findById(id)
      .populate('studentId')
      .populate('paymentIds')
      .lean();

    if (!receipt) {
      throw new AppError('Receipt not found', 404, 'RECEIPT_NOT_FOUND');
    }

    res.json({ data: receipt });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

// The user provided 'EndLine: 145'. 
// I will rewrite the file content essentially to just ADD these functions at the end effectively, or I can try to replace the last closing bracket if there is one? No, exports are named.
// I will use `replace_file_content` targeting the end of the file.
// Wait, `replace_file_content` replaces a specific text block. I can match the last export and append after it.

// Let's retry the strategy: Append by replacing the last export method with itself + new methods.

export const getPaymentHistory = async (req: Request, res: Response) => {
  // ... (existing implementation of getPaymentHistory)
  try {
    const { studentId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 25;
    const skip = (page - 1) * size;

    const payments = await Payment.find({ studentId, status: 'success' })
      .populate('feeTypeId')
      .skip(skip)
      .limit(size)
      .sort({ paidAt: -1 })
      .lean();

    const total = await Payment.countDocuments({ studentId, status: 'success' });

    res.json({
      data: {
        total,
        page,
        size,
        payments: payments.map((p: any) => ({
          id: p._id,
          amount: p.amount,
          paymentMethod: p.paymentMethod,
          paidAt: p.paidAt,
          transactionRef: p.transactionRef,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// NEW METHODS
export const createFeeType = async (req: Request, res: Response) => {
  // ... implementation
  try {
    const { name, amount, frequency, description, isOptional } = req.body;
    const code = name.toUpperCase().replace(/\s+/g, '_') + '_' + new Date().getFullYear();

    const feeType = await FeeType.create({
      code,
      name,
      amount,
      frequency,
      description,
      isOptional
    });

    res.status(201).json({ success: true, data: feeType });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create fee type' });
  }
};

export const getAllFeeTypes = async (req: Request, res: Response) => {
  try {
    const feeTypes = await FeeType.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feeTypes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch fee types' });
  }
};

export const assignFeeToClass = async (req: Request, res: Response) => {
  // const session = await import('mongoose').then(m => m.default.startSession());
  // session.startTransaction();
  try {
    const { classId, feeTypeId, dueDate } = req.body;

    const feeType = await FeeType.findById(feeTypeId);
    if (!feeType) throw new AppError('Fee Type not found', 404, 'NOT_FOUND');

    const students = await Student.find({ classId, status: 'active' });

    const feeRecords = students.map(student => ({
      studentId: student._id,
      feeTypeId,
      amountDue: feeType.amount,
      dueDate: new Date(dueDate),
      status: 'unpaid'
    }));

    if (feeRecords.length > 0) {
      await StudentFee.insertMany(feeRecords);
    }

    // await session.commitTransaction();
    res.json({ success: true, message: `Assigned fee to ${feeRecords.length} students` });

  } catch (error) {
    // await session.abortTransaction();
    console.error(error);
    res.status(500).json({ message: 'Failed to assign fees' });
  } finally {
    // session.endSession();
  }
};

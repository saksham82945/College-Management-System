import { Response, Request } from 'express';
import { Salary } from '../models/Salary';
import { SalaryPayment } from '../models/SalaryPayment';
import { Teacher } from '../models/Teacher';
import { AppError } from '../utils/errors';
import { v4 as uuidv4 } from 'uuid';

export const getSalarySheet = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    const salaries = await Salary.find({
      month: month as string,
      year: parseInt(year as string),
    })
      .populate('teacherId', 'employeeNo')
      .populate('earnings.componentId')
      .populate('deductions.componentId')
      .lean();

    res.json({
      data: {
        month,
        year,
        salaries,
        totalSalaries: salaries.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayslip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const salary = await Salary.findById(id)
      .populate('teacherId')
      .populate('earnings.componentId')
      .populate('deductions.componentId')
      .lean();

    if (!salary) {
      throw new AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
    }

    res.json({ data: salary });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const processMonthlySalary = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.body;

    // Get all active teachers
    const teachers = await Teacher.find({ status: 'active' });

    const salaryRecords = [];

    for (const teacher of teachers) {
      // Calculate salary (simplified - add your business logic)
      const basicSalary = teacher.salary?.base || 50000;
      const totalEarnings = basicSalary;
      const totalDeductions = 0;
      const netSalary = totalEarnings - totalDeductions;

      const salary = await Salary.create({
        teacherId: teacher._id,
        month,
        year,
        basicSalary,
        earnings: [],
        deductions: [],
        totalEarnings,
        totalDeductions,
        netSalary,
        status: 'approved',
      });

      salaryRecords.push(salary);
    }

    res.status(201).json({
      message: 'Monthly salaries processed successfully',
      data: {
        count: salaryRecords.length,
        month,
        year,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const processSalaryPayment = async (req: Request, res: Response) => {
  try {
    const { salaryId, paymentMethod, bankDetails } = req.body;

    const salary = await Salary.findById(salaryId);
    if (!salary) {
      throw new AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
    }

    const payment = await SalaryPayment.create({
      salaryId,
      teacherId: salary.teacherId,
      amount: salary.netSalary,
      paymentMethod,
      bankDetails,
      transactionRef: `TXN-${uuidv4().slice(0, 8)}`,
      status: 'completed',
      paidAt: new Date(),
    });

    // Update salary status
    salary.status = 'paid';
    await salary.save();

    res.status(201).json({
      message: 'Salary payment processed successfully',
      data: {
        paymentId: payment._id,
        transactionRef: payment.transactionRef,
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

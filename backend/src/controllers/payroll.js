"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSalaryPayment = exports.processMonthlySalary = exports.getPayslip = exports.getSalarySheet = void 0;
const Salary_1 = require("../models/Salary");
const SalaryPayment_1 = require("../models/SalaryPayment");
const Teacher_1 = require("../models/Teacher");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
const getSalarySheet = async (req, res) => {
    try {
        const { month, year } = req.query;
        const salaries = await Salary_1.Salary.find({
            month: month,
            year: parseInt(year),
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
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getSalarySheet = getSalarySheet;
const getPayslip = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary_1.Salary.findById(id)
            .populate('teacherId')
            .populate('earnings.componentId')
            .populate('deductions.componentId')
            .lean();
        if (!salary) {
            throw new errors_1.AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
        }
        res.json({ data: salary });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getPayslip = getPayslip;
const processMonthlySalary = async (req, res) => {
    var _a;
    try {
        const { month, year } = req.body;
        // Get all active teachers
        const teachers = await Teacher_1.Teacher.find({ status: 'active' });
        const salaryRecords = [];
        for (const teacher of teachers) {
            // Calculate salary (simplified - add your business logic)
            const basicSalary = ((_a = teacher.salary) === null || _a === void 0 ? void 0 : _a.base) || 50000;
            const totalEarnings = basicSalary;
            const totalDeductions = 0;
            const netSalary = totalEarnings - totalDeductions;
            const salary = await Salary_1.Salary.create({
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
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.processMonthlySalary = processMonthlySalary;
const processSalaryPayment = async (req, res) => {
    try {
        const { salaryId, paymentMethod, bankDetails } = req.body;
        const salary = await Salary_1.Salary.findById(salaryId);
        if (!salary) {
            throw new errors_1.AppError('Salary record not found', 404, 'SALARY_NOT_FOUND');
        }
        const payment = await SalaryPayment_1.SalaryPayment.create({
            salaryId,
            teacherId: salary.teacherId,
            amount: salary.netSalary,
            paymentMethod,
            bankDetails,
            transactionRef: `TXN-${(0, uuid_1.v4)().slice(0, 8)}`,
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
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.processSalaryPayment = processSalaryPayment;

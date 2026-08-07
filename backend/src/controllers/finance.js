"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFeeToClass = exports.getAllFeeTypes = exports.createFeeType = exports.getPaymentHistory = exports.downloadReceiptPDF = exports.getReceipt = exports.processPayment = exports.getStudentFees = void 0;
const StudentFee_1 = require("../models/StudentFee");
const Payment_1 = require("../models/Payment");
const Receipt_1 = require("../models/Receipt");
const errors_1 = require("../utils/errors");
const uuid_1 = require("uuid");
const FeeType_1 = require("../models/FeeType");
const Student_1 = require("../models/Student");
const pdf_1 = require("../utils/pdf");
const email_1 = require("../utils/email");
const sms_1 = require("../utils/sms");
const getStudentFees = async (req, res) => {
    try {
        const { studentId } = req.params;
        const fees = await StudentFee_1.StudentFee.find({ studentId })
            .populate('feeTypeId')
            .lean();
        const totalPending = fees
            .filter((f) => f.status !== 'paid')
            .reduce((sum, f) => sum + (f.amountDue - f.amountPaid), 0);
        res.json({
            data: {
                fees,
                totalPending,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getStudentFees = getStudentFees;
const processPayment = async (req, res) => {
    try {
        const { studentId, feeTypeId, amount, paymentMethod, transactionRef } = req.body;
        // Validate payment
        const studentFee = await StudentFee_1.StudentFee.findOne({ studentId, feeTypeId });
        if (!studentFee) {
            throw new errors_1.AppError('Fee record not found', 404, 'FEE_NOT_FOUND');
        }
        // Create payment record
        const payment = await Payment_1.Payment.create({
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
        }
        else {
            studentFee.status = 'partial';
        }
        await studentFee.save();
        // Create receipt
        const receipt = await Receipt_1.Receipt.create({
            receiptNo: `RCP-${(0, uuid_1.v4)().slice(0, 8)}`,
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
exports.processPayment = processPayment;
const getReceipt = async (req, res) => {
    try {
        const { id } = req.params;
        const receipt = await Receipt_1.Receipt.findById(id)
            .populate('studentId')
            .populate('paymentIds')
            .lean();
        if (!receipt) {
            throw new errors_1.AppError('Receipt not found', 404, 'RECEIPT_NOT_FOUND');
        }
        res.json({ data: receipt });
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
exports.getReceipt = getReceipt;
const getPaymentHistory = async (req, res) => {
    try {
        const { studentId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 25;
        const skip = (page - 1) * size;
        const payments = await Payment_1.Payment.find({ studentId, status: 'success' })
            .populate('feeTypeId')
            .skip(skip)
            .limit(size)
            .sort({ paidAt: -1 })
            .lean();
        const total = await Payment_1.Payment.countDocuments({ studentId, status: 'success' });
        res.json({
            data: {
                total,
                page,
                size,
                payments: payments.map((p) => ({
                    id: p._id,
                    amount: p.amount,
                    paymentMethod: p.paymentMethod,
                    paidAt: p.paidAt,
                    transactionRef: p.transactionRef,
                })),
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPaymentHistory = getPaymentHistory;
const createFeeType = async (req, res) => {
    try {
        const { name, amount, frequency, description, isOptional } = req.body;
        const code = name.toUpperCase().replace(/\s+/g, '_') + '_' + new Date().getFullYear();
        const feeType = await FeeType_1.FeeType.create({
            code,
            name,
            amount,
            frequency,
            description,
            isOptional
        });
        res.status(201).json({ success: true, data: feeType });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create fee type' });
    }
};
exports.createFeeType = createFeeType;
const getAllFeeTypes = async (req, res) => {
    try {
        const feeTypes = await FeeType_1.FeeType.find().sort({ createdAt: -1 });
        res.json({ success: true, data: feeTypes });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch fee types' });
    }
};
exports.getAllFeeTypes = getAllFeeTypes;
const assignFeeToClass = async (req, res) => {
    try {
        const { classId, feeTypeId, dueDate } = req.body;
        const feeType = await FeeType_1.FeeType.findById(feeTypeId);
        if (!feeType)
            throw new errors_1.AppError('Fee Type not found', 404, 'NOT_FOUND');
        const students = await Student_1.Student.find({ classId, status: 'active' }).populate('userId');
        const feeRecords = students.map(student => ({
            studentId: student._id,
            feeTypeId,
            amountDue: feeType.amount,
            dueDate: new Date(dueDate),
            status: 'unpaid'
        }));
        if (feeRecords.length > 0) {
            await StudentFee_1.StudentFee.insertMany(feeRecords);
            
            // Send notifications asynchronously
            students.forEach(student => {
                const user = student.userId;
                if (user) {
                    const notifyData = { name: user.fullName, email: user.email, phone: user.phone, rollNo: student.rollNo };
                    const feeInfo = { amount: feeType.amount, dueDate, feeType: feeType.name };
                    
                    email_1.sendFeeReminderEmail(notifyData, feeInfo).catch(err => console.error(err));
                    sms_1.sendFeeReminderSms(notifyData, feeInfo).catch(err => console.error(err));
                    sms_1.sendFeeReminderWhatsApp(notifyData, feeInfo).catch(err => console.error(err));
                }
            });
        }
        res.json({ success: true, message: `Assigned fee to ${feeRecords.length} students` });
    }
    catch (error) {
        console.error('[Finance] Assign fee to class error:', error.message);
        res.status(500).json({ message: 'Failed to assign fees' });
    }
};
exports.assignFeeToClass = assignFeeToClass;

// ─── PDF Download: Fee Receipt ────────────────────────────────────────────────
const downloadReceiptPDF = async (req, res) => {
    try {
        const { id } = req.params;
        const receipt = await Receipt_1.Receipt.findById(id)
            .populate({
                path: 'studentId',
                populate: { path: 'userId', select: 'fullName email phone' },
            })
            .populate('paymentIds')
            .populate('feeDetails.feeTypeId', 'name')
            .lean();

        if (!receipt) {
            throw new errors_1.AppError('Receipt not found', 404, 'RECEIPT_NOT_FOUND');
        }

        const studentName = receipt.studentId?.userId?.fullName || 'Student';
        const safeReceiptNo = (receipt.receiptNo || id).replace(/[^a-zA-Z0-9-]/g, '_');
        const filename = `FeeReceipt_${safeReceiptNo}.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Cache-Control', 'no-cache');

        const pdfDoc = (0, pdf_1.generateFeeReceiptPDF)(receipt);
        pdfDoc.pipe(res);
    } catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('[Finance PDF] Error:', error.message);
            res.status(500).json({ message: 'Failed to generate receipt PDF' });
        }
    }
};
exports.downloadReceiptPDF = downloadReceiptPDF;


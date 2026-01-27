import mongoose from 'mongoose';

const salaryPaymentSchema = new mongoose.Schema(
  {
    salaryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Salary',
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['bank_transfer', 'cheque', 'cash'],
      required: true,
    },
    bankDetails: {
      accountNumber: String,
      bankName: String,
      ifscCode: String,
    },
    transactionRef: String,
    paidAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Indexes
salaryPaymentSchema.index({ teacherId: 1 });
salaryPaymentSchema.index({ status: 1 });

export const SalaryPayment = mongoose.model('SalaryPayment', salaryPaymentSchema);

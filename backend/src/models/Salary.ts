import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    basicSalary: {
      type: Number,
      required: true,
    },
    earnings: [
      {
        componentId: mongoose.Schema.Types.ObjectId,
        amount: Number,
      },
    ],
    deductions: [
      {
        componentId: mongoose.Schema.Types.ObjectId,
        amount: Number,
      },
    ],
    totalEarnings: {
      type: Number,
    },
    totalDeductions: {
      type: Number,
    },
    netSalary: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['draft', 'approved', 'processed', 'paid'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

// Indexes
salarySchema.index({ teacherId: 1, month: 1, year: 1 });
salarySchema.index({ status: 1 });

export const Salary = mongoose.model('Salary', salarySchema);

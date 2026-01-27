import mongoose from 'mongoose';

const studentFeeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    feeTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeType',
      required: true,
    },
    amountDue: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['unpaid', 'partial', 'paid', 'overdue'],
      default: 'unpaid',
    },
    concession: {
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
      },
      value: Number,
      reason: String,
    },
    late_fee: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes
studentFeeSchema.index({ studentId: 1 });
studentFeeSchema.index({ status: 1 });

export const StudentFee = mongoose.model('StudentFee', studentFeeSchema);

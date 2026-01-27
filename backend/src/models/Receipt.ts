import mongoose from 'mongoose';

const receiptSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      unique: true,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    paymentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    feeDetails: [
      {
        feeTypeId: mongoose.Schema.Types.ObjectId,
        amount: Number,
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: String,
    status: {
      type: String,
      enum: ['issued', 'downloaded', 'printed'],
      default: 'issued',
    },
  },
  { timestamps: true }
);

// Indexes
receiptSchema.index({ studentId: 1 });
receiptSchema.index({ receiptNo: 1 });

export const Receipt = mongoose.model('Receipt', receiptSchema);

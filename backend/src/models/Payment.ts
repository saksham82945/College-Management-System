import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    feeTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeType',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'bank_transfer', 'cash'],
      required: true,
    },
    transactionRef: {
      type: String,
      unique: true,
    },
    gatewayResponse: mongoose.Schema.Types.Mixed,
    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'refunded'],
      default: 'pending',
    },
    paidAt: {
      type: Date,
    },
    receiptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipt',
    },
  },
  { timestamps: true }
);

// Indexes
paymentSchema.index({ studentId: 1 });
paymentSchema.index({ transactionRef: 1 });
paymentSchema.index({ status: 1 });

export const Payment = mongoose.model('Payment', paymentSchema);

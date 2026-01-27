import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    copyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BookCopy',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    loanedAt: {
      type: Date,
      default: Date.now,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
    },
    fineAmount: {
      type: Number,
      default: 0,
    },
    finePaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'returned', 'overdue'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Indexes
loanSchema.index({ userId: 1 });
loanSchema.index({ copyId: 1 });
loanSchema.index({ status: 1 });

export const Loan = mongoose.model('Loan', loanSchema);

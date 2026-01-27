import mongoose from 'mongoose';

const bookCopySchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    barcode: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'issued', 'damaged', 'lost'],
      default: 'available',
    },
    acquisitionDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Indexes
bookCopySchema.index({ bookId: 1 });
bookCopySchema.index({ barcode: 1 });
bookCopySchema.index({ status: 1 });

export const BookCopy = mongoose.model('BookCopy', bookCopySchema);

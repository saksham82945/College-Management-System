import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    copiesTotal: {
      type: Number,
      required: true,
    },
    copiesAvailable: {
      type: Number,
      required: true,
    },
    publicationYear: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Indexes
bookSchema.index({ isbn: 1 });
bookSchema.index({ title: 1 });

export const Book = mongoose.model('Book', bookSchema);

import mongoose from 'mongoose';

const feeTypeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    frequency: {
      type: String,
      enum: ['one-time', 'yearly', 'semester', 'monthly'],
      required: true,
    },
    description: {
      type: String,
    },
    isOptional: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const FeeType = mongoose.model('FeeType', feeTypeSchema);

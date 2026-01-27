import mongoose from 'mongoose';

const salaryComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['earning', 'deduction'],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const SalaryComponent = mongoose.model('SalaryComponent', salaryComponentSchema);

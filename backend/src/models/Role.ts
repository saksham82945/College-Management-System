import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      enum: ['ADMIN', 'TEACHER', 'STUDENT', 'STAFF'],
    },
    description: {
      type: String,
    },
    permissions: [String],
  },
  { timestamps: true }
);

export const Role = mongoose.model('Role', roleSchema);

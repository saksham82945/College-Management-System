import mongoose from 'mongoose';

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    studentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Compound index for unique class per academic year
classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

export const Class = mongoose.model('Class', classSchema);

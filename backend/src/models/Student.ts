import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parent',
    },
    rollNo: {
      type: String,
      unique: true,
      required: true,
    },
    enrollmentYear: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
      enum: ['BCA', 'BBA', 'MBA', 'MCA', 'BSc IT'], // Optional: Add enum for strictness, but string is flexible
    },
    section: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    guardianInfo: {
      fatherName: String,
      motherName: String,
      fatherPhone: String,
      motherPhone: String,
      emergencyContact: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'graduated', 'suspended'],
      default: 'active',
    },
    academicRecords: [
      {
        examId: mongoose.Schema.Types.ObjectId,
        marks: Number,
        grade: String,
      },
    ],
  },
  { timestamps: true }
);

// Indexes
studentSchema.index({ rollNo: 1 });
studentSchema.index({ course: 1 });
studentSchema.index({ userId: 1 });

export const Student = mongoose.model('Student', studentSchema);

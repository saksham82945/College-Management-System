import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
    date: {
      type: Date,
      required: true,
    },
    attendanceEntries: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
          required: true,
        },
        status: {
          type: String,
          enum: ['present', 'absent', 'late'],
          required: true,
        },
        remarks: String,
      },
    ],
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Indexes
attendanceRecordSchema.index({ classId: 1, date: 1 });
attendanceRecordSchema.index({ 'attendanceEntries.studentId': 1 });

export const AttendanceRecord = mongoose.model('AttendanceRecord', attendanceRecordSchema);

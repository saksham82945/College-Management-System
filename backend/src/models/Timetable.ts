import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    schedule: [
      {
        day: {
          type: String,
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        periods: [
          {
            periodNo: Number,
            startTime: String,
            endTime: String,
            subjectId: mongoose.Schema.Types.ObjectId,
            teacherId: mongoose.Schema.Types.ObjectId,
            room: String,
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  { timestamps: true }
);

// Indexes
timetableSchema.index({ classId: 1, academicYear: 1 });

export const Timetable = mongoose.model('Timetable', timetableSchema);

import mongoose from 'mongoose';

const examSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    academicYear: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'ongoing', 'completed'],
      default: 'draft',
    },
    exams: [
      {
        classId: mongoose.Schema.Types.ObjectId,
        subjectId: mongoose.Schema.Types.ObjectId,
        examDate: Date,
        examTime: String,
        totalMarks: Number,
        passingMarks: Number,
      },
    ],
  },
  { timestamps: true }
);

export const ExamSession = mongoose.model('ExamSession', examSessionSchema);

import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema(
  {
    examSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamSession',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pass', 'fail'],
    },
    publishedAt: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes
examResultSchema.index({ studentId: 1 });
examResultSchema.index({ examSessionId: 1 });

export const ExamResult = mongoose.model('ExamResult', examResultSchema);

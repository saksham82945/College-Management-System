import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  qualification: {
    type: [String],
    required: true,
  },
  experience: {
    type: Number, // In years
    default: 0,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  subjects: [{
    type: String, // Can be refined to Subject model references later
  }],
  salary: {
    base: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ['active', 'on_leave', 'resigned', 'terminated'],
    default: 'active',
  },
  contactInfo: {
    phone: String,
    address: String,
  }
}, {
  timestamps: true,
});

export const Teacher = mongoose.model('Teacher', teacherSchema);

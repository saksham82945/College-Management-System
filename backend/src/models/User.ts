import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: false,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    avatar: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    roleAssignments: [
      {
        roleId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Role',
        },
        scopeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Class',
        },
        assignedAt: {
          type: Date,
          default: Date.now,
        },
        assignedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    teacherProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    studentProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  },
  { timestamps: true }
);

// Index for email
userSchema.index({ email: 1 });

export const User = mongoose.model('User', userSchema);

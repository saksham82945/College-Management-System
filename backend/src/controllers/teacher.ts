import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { Teacher } from '../models/Teacher';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/errors';

export const createTeacher = async (req: Request, res: Response) => {
  // Transaction removed for standalone support
  // const session = await mongoose.startSession();
  // session.startTransaction();

  try {
    const {
      firstName, lastName, email,
      employeeId, department, designation, qualification, experience, joiningDate, salary,
      contactInfo
    } = req.body;

    console.log('CREATE TEACHER BODY:', JSON.stringify(req.body, null, 2));

    // 1. Create User
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Email already in use', 400, 'EMAIL_EXISTS');
    }

    // Get Teacher Role
    const teacherRole = await Role.findOne({ name: 'TEACHER' });
    if (!teacherRole) {
      throw new AppError('Teacher role configuration missing', 500, 'ROLE_CONFIG_ERROR');
    }

    const passwordToUse = req.body.password || 'Teacher@123';
    const hashedPassword = await bcrypt.hash(passwordToUse, 10);

    const user = await User.create([{
      firstName,
      lastName,
      email,
      password: hashedPassword,
      fullName: `${firstName} ${lastName}`,
      phone: contactInfo?.phone || req.body.phone,
      roleAssignments: [{
        roleId: teacherRole._id,
        assignedAt: new Date()
      }],
      username: email.split('@')[0],
    }]);

    // 2. Create Teacher Profile
    const teacher = await Teacher.create([{
      userId: user[0]._id,
      employeeId,
      department,
      designation,
      qualification: Array.isArray(qualification) ? qualification : [qualification],
      experience: Number(experience),
      joiningDate: new Date(joiningDate),
      salary: typeof salary === 'number' || typeof salary === 'string'
        ? { base: Number(salary), allowances: 0, deductions: 0 }
        : salary,
      contactInfo: contactInfo || {
        phone: req.body.phone,
        address: req.body.address
      }
    }]);

    // await session.commitTransaction();

    res.status(201).json({
      success: true,
      data: {
        teacher: teacher[0],
        user: user[0]
      }
    });

  } catch (error) {
    // Manual rollback since transactions are disabled
    // If we have a user object created in this scope (from line 36), try to delete it
    // We need to check if 'user' variable is available. Since it's block scoped, we might need to move declaration up
    // However, user is defined in try block. Let's move let user; up.
    // For now, simpler: we can't easily access 'user' here due to scope. 
    // BUT, we can catch the error and do a best-effort cleanup if we can identify the user.
    // Better strategy: move `user` declaration outside try, or just use the email to cleanup.

    // Only perform rollback if the error is NOT that the user already exists
    // This prevents deleting an unrelated existing user when we try to create a duplicate
    const isEmailExistsError = error instanceof AppError && error.errorCode === 'EMAIL_EXISTS';
    if (req.body.email && !isEmailExistsError) {
      await User.deleteOne({ email: req.body.email }).catch(err => console.error('Rollback failed', err));
    }

    // await session.abortTransaction();
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error('Create Teacher Error:', error);
      res.status(500).json({ message: 'Failed to create teacher' });
    }
  } finally {
    // session.endSession();
  }
};

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId', '-password')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teachers' });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate('userId', '-password');
    if (!teacher) throw new AppError('Teacher not found', 404, 'NOT_FOUND');
    res.json({ success: true, data: teacher });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const teacher = await Teacher.findByIdAndUpdate(id, updates, { new: true });
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    if (updates.firstName || updates.lastName) {
      const userUpdates: any = {};
      if (updates.firstName) userUpdates.firstName = updates.firstName;
      if (updates.lastName) userUpdates.lastName = updates.lastName;

      await User.findByIdAndUpdate(teacher.userId, userUpdates);
    }

    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update teacher', error });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    await User.findByIdAndDelete(teacher.userId);
    await Teacher.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete teacher', error });
  }
};

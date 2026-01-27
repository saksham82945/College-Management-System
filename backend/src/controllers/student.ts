import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { Student } from '../models/Student';
import { User } from '../models/User';
import { hashPassword } from '../utils/password';
import { AppError } from '../utils/errors';

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 25;
    const course = req.query.course as string;
    const status = req.query.status as string;

    const skip = (page - 1) * size;
    const filter: any = {};

    if (course) filter.course = course;
    if (status) filter.status = status;

    const students = await Student.find(filter)
      .populate('userId', 'email fullName phone')
      .skip(skip)
      .limit(size)
      .lean();

    const total = await Student.countDocuments(filter);

    res.json({
      data: {
        total,
        page,
        size,
        students: students.map((s: any) => ({
          id: s._id,
          name: s.userId.fullName,
          email: s.userId.email,
          phone: s.userId.phone,
          rollNo: s.rollNo,
          course: s.course,
          section: s.section,
          status: s.status,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const student: any = await Student.findById(id)
      .populate('userId', 'email fullName phone')
      .lean();

    if (!student) {
      throw new AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
    }

    res.json({
      data: {
        id: student._id,
        name: student.userId.fullName,
        email: student.userId.email,
        phone: student.userId.phone,
        rollNo: student.rollNo,
        course: student.course,
        section: student.section,
        dateOfBirth: student.dateOfBirth,
        guardianInfo: student.guardianInfo,
        address: student.address,
        status: student.status,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const createStudent = async (req: Request, res: Response) => {
  // const session = await mongoose.startSession();
  // session.startTransaction(); // Transaction removed for standalone support

  try {
    const { email, password, fullName, phone, rollNo, course, section, dateOfBirth, guardianInfo, address } = req.body;

    // Check if student with same roll number exists
    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      throw new AppError('Roll number already exists', 400, 'ROLLNO_EXISTS');
    }

    // 1. Create User for Student
    const hashedPassword = await hashPassword(password);
    const user = await User.create([{
      email,
      password: hashedPassword,
      fullName,
      phone,
      roles: ['STUDENT']
    }]);

    // 2. Handle Parent (Create or Find)
    // For now, assuming new parent for simplicity unless we do a complex lookup. 
    // In production, we'd check phone/email match.
    // Simplifying to always create a parent record for admission form parity for now.
    const parent = await import('../models/Parent.js').then(m => m.Parent.create([{
      fatherName: guardianInfo.fatherName,
      motherName: guardianInfo.motherName,
      fatherPhone: guardianInfo.fatherPhone,
      motherPhone: guardianInfo.motherPhone,
      primaryEmail: guardianInfo.primaryEmail, // Assuming this comes from form
      address: address, // Parent address often same as student
    }]));


    // 3. Create student
    const student = await Student.create([{
      userId: user[0]._id,
      parentId: parent[0]._id,
      rollNo,
      course,
      section,
      dateOfBirth,
      guardianInfo: { // Keeping embedded for backward compatibility/read ease during query
        fatherName: guardianInfo.fatherName,
        motherName: guardianInfo.motherName,
        fatherPhone: guardianInfo.fatherPhone
      },
      address,
      enrollmentYear: new Date().getFullYear(),
    }]);

    // Link student to parent
    await import('../models/Parent.js').then(m => m.Parent.findByIdAndUpdate(parent[0]._id, {
      $push: { children: student[0]._id }
    }));


    // await session.commitTransaction();

    res.status(201).json({
      message: 'Student created successfully',
      data: {
        id: student[0]._id,
        rollNo: student[0].rollNo,
      },
    });
  } catch (error) {
    // await session.abortTransaction();
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
    } else {
      console.error('Create Student Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } finally {
    // session.endSession();
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      throw new AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
    }

    res.json({
      message: 'Student updated successfully',
      data: { id: student._id },
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) {
      throw new AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
    }

    // Soft delete
    student.status = 'inactive';
    await student.save();

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const promoteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newCourse, newSection } = req.body;

    const student = await Student.findById(id);
    if (!student) {
      throw new AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
    }

    // Update student
    student.course = newCourse;
    student.section = newSection || student.section;
    await student.save();

    // In a real system, we might archive previous year's record here

    res.json({
      success: true,
      message: 'Student promoted successfully',
      data: {
        id: student._id,
        newCourse: student.course,
        newSection: student.section
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error promoted' });
    }
  }
};

export const getStudentFullProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate('userId', '-password')
      .populate('parentId')
      .lean();

    if (!student) {
      throw new AppError('Student not found', 404, 'STUDENT_NOT_FOUND');
    }

    // Fetch related data in parallel
    const [fees, attendance, books] = await Promise.all([
      import('../models/StudentFee.js').then(m => m.StudentFee.find({ studentId: id }).populate('feeTypeId')),
      import('../models/AttendanceRecord.js').then(m => m.AttendanceRecord.find({ studentId: id, status: 'present' }).countDocuments()), // Simple count for now
      import('../models/Loan.js').then(m => m.Loan.find({ studentId: id, status: 'active' }).populate('bookCopyId'))
    ]);

    res.json({
      success: true,
      data: {
        student,
        stats: {
          attendancePercentage: 85, // Mock calculation or create real one
          totalAttendance: attendance,
          pendingFees: 0, // Calculate from fees
          activeLibraryLoans: books
        },
        financials: fees
      }
    });

  } catch (error) {
    console.error('Profile Error', error);
    res.status(500).json({ message: 'Failed to fetch full profile' });
  }
};

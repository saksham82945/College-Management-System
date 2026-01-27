import { Request, Response } from 'express';
import { AttendanceRecord } from '../models/AttendanceRecord';
import { AppError } from '../utils/errors';

export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { classId, subjectId, date, attendanceEntries } = req.body;
    const markedBy = (req as any).user?.userId;

    // Check if attendance already exists for this class and date
    // Note: handling subjectId if provided, otherwise assume daily attendance
    const query: any = { classId, date: new Date(date) };
    if (subjectId) query.subjectId = subjectId;

    let record = await AttendanceRecord.findOne(query);

    if (record) {
      // Update existing record
      record.attendanceEntries = attendanceEntries;
      record.markedBy = markedBy;
      record.markedAt = new Date();
      await record.save();
    } else {
      // Create new record
      record = await AttendanceRecord.create({
        classId,
        subjectId,
        date: new Date(date),
        attendanceEntries,
        markedBy,
        markedAt: new Date(),
      });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).json({ message: 'Failed to mark attendance' });
  }
};

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { classId, date, startDate, endDate, studentId } = req.query;
    const query: any = {};

    if (classId) query.classId = classId;
    if (date) query.date = new Date(date as string);

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    if (studentId) {
      query['attendanceEntries.studentId'] = studentId;
    }

    const records = await AttendanceRecord.find(query)
      .populate('classId', 'name')
      .populate('attendanceEntries.studentId', 'firstName lastName admissionNumber')
      .sort({ date: -1 });

    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch attendance' });
  }
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const records = await AttendanceRecord.find({
      'attendanceEntries.studentId': studentId
    }).sort({ date: -1 });

    // aggregate stats
    let total = 0;
    let present = 0;

    records.forEach(record => {
      const entry = record.attendanceEntries.find(e => e.studentId.toString() === studentId);
      if (entry) {
        total++;
        if (entry.status === 'present') present++;
      }
    });

    res.json({
      success: true,
      data: {
        records,
        stats: {
          total,
          present,
          percentage: total > 0 ? (present / total) * 100 : 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student attendance' });
  }
};

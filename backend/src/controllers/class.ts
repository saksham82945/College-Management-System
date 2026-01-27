import { Request, Response } from 'express';
import { Class } from '../models/Class';
import { AppError } from '../utils/errors';
import { User } from '../models/User';

export const createClass = async (req: Request, res: Response) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;

        const existingClass = await Class.findOne({ name, section, academicYear });
        if (existingClass) {
            throw new AppError('Class already exists for this year', 400, 'CLASS_EXISTS');
        }

        const newClass = await Class.create({
            name,
            section,
            academicYear,
            classTeacher: classTeacher || null, // Optional
            subjects: subjects || [],
        });

        res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Create Class Error:', error);
            res.status(500).json({ message: 'Failed to create class' });
        }
    }
};

export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const classes = await Class.find()
            .populate('classTeacher', 'firstName lastName email')
            .sort({ academicYear: -1, name: 1, section: 1 });

        res.json({ success: true, data: classes });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes' });
    }
};

export const getClassById = async (req: Request, res: Response) => {
    try {
        const classData = await Class.findById(req.params.id)
            .populate('classTeacher', 'firstName lastName email')
            .populate('subjects');

        if (!classData) {
            throw new AppError('Class not found', 404, 'NOT_FOUND');
        }

        res.json({ success: true, data: classData });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const updateClass = async (req: Request, res: Response) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;

        const updatedClass = await Class.findByIdAndUpdate(
            req.params.id,
            { name, section, academicYear, classTeacher, subjects },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            throw new AppError('Class not found', 404, 'NOT_FOUND');
        }

        res.json({ success: true, data: updatedClass });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Update Class Error:', error);
            res.status(500).json({ message: 'Failed to update class' });
        }
    }
};

export const deleteClass = async (req: Request, res: Response) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            throw new AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, message: 'Class deleted successfully' });
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Failed to delete class' });
        }
    }
};

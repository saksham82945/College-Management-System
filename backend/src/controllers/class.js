"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.getClassById = exports.getAllClasses = exports.createClass = void 0;
const Class_1 = require("../models/Class");
const errors_1 = require("../utils/errors");
const createClass = async (req, res) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;
        const existingClass = await Class_1.Class.findOne({ name, section, academicYear });
        if (existingClass) {
            throw new errors_1.AppError('Class already exists for this year', 400, 'CLASS_EXISTS');
        }
        const newClass = await Class_1.Class.create({
            name,
            section,
            academicYear,
            classTeacher: classTeacher || null, // Optional
            subjects: subjects || [],
        });
        res.status(201).json({ success: true, data: newClass });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Create Class Error:', error);
            res.status(500).json({ message: 'Failed to create class' });
        }
    }
};
exports.createClass = createClass;
const getAllClasses = async (req, res) => {
    try {
        const classes = await Class_1.Class.find()
            .populate('classTeacher', 'firstName lastName email')
            .sort({ academicYear: -1, name: 1, section: 1 });
        res.json({ success: true, data: classes });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch classes' });
    }
};
exports.getAllClasses = getAllClasses;
const getClassById = async (req, res) => {
    try {
        const classData = await Class_1.Class.findById(req.params.id)
            .populate('classTeacher', 'firstName lastName email')
            .populate('subjects');
        if (!classData) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, data: classData });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
exports.getClassById = getClassById;
const updateClass = async (req, res) => {
    try {
        const { name, section, academicYear, classTeacher, subjects } = req.body;
        const updatedClass = await Class_1.Class.findByIdAndUpdate(req.params.id, { name, section, academicYear, classTeacher, subjects }, { new: true, runValidators: true });
        if (!updatedClass) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, data: updatedClass });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            console.error('Update Class Error:', error);
            res.status(500).json({ message: 'Failed to update class' });
        }
    }
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    try {
        const deletedClass = await Class_1.Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            throw new errors_1.AppError('Class not found', 404, 'NOT_FOUND');
        }
        res.json({ success: true, message: 'Class deleted successfully' });
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Failed to delete class' });
        }
    }
};
exports.deleteClass = deleteClass;

'use strict';
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: false
    },
    subject: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'],
        required: true,
        default: 'PRESENT'
    },
    markedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    remarks: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate entries per student per date per subject
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: false });

module.exports = mongoose.model('Attendance', attendanceSchema);

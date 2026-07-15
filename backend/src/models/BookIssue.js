"use strict";
const mongoose = require('mongoose');

const bookIssueSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    issuedAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnedAt: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['issued', 'returned', 'overdue'],
        default: 'issued',
    },
    fineAmount: {
        type: Number,
        default: 0,
    },
    finePaid: {
        type: Boolean,
        default: false,
    },
    remarks: { type: String },
}, { timestamps: true });

// Auto-update status to overdue
bookIssueSchema.pre('save', function (next) {
    if (this.status === 'issued' && this.dueDate < new Date()) {
        this.status = 'overdue';
    }
    next();
});

bookIssueSchema.index({ studentId: 1, status: 1 });
bookIssueSchema.index({ bookId: 1, status: 1 });

exports.BookIssue = mongoose.model('BookIssue', bookIssueSchema);

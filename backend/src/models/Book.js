"use strict";
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
    },
    publisher: { type: String, trim: true },
    publishedYear: { type: Number },
    category: {
        type: String,
        enum: ['Science', 'Mathematics', 'Engineering', 'Computer Science', 'Arts', 'Commerce',
               'History', 'Literature', 'Reference', 'Fiction', 'Research', 'Other'],
        default: 'Other',
    },
    description: { type: String, trim: true },
    totalCopies: { type: Number, default: 1, min: 1 },
    availableCopies: { type: Number, default: 1, min: 0 },
    location: { type: String, trim: true }, // e.g. "Shelf A-12"
    coverImage: { type: String },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

bookSchema.index({ title: 'text', author: 'text', isbn: 'text' });

exports.Book = mongoose.model('Book', bookSchema);

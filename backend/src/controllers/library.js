"use strict";
const { Book } = require('../models/Book');
const { BookIssue } = require('../models/BookIssue');
const { AppError } = require('../utils/errors');

const FINE_PER_DAY = 2; // ₹2 per day overdue

// ── GET /library/books ────────────────────────────────────────────────────────
const getBooks = async (req, res) => {
    try {
        const { search, category, available, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { isbn: { $regex: search, $options: 'i' } },
            ];
        }
        if (category && category !== 'All') filter.category = category;
        if (available === 'true') filter.availableCopies = { $gt: 0 };

        const skip = (Number(page) - 1) * Number(limit);
        const [books, total] = await Promise.all([
            Book.find(filter).sort({ title: 1 }).skip(skip).limit(Number(limit)).lean(),
            Book.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: books,
            pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) },
        });
    } catch (err) {
        console.error('[Library] getBooks error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch books' });
    }
};

// ── GET /library/books/:id ────────────────────────────────────────────────────
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).lean();
        if (!book) throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
        res.json({ success: true, data: book });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ success: false, message: 'Failed to fetch book' });
    }
};

// ── POST /library/books ───────────────────────────────────────────────────────
const addBook = async (req, res) => {
    try {
        const { title, author, isbn, publisher, publishedYear, category, description, totalCopies, location } = req.body;
        if (!title || !author) throw new AppError('Title and author are required', 400, 'MISSING_FIELDS');

        const book = await Book.create({
            title, author, isbn, publisher, publishedYear, category,
            description, location,
            totalCopies: totalCopies || 1,
            availableCopies: totalCopies || 1,
            addedBy: req.user?.userId,
        });
        res.status(201).json({ success: true, data: book, message: 'Book added to library' });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        if (err.code === 11000) return res.status(400).json({ message: 'A book with this ISBN already exists' });
        console.error('[Library] addBook error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to add book' });
    }
};

// ── PUT /library/books/:id ────────────────────────────────────────────────────
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
        res.json({ success: true, data: book, message: 'Book updated' });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ success: false, message: 'Failed to update book' });
    }
};

// ── DELETE /library/books/:id ─────────────────────────────────────────────────
const deleteBook = async (req, res) => {
    try {
        const activeIssue = await BookIssue.findOne({ bookId: req.params.id, status: { $in: ['issued', 'overdue'] } });
        if (activeIssue) throw new AppError('Cannot delete — book has active issues', 400, 'BOOK_HAS_ACTIVE_ISSUES');
        await Book.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Book removed from library' });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        res.status(500).json({ success: false, message: 'Failed to delete book' });
    }
};

// ── POST /library/issue ───────────────────────────────────────────────────────
const issueBook = async (req, res) => {
    try {
        const { bookId, studentId, dueDate } = req.body;
        if (!bookId || !studentId || !dueDate) throw new AppError('bookId, studentId, dueDate are required', 400, 'MISSING_FIELDS');

        const book = await Book.findById(bookId);
        if (!book) throw new AppError('Book not found', 404, 'BOOK_NOT_FOUND');
        if (book.availableCopies < 1) throw new AppError('No copies available for this book', 400, 'NO_COPIES_AVAILABLE');

        // Check if student already has this book
        const existing = await BookIssue.findOne({ bookId, studentId, status: { $in: ['issued', 'overdue'] } });
        if (existing) throw new AppError('Student already has this book issued', 400, 'ALREADY_ISSUED');

        const issue = await BookIssue.create({
            bookId, studentId, dueDate,
            issuedBy: req.user?.userId,
        });

        // Decrement available copies
        book.availableCopies -= 1;
        await book.save();

        await issue.populate([
            { path: 'bookId', select: 'title author isbn' },
            { path: 'studentId', select: 'firstName lastName rollNumber' },
        ]);

        res.status(201).json({ success: true, data: issue, message: 'Book issued successfully' });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        console.error('[Library] issueBook error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to issue book' });
    }
};

// ── PUT /library/return/:issueId ──────────────────────────────────────────────
const returnBook = async (req, res) => {
    try {
        const issue = await BookIssue.findById(req.params.issueId).populate('bookId');
        if (!issue) throw new AppError('Issue record not found', 404, 'ISSUE_NOT_FOUND');
        if (issue.status === 'returned') throw new AppError('Book already returned', 400, 'ALREADY_RETURNED');

        const returnedAt = new Date();
        const daysOverdue = Math.max(0, Math.floor((returnedAt - issue.dueDate) / (1000 * 60 * 60 * 24)));
        const fineAmount = daysOverdue * FINE_PER_DAY;

        issue.returnedAt = returnedAt;
        issue.status = 'returned';
        issue.fineAmount = fineAmount;
        await issue.save();

        // Restore available copies
        await Book.findByIdAndUpdate(issue.bookId, { $inc: { availableCopies: 1 } });

        res.json({
            success: true,
            data: issue,
            message: fineAmount > 0 ? `Book returned. Fine: ₹${fineAmount} (${daysOverdue} days overdue)` : 'Book returned successfully. No fine.',
            daysOverdue,
            fineAmount,
        });
    } catch (err) {
        if (err instanceof AppError) return res.status(err.statusCode).json({ message: err.message });
        console.error('[Library] returnBook error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to return book' });
    }
};

// ── GET /library/issues ───────────────────────────────────────────────────────
const getIssues = async (req, res) => {
    try {
        const { status, studentId, page = 1, limit = 20 } = req.query;
        const filter = {};
        if (status && status !== 'all') filter.status = status;
        if (studentId) filter.studentId = studentId;

        // Auto-mark overdue
        await BookIssue.updateMany(
            { status: 'issued', dueDate: { $lt: new Date() } },
            { status: 'overdue' }
        );

        const skip = (Number(page) - 1) * Number(limit);
        const [issues, total] = await Promise.all([
            BookIssue.find(filter)
                .populate('bookId', 'title author isbn coverImage')
                .populate('studentId', 'firstName lastName rollNumber')
                .sort({ issuedAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            BookIssue.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: issues,
            pagination: { total, page: Number(page), limit: Number(limit) },
        });
    } catch (err) {
        console.error('[Library] getIssues error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to fetch issues' });
    }
};

// ── GET /library/overdue ──────────────────────────────────────────────────────
const getOverdueIssues = async (req, res) => {
    try {
        await BookIssue.updateMany(
            { status: 'issued', dueDate: { $lt: new Date() } },
            { status: 'overdue' }
        );
        const issues = await BookIssue.find({ status: 'overdue' })
            .populate('bookId', 'title author')
            .populate('studentId', 'firstName lastName rollNumber')
            .lean();

        // Calculate current fines
        const withFines = issues.map(i => ({
            ...i,
            currentFine: Math.floor((new Date() - new Date(i.dueDate)) / (1000 * 60 * 60 * 24)) * FINE_PER_DAY,
        }));

        res.json({ success: true, data: withFines });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch overdue issues' });
    }
};

// ── GET /library/stats ────────────────────────────────────────────────────────
const getStats = async (req, res) => {
    try {
        const [totalBooks, totalCopies, issued, overdue] = await Promise.all([
            Book.countDocuments(),
            Book.aggregate([{ $group: { _id: null, total: { $sum: '$totalCopies' }, available: { $sum: '$availableCopies' } } }]),
            BookIssue.countDocuments({ status: 'issued' }),
            BookIssue.countDocuments({ status: 'overdue' }),
        ]);
        const copies = totalCopies[0] || { total: 0, available: 0 };
        res.json({ success: true, data: { totalBooks, totalCopies: copies.total, availableCopies: copies.available, issued, overdue } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch library stats' });
    }
};

module.exports = { getBooks, getBookById, addBook, updateBook, deleteBook, issueBook, returnBook, getIssues, getOverdueIssues, getStats };

"use strict";
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const {
    getBooks, getBookById, addBook, updateBook, deleteBook,
    issueBook, returnBook, getIssues, getOverdueIssues, getStats,
} = require('../controllers/library');

// All library routes require authentication
router.use(authMiddleware);

// ── Stats ─────────────────────────────────────────────────────────────────────
router.get('/stats', getStats);

// ── Books ─────────────────────────────────────────────────────────────────────
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', roleMiddleware(['ADMIN']), addBook);
router.put('/books/:id', roleMiddleware(['ADMIN']), updateBook);
router.delete('/books/:id', roleMiddleware(['ADMIN']), deleteBook);

// ── Issue / Return ────────────────────────────────────────────────────────────
router.post('/issue', roleMiddleware(['ADMIN', 'TEACHER']), issueBook);
router.put('/return/:issueId', roleMiddleware(['ADMIN', 'TEACHER']), returnBook);

// ── Issue Records ─────────────────────────────────────────────────────────────
router.get('/issues', roleMiddleware(['ADMIN', 'TEACHER']), getIssues);
router.get('/overdue', roleMiddleware(['ADMIN', 'TEACHER']), getOverdueIssues);

module.exports = router;

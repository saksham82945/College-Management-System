"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGES = exports.PROJECT_CONSTANTS = void 0;
exports.PROJECT_CONSTANTS = {
    // Title constraints
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    // Description constraints
    DESCRIPTION_MIN_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 2000,
    // File upload constraints
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_MIME_TYPES: ['application/pdf'],
    MIN_PAGE_COUNT: 10,
    MAX_PAGE_COUNT: 200,
    // Domain options
    DOMAINS: [
        'AI/ML',
        'Web Development',
        'Mobile App Development',
        'IoT',
        'Cybersecurity',
        'Blockchain',
        'Data Science',
        'Cloud Computing',
        'DevOps',
        'Game Development'
    ],
    // Pagination
    DEFAULT_PAGE_SIZE: 50,
    MAX_PAGE_SIZE: 100,
    // Batch format regex
    BATCH_REGEX: /^\d{4}-[A-Z]{2,10}$/,
    // Status transitions - defines valid state changes
    ALLOWED_STATUS_TRANSITIONS: {
        PROPOSED: ['APPROVED', 'IN_PROGRESS'],
        APPROVED: ['IN_PROGRESS'],
        IN_PROGRESS: ['SUBMITTED'],
        SUBMITTED: ['CHANGES_REQUESTED'],
        CHANGES_REQUESTED: ['SUBMITTED']
    }
};
exports.ERROR_MESSAGES = {
    PROJECT_NOT_FOUND: 'Project not found',
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this project',
    INVALID_FILE_TYPE: 'Only PDF files are allowed',
    INVALID_STATUS_TRANSITION: 'Invalid status transition',
    STUDENT_NOT_FOUND: 'One or more students not found',
    MENTOR_NOT_FOUND: 'Specified mentor not found',
    INVALID_BATCH_FORMAT: 'Batch format should be YYYY-CODE (e.g., 2024-CSE)',
    MISSING_SUBMISSION: 'Project has not been submitted yet'
};

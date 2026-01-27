"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validate = exports.getAllProjectsQuerySchema = exports.submitReportSchema = exports.createProjectSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const project_constants_1 = require("../constants/project.constants");
const Project_1 = require("../models/Project");
exports.createProjectSchema = joi_1.default.object({
    title: joi_1.default.string()
        .min(project_constants_1.PROJECT_CONSTANTS.TITLE_MIN_LENGTH)
        .max(project_constants_1.PROJECT_CONSTANTS.TITLE_MAX_LENGTH)
        .required()
        .trim()
        .messages({
            'string.min': `Title must be at least ${project_constants_1.PROJECT_CONSTANTS.TITLE_MIN_LENGTH} characters`,
            'string.max': `Title cannot exceed ${project_constants_1.PROJECT_CONSTANTS.TITLE_MAX_LENGTH} characters`,
            'any.required': 'Title is required'
        }),
    description: joi_1.default.string()
        .min(project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MIN_LENGTH)
        .max(project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH)
        .required()
        .trim()
        .messages({
            'string.min': `Description must be at least ${project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MIN_LENGTH} characters`,
            'string.max': `Description cannot exceed ${project_constants_1.PROJECT_CONSTANTS.DESCRIPTION_MAX_LENGTH} characters`
        }),
    batch: joi_1.default.string()
        .pattern(project_constants_1.PROJECT_CONSTANTS.BATCH_REGEX)
        .required()
        .messages({
            'string.pattern.base': 'Batch format should be YYYY-CODE (e.g., 2024-CSE)'
        }),
    domain: joi_1.default.array()
        .items(joi_1.default.string().valid(...project_constants_1.PROJECT_CONSTANTS.DOMAINS))
        .min(1)
        .max(3)
        .required()
        .messages({
            'array.min': 'At least one domain is required',
            'array.max': 'Maximum 3 domains allowed',
            'any.only': 'Invalid domain selected'
        }),
    studentIds: joi_1.default.array()
        .items(joi_1.default.string().hex().length(24))
        .min(1)
        .max(4)
        .required()
        .messages({
            'array.min': 'At least one student is required',
            'array.max': 'Maximum 4 students allowed per project'
        }),
    mentorId: joi_1.default.string()
        .hex()
        .length(24)
        .optional()
        .allow(null)
});
exports.submitReportSchema = joi_1.default.object({
    fileUrl: joi_1.default.string()
        .uri()
        .required()
        .messages({
            'string.uri': 'File URL must be a valid URL',
            'any.required': 'File URL is required'
        }),
    originalName: joi_1.default.string()
        .required()
        .pattern(/\.pdf$/i)
        .messages({
            'string.pattern.base': 'File must be a PDF',
            'any.required': 'Original filename is required'
        }),
    mimeType: joi_1.default.string()
        .valid(...project_constants_1.PROJECT_CONSTANTS.ALLOWED_MIME_TYPES)
        .required()
        .messages({
            'any.only': 'Only PDF files are allowed'
        }),
    size: joi_1.default.number()
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_FILE_SIZE)
        .required()
        .messages({
            'number.max': `File size must not exceed ${project_constants_1.PROJECT_CONSTANTS.MAX_FILE_SIZE / 1024 / 1024}MB`
        }),
    pageCount: joi_1.default.number()
        .min(project_constants_1.PROJECT_CONSTANTS.MIN_PAGE_COUNT)
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_COUNT)
        .optional()
        .messages({
            'number.min': `Report must have at least ${project_constants_1.PROJECT_CONSTANTS.MIN_PAGE_COUNT} pages`,
            'number.max': `Report cannot exceed ${project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_COUNT} pages`
        })
});
exports.getAllProjectsQuerySchema = joi_1.default.object({
    batch: joi_1.default.string().optional(),
    status: joi_1.default.string().valid(...Object.values(Project_1.ProjectStatus)).optional(),
    domain: joi_1.default.string().optional(),
    page: joi_1.default.number().min(1).default(1),
    limit: joi_1.default.number()
        .min(1)
        .max(project_constants_1.PROJECT_CONSTANTS.MAX_PAGE_SIZE)
        .default(project_constants_1.PROJECT_CONSTANTS.DEFAULT_PAGE_SIZE),
    sort: joi_1.default.string().valid('createdAt', 'updatedAt', 'title').default('updatedAt'),
    order: joi_1.default.string().valid('asc', 'desc').default('desc')
});
// Validation middleware factory
const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }
        req.body = value; // Use validated and sanitized data
        next();
    };
};
exports.validate = validate;
const validateQuery = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query, {
            abortEarly: false,
            stripUnknown: true
        });
        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));
            return res.status(400).json({
                success: false,
                message: 'Invalid query parameters',
                errors
            });
        }
        req.query = value;
        next();
    };
};
exports.validateQuery = validateQuery;

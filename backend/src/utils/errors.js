"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (error) => {
    if (error instanceof AppError) {
        return {
            statusCode: error.statusCode,
            message: error.message,
            errorCode: error.errorCode,
        };
    }
    console.error('Unexpected error:', error);
    return {
        statusCode: 500,
        message: 'Internal Server Error',
        errorCode: 'INTERNAL_ERROR',
    };
};
exports.errorHandler = errorHandler;

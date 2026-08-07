'use strict';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

const { AppError, errorHandler } = require('../../../src/utils/errors');

describe('AppError — Unit Tests', () => {

    describe('constructor', () => {
        test('should set message, statusCode and errorCode', () => {
            const err = new AppError('Not found', 404, 'NOT_FOUND');
            expect(err.message).toBe('Not found');
            expect(err.statusCode).toBe(404);
            expect(err.errorCode).toBe('NOT_FOUND');
        });

        test('should be an instance of Error', () => {
            const err = new AppError('Bad request', 400);
            expect(err).toBeInstanceOf(Error);
        });

        test('should work without errorCode (optional param)', () => {
            const err = new AppError('Server error', 500);
            expect(err.statusCode).toBe(500);
            expect(err.errorCode).toBeUndefined();
        });

        test('should have a captured stack trace', () => {
            const err = new AppError('Test', 400);
            expect(err.stack).toBeDefined();
        });
    });

    describe('errorHandler()', () => {
        test('should return formatted response for AppError', () => {
            const err = new AppError('Unauthorized', 401, 'NO_TOKEN');
            const result = errorHandler(err);
            expect(result.statusCode).toBe(401);
            expect(result.message).toBe('Unauthorized');
            expect(result.errorCode).toBe('NO_TOKEN');
        });

        test('should return 500 for generic Error', () => {
            const err = new Error('Something exploded');
            const result = errorHandler(err);
            expect(result.statusCode).toBe(500);
            expect(result.errorCode).toBe('INTERNAL_ERROR');
        });

        test('should return 500 for thrown string', () => {
            const result = errorHandler('bad string error');
            expect(result.statusCode).toBe(500);
            expect(result.message).toBe('Internal Server Error');
        });

        test('should distinguish AppError from generic Error', () => {
            const appErr = new AppError('Forbidden', 403, 'FORBIDDEN');
            const genericErr = new Error('Something went wrong');
            expect(errorHandler(appErr).statusCode).toBe(403);
            expect(errorHandler(genericErr).statusCode).toBe(500);
        });
    });
});

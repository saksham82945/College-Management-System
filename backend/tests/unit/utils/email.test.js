'use strict';
// Mock nodemailer so no actual emails are sent during tests
jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id-123' })
    }))
}));

describe('Email Utility — Unit Tests', () => {
    let emailUtils;

    beforeEach(() => {
        jest.resetModules();
    });

    describe('sendEmail() — Skip Mode (EMAIL_USER not set)', () => {
        beforeEach(() => {
            delete process.env.EMAIL_USER;
            jest.resetModules();
            emailUtils = require('../../../src/utils/email');
        });

        test('should return { skipped: true } when EMAIL_USER is not configured', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendEmail({
                to: 'test@example.com',
                subject: 'Test',
                html: '<p>Test</p>'
            });
            expect(result).toMatchObject({ skipped: true });
            consoleSpy.mockRestore();
        });
    });

    describe('sendEmail() — Send Mode (EMAIL_USER set)', () => {
        beforeEach(() => {
            process.env.EMAIL_USER = 'test@college.com';
            process.env.EMAIL_PASS = 'testpass';
            jest.resetModules();
            jest.mock('nodemailer', () => ({
                createTransport: jest.fn(() => ({
                    sendMail: jest.fn().mockResolvedValue({ messageId: 'msg-001' })
                }))
            }));
            emailUtils = require('../../../src/utils/email');
        });

        afterEach(() => {
            delete process.env.EMAIL_USER;
            delete process.env.EMAIL_PASS;
        });

        test('should resolve with message info when EMAIL_USER is configured', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendEmail({
                to: 'student@lnmi.in',
                subject: 'Test Email',
                html: '<p>Hello</p>'
            });
            expect(result).toHaveProperty('messageId');
            consoleSpy.mockRestore();
        });
    });

    describe('sendFeeReminderEmail()', () => {
        beforeEach(() => {
            delete process.env.EMAIL_USER;
            jest.resetModules();
            emailUtils = require('../../../src/utils/email');
        });

        test('should call sendEmail with correct recipient and skip gracefully', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendFeeReminderEmail(
                { name: 'Rahul Sharma', email: 'rahul@lnmi.in', rollNo: 'CS001' },
                { amount: 15000, dueDate: new Date('2026-08-15'), feeType: 'Tuition Fee' }
            );
            expect(result).toMatchObject({ skipped: true });
            consoleSpy.mockRestore();
        });
    });

    describe('sendAttendanceWarningEmail()', () => {
        beforeEach(() => {
            delete process.env.EMAIL_USER;
            jest.resetModules();
            emailUtils = require('../../../src/utils/email');
        });

        test('should handle critical attendance (< 65%) gracefully', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendAttendanceWarningEmail(
                { name: 'Ananya Mishra', email: 'ananya@lnmi.in', rollNo: 'EC002', course: 'ECE' },
                60 // Critical
            );
            expect(result).toMatchObject({ skipped: true });
            consoleSpy.mockRestore();
        });

        test('should handle warning attendance (65-74%) gracefully', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendAttendanceWarningEmail(
                { name: 'Vikram Rao', email: 'vikram@lnmi.in', rollNo: 'ME003', course: 'ME' },
                70 // Warning
            );
            expect(result).toMatchObject({ skipped: true });
            consoleSpy.mockRestore();
        });
    });

    describe('sendWelcomeEmail()', () => {
        beforeEach(() => {
            delete process.env.EMAIL_USER;
            jest.resetModules();
            emailUtils = require('../../../src/utils/email');
        });

        test('should skip when EMAIL_USER not set', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await emailUtils.sendWelcomeEmail(
                { fullName: 'New Student', email: 'newstudent@lnmi.in' },
                'STUDENT'
            );
            expect(result).toMatchObject({ skipped: true });
            consoleSpy.mockRestore();
        });
    });

    describe('sendNotificationEmail()', () => {
        beforeEach(() => {
            delete process.env.EMAIL_USER;
            jest.resetModules();
            emailUtils = require('../../../src/utils/email');
        });

        test('should handle all notification types', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const types = ['info', 'warning', 'success', 'error'];
            for (const type of types) {
                const result = await emailUtils.sendNotificationEmail(
                    { fullName: 'Test User', email: 'user@lnmi.in' },
                    { title: `${type} notification`, message: 'Test message', type }
                );
                expect(result).toMatchObject({ skipped: true });
            }
            consoleSpy.mockRestore();
        });
    });
});

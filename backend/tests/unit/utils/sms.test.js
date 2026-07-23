'use strict';
// We do NOT want twilio to actually call APIs in tests
jest.mock('twilio', () => {
    return jest.fn(() => ({
        messages: {
            create: jest.fn().mockResolvedValue({ sid: 'SM_TEST_SID_123' })
        }
    }));
});

describe('SMS Utility — Unit Tests', () => {
    let smsUtils;

    beforeEach(() => {
        // Reset modules before each test to re-require with different env
        jest.resetModules();
    });

    describe('sendSms() — Mock Mode (no Twilio credentials)', () => {
        beforeEach(() => {
            delete process.env.TWILIO_ACCOUNT_SID;
            delete process.env.TWILIO_AUTH_TOKEN;
            jest.resetModules();
            jest.mock('twilio', () => jest.fn(() => ({})));
            smsUtils = require('../../../src/utils/sms');
        });

        test('should return { skipped: true } when no phone number provided', async () => {
            const result = await smsUtils.sendSms({ to: null, body: 'Test' });
            expect(result).toMatchObject({ skipped: true });
        });

        test('should return { mock: true } when no Twilio client configured', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await smsUtils.sendSms({ to: '9876543210', body: 'Hello test' });
            expect(result).toMatchObject({ mock: true });
            consoleSpy.mockRestore();
        });

        test('should format 10-digit Indian number with +91 prefix', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await smsUtils.sendSms({ to: '9876543210', body: 'Test' });
            expect(result.to).toBe('+919876543210');
            consoleSpy.mockRestore();
        });

        test('should keep number with + prefix as is', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await smsUtils.sendSms({ to: '+14155552671', body: 'Test' });
            expect(result.to).toBe('+14155552671');
            consoleSpy.mockRestore();
        });
    });

    describe('sendFeeReminderSms()', () => {
        beforeEach(() => {
            delete process.env.TWILIO_ACCOUNT_SID;
            jest.resetModules();
            smsUtils = require('../../../src/utils/sms');
        });

        test('should format fee reminder SMS correctly', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await smsUtils.sendFeeReminderSms(
                { name: 'Rahul Sharma', phone: '9876543210' },
                { amount: 5000, feeType: 'Tuition Fee' }
            );
            expect(result.body).toContain('Rahul Sharma');
            expect(result.body).toContain('5,000');
            expect(result.body).toContain('Tuition Fee');
            consoleSpy.mockRestore();
        });
    });

    describe('sendAttendanceWarningSms()', () => {
        beforeEach(() => {
            delete process.env.TWILIO_ACCOUNT_SID;
            jest.resetModules();
            smsUtils = require('../../../src/utils/sms');
        });

        test('should include attendance percentage in message body', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const result = await smsUtils.sendAttendanceWarningSms(
                { name: 'Priya Singh', phone: '9123456789' },
                68
            );
            expect(result.body).toContain('68%');
            expect(result.body).toContain('Priya Singh');
            consoleSpy.mockRestore();
        });
    });

    describe('sendNotificationSms()', () => {
        beforeEach(() => {
            delete process.env.TWILIO_ACCOUNT_SID;
            jest.resetModules();
            smsUtils = require('../../../src/utils/sms');
        });

        test('should truncate long messages to 100 chars', async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
            const longMessage = 'A'.repeat(200);
            const result = await smsUtils.sendNotificationSms(
                { phone: '9876543210' },
                { title: 'Alert', message: longMessage }
            );
            // body = "Alert: AAA...AAA... - LNMICMS"
            // shortMessage will be 97 chars + "..."
            expect(result.body.includes('...')).toBe(true);
            consoleSpy.mockRestore();
        });
    });
});

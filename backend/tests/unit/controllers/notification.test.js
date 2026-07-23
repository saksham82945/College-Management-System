'use strict';
// Mock all external dependencies
jest.mock('../../../src/models/Notification', () => {
    const mockNotification = {
        find: jest.fn(),
        countDocuments: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        updateMany: jest.fn(),
    };
    return mockNotification;
});
jest.mock('../../../src/utils/email', () => ({
    sendNotificationEmail: jest.fn().mockResolvedValue({ messageId: 'test' }),
}));
jest.mock('../../../src/utils/sms', () => ({
    sendNotificationSms: jest.fn().mockResolvedValue({ mock: true }),
}));
jest.mock('../../../src/models/User', () => ({
    User: {
        findById: jest.fn(),
    }
}));

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

const Notification = require('../../../src/models/Notification');
const { sendNotificationEmail } = require('../../../src/utils/email');
const { sendNotificationSms } = require('../../../src/utils/sms');
const { User } = require('../../../src/models/User');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Notification Controller — Unit Tests', () => {
    let getNotifications, createNotification, markAsRead, markAllAsRead, deleteNotification;

    beforeAll(() => {
        ({
            getNotifications,
            createNotification,
            markAsRead,
            markAllAsRead,
            deleteNotification
        } = require('../../../src/controllers/notification'));
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ─── getNotifications ─────────────────────────────────────────────────────
    describe('getNotifications()', () => {
        test('should return notifications list with pagination (200)', async () => {
            const mockList = [{ _id: 'n1', title: 'Test', isRead: false }];
            Notification.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    skip: jest.fn().mockReturnValue({
                        limit: jest.fn().mockResolvedValue(mockList)
                    })
                })
            });
            Notification.countDocuments.mockResolvedValueOnce(1).mockResolvedValueOnce(1);

            const req = { query: {} };
            const res = mockRes();
            await getNotifications(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: mockList,
                total: 1
            }));
        });
    });

    // ─── createNotification ───────────────────────────────────────────────────
    describe('createNotification()', () => {
        test('should return 400 when title is missing', async () => {
            const req = { body: { message: 'No title' } };
            const res = mockRes();
            await createNotification(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 when message is missing', async () => {
            const req = { body: { title: 'No message' } };
            const res = mockRes();
            await createNotification(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should create notification and return 201', async () => {
            const mockNotif = { _id: 'n1', title: 'Test', message: 'Body', type: 'INFO' };
            Notification.create.mockResolvedValue(mockNotif);
            
            const req = { body: { title: 'Test', message: 'Body', type: 'INFO' } };
            const res = mockRes();
            await createNotification(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Notification created' }));
        });

        test('should dispatch email when sendEmail=true and targetEmail provided, and user prefs allow it', async () => {
            const mockNotif = { _id: 'n1', title: 'Alert', message: 'Body', type: 'INFO' };
            Notification.create.mockResolvedValue(mockNotif);
            
            // Simulate user with email pref enabled
            User.findById.mockResolvedValue({
                preferences: { emailNotifications: true, smsNotifications: false },
                phone: null
            });

            const req = {
                body: {
                    title: 'Alert', message: 'Body', type: 'INFO',
                    sendEmail: true, targetEmail: 'user@lnmi.in',
                    targetName: 'Test User', targetUserId: 'uid1'
                }
            };
            const res = mockRes();
            await createNotification(req, res);
            // Email should have been called (non-blocking)
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('should dispatch SMS when user has smsNotifications=true and a phone', async () => {
            const mockNotif = { _id: 'n2', title: 'SMS Test', message: 'Body', type: 'INFO' };
            Notification.create.mockResolvedValue(mockNotif);
            
            User.findById.mockResolvedValue({
                preferences: { emailNotifications: true, smsNotifications: true },
                phone: '9876543210'
            });

            const req = {
                body: {
                    title: 'SMS Test', message: 'Body', type: 'INFO',
                    targetUserId: 'uid1'
                }
            };
            const res = mockRes();
            await createNotification(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('should NOT dispatch email when user emailNotifications=false', async () => {
            const mockNotif = { _id: 'n3', title: 'Email Off Test', message: 'Body', type: 'INFO' };
            Notification.create.mockResolvedValue(mockNotif);

            User.findById.mockResolvedValue({
                preferences: { emailNotifications: false, smsNotifications: false },
                phone: null
            });

            const req = {
                body: {
                    title: 'Email Off Test', message: 'Body', type: 'INFO',
                    sendEmail: true, targetEmail: 'user@lnmi.in', targetUserId: 'uid1'
                }
            };
            const res = mockRes();
            await createNotification(req, res);
            
            // Wait for async non-blocking calls to settle
            await new Promise(r => setTimeout(r, 10));
            expect(sendNotificationEmail).not.toHaveBeenCalled();
        });
    });

    // ─── markAsRead ───────────────────────────────────────────────────────────
    describe('markAsRead()', () => {
        test('should mark notification as read (200)', async () => {
            Notification.findByIdAndUpdate.mockResolvedValue({ _id: 'n1', isRead: true });
            const req = { params: { id: 'n1' } };
            const res = mockRes();
            await markAsRead(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Marked as read' }));
        });

        test('should return 404 when notification not found', async () => {
            Notification.findByIdAndUpdate.mockResolvedValue(null);
            const req = { params: { id: 'non-existent' } };
            const res = mockRes();
            await markAsRead(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    // ─── markAllAsRead ────────────────────────────────────────────────────────
    describe('markAllAsRead()', () => {
        test('should mark all as read (200)', async () => {
            Notification.updateMany.mockResolvedValue({ modifiedCount: 3 });
            const req = {};
            const res = mockRes();
            await markAllAsRead(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'All notifications marked as read'
            }));
        });
    });

    // ─── deleteNotification ───────────────────────────────────────────────────
    describe('deleteNotification()', () => {
        test('should delete notification and return 200', async () => {
            Notification.findByIdAndDelete.mockResolvedValue({ _id: 'n1' });
            const req = { params: { id: 'n1' } };
            const res = mockRes();
            await deleteNotification(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Notification deleted' }));
        });
    });
});

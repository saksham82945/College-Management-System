'use strict';
// We isolate the controller from real DB calls by mocking the User model and other deps
jest.mock('../../../src/models/User', () => ({
    User: {
        findOne: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
    }
}));
jest.mock('../../../src/models/Role', () => ({
    Role: { findOne: jest.fn() }
}));
jest.mock('../../../src/utils/password', () => ({
    hashPassword: jest.fn().mockResolvedValue('$2b$10$hashedpassword'),
    comparePassword: jest.fn()
}));
jest.mock('../../../src/utils/jwt', () => ({
    generateTokens: jest.fn().mockReturnValue({ accessToken: 'fake.access.token', refreshToken: 'fake.refresh.token' }),
    verifyRefreshToken: jest.fn(),
}));

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

const { User } = require('../../../src/models/User');
const { Role } = require('../../../src/models/Role');
const { comparePassword } = require('../../../src/utils/password');
const { verifyRefreshToken } = require('../../../src/utils/jwt');

// Helper to create mock req/res
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Auth Controller — Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ─── authRegister ─────────────────────────────────────────────────────────
    describe('authRegister()', () => {
        let authRegister;
        beforeAll(() => {
            ({ authRegister } = require('../../../src/controllers/auth'));
        });

        test('should return 400 if email, password, or fullName is missing', async () => {
            const req = { body: { email: 'test@lnmi.in', password: 'pass' } }; // missing fullName
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 403 for TEACHER role registration attempt', async () => {
            const req = {
                body: { email: 'test@lnmi.in', password: 'TestPass123', fullName: 'Test', roleName: 'TEACHER' }
            };
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(403);
        });

        test('should return 400 for invalid email format', async () => {
            const req = {
                body: { email: 'not-valid', password: 'TestPass123', fullName: 'Test', roleName: 'ADMIN' }
            };
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 for weak password (< 8 chars)', async () => {
            const req = {
                body: { email: 'test@lnmi.in', password: 'short', fullName: 'Test', roleName: 'ADMIN' }
            };
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 if user already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'test@lnmi.in' }); // simulate existing user
            const req = {
                body: { email: 'test@lnmi.in', password: 'SecurePass123', fullName: 'Test', roleName: 'ADMIN' }
            };
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 if role is not found in DB', async () => {
            User.findOne.mockResolvedValue(null);
            Role.findOne.mockResolvedValue(null); // role not found
            const req = {
                body: { email: 'new@lnmi.in', password: 'SecurePass123', fullName: 'New User', roleName: 'ADMIN' }
            };
            const res = mockRes();
            await authRegister(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    // ─── authLogin ────────────────────────────────────────────────────────────
    describe('authLogin()', () => {
        let authLogin;
        beforeAll(() => {
            ({ authLogin } = require('../../../src/controllers/auth'));
        });

        test('should return 400 if email or password is missing', async () => {
            const req = { body: { email: 'test@lnmi.in' } };
            const res = mockRes();
            await authLogin(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 401 if user is not found', async () => {
            User.findOne.mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });
            const req = { body: { email: 'nobody@lnmi.in', password: 'anypass' } };
            const res = mockRes();
            await authLogin(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        test('should return 401 if password does not match', async () => {
            const fakeUser = {
                _id: 'uid1',
                email: 'admin@lnmi.in',
                password: '$2b$10$hashed',
                status: 'active',
                roleAssignments: [{ roleId: { name: 'ADMIN' } }],
                save: jest.fn()
            };
            User.findOne.mockReturnValue({ populate: jest.fn().mockResolvedValue(fakeUser) });
            comparePassword.mockResolvedValue(false); // wrong password
            const req = { body: { email: 'admin@lnmi.in', password: 'wrong' } };
            const res = mockRes();
            await authLogin(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        test('should return 403 if user has no valid roles', async () => {
            const fakeUser = {
                _id: 'uid1',
                email: 'admin@lnmi.in',
                password: '$2b$10$hashed',
                status: 'active',
                roleAssignments: [{ roleId: { name: 'SUPERADMIN' } }], // invalid role
                save: jest.fn()
            };
            User.findOne.mockReturnValue({ populate: jest.fn().mockResolvedValue(fakeUser) });
            comparePassword.mockResolvedValue(true);
            const req = { body: { email: 'admin@lnmi.in', password: 'anypass' } };
            const res = mockRes();
            await authLogin(req, res);
            expect(res.status).toHaveBeenCalledWith(403);
        });
    });

    // ─── updatePreferences ────────────────────────────────────────────────────
    describe('updatePreferences()', () => {
        let updatePreferences;
        beforeAll(() => {
            ({ updatePreferences } = require('../../../src/controllers/auth'));
        });

        test('should return 401 if no user in request', async () => {
            const req = { user: null, body: { phone: '9876543210' } };
            const res = mockRes();
            await updatePreferences(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
        });

        test('should return 404 if user not found in DB', async () => {
            User.findById.mockResolvedValue(null);
            const req = { user: { id: 'uid999' }, body: { phone: '9876543210' } };
            const res = mockRes();
            await updatePreferences(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });

        test('should update phone and preferences successfully', async () => {
            const fakeUser = {
                phone: null,
                preferences: { emailNotifications: true, smsNotifications: false },
                save: jest.fn().mockResolvedValue(true)
            };
            User.findById.mockResolvedValue(fakeUser);
            const req = {
                user: { id: 'uid1' },
                body: { phone: '9876543210', smsNotifications: true }
            };
            const res = mockRes();
            await updatePreferences(req, res);
            expect(fakeUser.phone).toBe('9876543210');
            expect(fakeUser.preferences.smsNotifications).toBe(true);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        });
    });
});

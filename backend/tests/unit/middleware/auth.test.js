'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

// Mock JWT utility to isolate middleware from real signing
jest.mock('../../../src/utils/jwt', () => ({
    verifyAccessToken: jest.fn(),
}));

const { verifyAccessToken } = require('../../../src/utils/jwt');
const { authMiddleware, roleMiddleware } = require('../../../src/middleware/auth');

// Helper to build mock req/res/next
const mockReqResNext = (headers = {}, user = null) => {
    const req = { headers, user };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();
    return { req, res, next };
};

describe('authMiddleware — Unit Tests', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should call next() for a valid token', async () => {
        verifyAccessToken.mockReturnValue({ userId: 'uid1', roles: ['ADMIN'], email: 'a@b.com' });
        const { req, res, next } = mockReqResNext({ authorization: 'Bearer valid.token.here' });

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(req.user).toEqual({ userId: 'uid1', roles: ['ADMIN'], email: 'a@b.com' });
        expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 401 when Authorization header is missing', async () => {
        const { req, res, next } = mockReqResNext({});

        await authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 when token is malformed / not prefixed with Bearer', async () => {
        verifyAccessToken.mockReturnValue(null);
        const { req, res, next } = mockReqResNext({ authorization: 'BadToken abc' });

        await authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 when verifyAccessToken returns null (expired/invalid)', async () => {
        verifyAccessToken.mockReturnValue(null);
        const { req, res, next } = mockReqResNext({ authorization: 'Bearer expired.token' });

        await authMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errorCode: 'INVALID_TOKEN' }));
    });

    test('should return 401 for completely empty Authorization header value', async () => {
        const { req, res, next } = mockReqResNext({ authorization: '' });
        await authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});

describe('roleMiddleware — Unit Tests', () => {

    test('should call next() when user has an allowed role', () => {
        const middleware = roleMiddleware(['ADMIN', 'TEACHER']);
        const { req, res, next } = mockReqResNext();
        req.user = { roles: ['ADMIN'] };

        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
        expect(res.status).not.toHaveBeenCalled();
    });

    test('should return 401 when req.user is missing', () => {
        const middleware = roleMiddleware(['ADMIN']);
        const { req, res, next } = mockReqResNext();
        req.user = null;

        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test('should return 403 when user role is not in allowed list', () => {
        const middleware = roleMiddleware(['ADMIN']);
        const { req, res, next } = mockReqResNext();
        req.user = { roles: ['STUDENT'] };

        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    test('should allow access for any matching role in multi-role user', () => {
        const middleware = roleMiddleware(['ADMIN']);
        const { req, res, next } = mockReqResNext();
        req.user = { roles: ['STUDENT', 'ADMIN'] };

        middleware(req, res, next);

        expect(next).toHaveBeenCalledTimes(1);
    });
});

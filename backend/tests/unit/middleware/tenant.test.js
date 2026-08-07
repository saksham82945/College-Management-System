'use strict';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

// Mock Organization model and tenantStorage
jest.mock('../../../src/models/Organization', () => ({
    Organization: {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        create: jest.fn(),
    }
}));
jest.mock('../../../src/utils/tenantContext', () => ({
    tenantStorage: {
        run: jest.fn((ctx, fn) => fn()),
        getStore: jest.fn(),
    }
}));

const { Organization } = require('../../../src/models/Organization');
const { tenantStorage } = require('../../../src/utils/tenantContext');

// Re-require middleware fresh each test to reset module-level cache
let tenantMiddleware;

const mockReqResNext = (host = 'localhost:3000', headers = {}) => {
    const req = { headers: { host, ...headers } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();
    return { req, res, next };
};

describe('tenantMiddleware — Unit Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        // Re-require to reset cached _cachedDefaultOrg
        delete process.env.DEFAULT_TENANT_ID;
        jest.mock('../../../src/models/Organization', () => ({
            Organization: {
                findOne: jest.fn(),
                findOneAndUpdate: jest.fn(),
                create: jest.fn(),
            }
        }));
        jest.mock('../../../src/utils/tenantContext', () => ({
            tenantStorage: {
                run: jest.fn((ctx, fn) => fn()),
                getStore: jest.fn(),
            }
        }));
        tenantMiddleware = require('../../../src/middleware/tenant').tenantMiddleware;
    });

    test('should use DEFAULT_TENANT_ID env var when set and call next()', async () => {
        process.env.DEFAULT_TENANT_ID = '64a1b2c3d4e5f6789012abcd';
        // Re-require after env set
        jest.resetModules();
        const { tenantMiddleware: mw } = require('../../../src/middleware/tenant');
        const { tenantStorage: ts } = require('../../../src/utils/tenantContext');
        ts.run = jest.fn((ctx, fn) => fn());

        const { req, res, next } = mockReqResNext();
        await mw(req, res, next);
        expect(next).toHaveBeenCalled();
        delete process.env.DEFAULT_TENANT_ID;
    });

    test('should fallback to default org when host is localhost', async () => {
        const { Organization: Org } = require('../../../src/models/Organization');
        const { tenantStorage: ts } = require('../../../src/utils/tenantContext');
        const mockOrg = { _id: 'org123', name: 'Default College', subdomain: 'default' };
        Org.findOneAndUpdate.mockResolvedValue(mockOrg);
        ts.run = jest.fn((ctx, fn) => fn());

        const { req, res, next } = mockReqResNext('localhost:5000');
        await tenantMiddleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    test('should respond 500 when Organization lookup throws', async () => {
        const { Organization: Org } = require('../../../src/models/Organization');
        Org.findOneAndUpdate.mockRejectedValue(new Error('DB failure'));
        Org.findOne.mockRejectedValue(new Error('DB failure'));

        const { req, res, next } = mockReqResNext('localhost:5000');
        await tenantMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(next).not.toHaveBeenCalled();
    });

    test('should resolve org by subdomain when multi-part domain is detected', async () => {
        const { Organization: Org } = require('../../../src/models/Organization');
        const { tenantStorage: ts } = require('../../../src/utils/tenantContext');
        const mockOrg = { _id: 'org456', name: 'Subdomain Org', subdomain: 'lnmi' };
        Org.findOne.mockResolvedValue(mockOrg);
        ts.run = jest.fn((ctx, fn) => fn());

        const { req, res, next } = mockReqResNext('lnmi.example.com');
        await tenantMiddleware(req, res, next);
        expect(Org.findOne).toHaveBeenCalledWith({ subdomain: 'lnmi' });
        expect(next).toHaveBeenCalled();
    });
});

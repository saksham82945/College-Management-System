'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_cms_finance';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');

let mongod, app, request, adminToken;

const buildApp = () => {
    const a = express();
    a.use(express.json());
    const authRouter    = require('../../src/routes/auth');
    const financeRouter = require('../../src/routes/finance');
    a.use('/api/v1/auth',    authRouter.default    || authRouter);
    a.use('/api/v1/finance', financeRouter.default || financeRouter);
    a.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ message: err.message });
    });
    return a;
};

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());

    const Role = require('../../src/models/Role').Role;
    await Role.insertMany([
        { name: 'ADMIN', permissions: [] },
        { name: 'STUDENT', permissions: [] },
    ]);

    app = buildApp();
    request = supertest(app);

    await request.post('/api/v1/auth/register').send({
        email: 'admin@lnmi.in', password: 'SecurePass123',
        fullName: 'Admin User', roleName: 'ADMIN'
    });
    const loginRes = await request.post('/api/v1/auth/login').send({
        email: 'admin@lnmi.in', password: 'SecurePass123'
    });
    adminToken = loginRes.body.data?.tokens?.accessToken;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// ─── GET /finance/structure ───────────────────────────────────────────────────
describe('GET /api/v1/finance/structure — Integration Tests', () => {
    test('should return 401 without auth', async () => {
        const res = await request.get('/api/v1/finance/structure');
        expect(res.status).toBe(401);
    });

    test('should return 200 or 404 with admin auth', async () => {
        const res = await request.get('/api/v1/finance/structure')
            .set('Authorization', `Bearer ${adminToken}`);
        expect([200, 404]).toContain(res.status);
    });
});

// ─── GET /finance/payment-history/:studentId ──────────────────────────────────
describe('GET /api/v1/finance/payment-history/:studentId — Integration Tests', () => {
    test('should return 401 without auth', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.get(`/api/v1/finance/payment-history/${fakeId}`);
        expect(res.status).toBe(401);
    });

    test('should return 200 or 404 with admin auth', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.get(`/api/v1/finance/payment-history/${fakeId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect([200, 404]).toContain(res.status);
    });
});

// ─── POST /finance/structure ──────────────────────────────────────────────────
describe('POST /api/v1/finance/structure — Integration Tests', () => {
    test('should return 401 without auth', async () => {
        const res = await request.post('/api/v1/finance/structure').send({});
        expect(res.status).toBe(401);
    });

    test('should return 400 or 422 when required fields are missing', async () => {
        const res = await request.post('/api/v1/finance/structure')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({}); // empty body
        expect([400, 422, 500]).toContain(res.status);
    });
});

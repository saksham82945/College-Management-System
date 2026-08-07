'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_cms_staff';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');

let mongod, app, request, adminToken;

const buildApp = () => {
    const a = express();
    a.use(express.json());
    const authRouter = require('../../src/routes/auth');
    const staffRouter = require('../../src/routes/staff');
    a.use('/api/v1/auth',  authRouter.default  || authRouter);
    a.use('/api/v1/staff', staffRouter.default || staffRouter);
    a.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ message: err.message, errorCode: err.errorCode });
    });
    return a;
};

const makeStaff = (suffix = Date.now()) => ({
    firstName: `Test${suffix}`,
    lastName: 'Staff',
    email: `staff${suffix}@lnmi.in`,
    password: 'Staff@123',
    employeeId: `STF-${suffix}`,
    role: 'Office Staff',
    department: 'Administration',
    joiningDate: '2024-01-15',
    salary: { base: 35000, allowances: 5000, deductions: 1500 },
    contactInfo: { phone: '9876543210', address: 'Campus' },
});

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());

    const Role = require('../../src/models/Role').Role;
    await Role.insertMany([
        { name: 'ADMIN', permissions: [] },
        { name: 'STAFF', permissions: [] },
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

// ─── GET /staff ───────────────────────────────────────────────────────────────
describe('GET /api/v1/staff — Integration Tests', () => {
    test('should return 401 without auth token', async () => {
        const res = await request.get('/api/v1/staff');
        expect(res.status).toBe(401);
    });

    test('should return 200 with an array of staff', async () => {
        const res = await request.get('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

// ─── POST /staff ──────────────────────────────────────────────────────────────
describe('POST /api/v1/staff — Integration Tests', () => {
    test('should create a new staff member (201)', async () => {
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(makeStaff());
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.staff).toBeDefined();
    });

    test('should reject creation without auth (401)', async () => {
        const res = await request.post('/api/v1/staff').send(makeStaff());
        expect(res.status).toBe(401);
    });

    test('should reject duplicate email (400)', async () => {
        const staff = makeStaff(99991);
        await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`).send(staff);
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`).send(staff);
        expect(res.status).toBe(400);
    });

    test('should reject missing required fields (400)', async () => {
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ email: 'incomplete@lnmi.in' }); // missing firstName, role, dept, etc.
        expect(res.status).toBe(400);
    });

    test('should reject missing joiningDate (400)', async () => {
        const { joiningDate, ...noDate } = makeStaff(99992);
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(noDate);
        expect(res.status).toBe(400);
    });
});

// ─── GET /staff/:id ───────────────────────────────────────────────────────────
describe('GET /api/v1/staff/:id — Integration Tests', () => {
    let createdStaffId;

    beforeAll(async () => {
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(makeStaff(88881));
        createdStaffId = res.body.data?.staff?._id;
    });

    test('should return staff by ID (200)', async () => {
        if (!createdStaffId) return;
        const res = await request.get(`/api/v1/staff/${createdStaffId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
    });

    test('should return 404 for non-existent ID', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.get(`/api/v1/staff/${fakeId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(404);
    });
});

// ─── DELETE /staff/:id ────────────────────────────────────────────────────────
describe('DELETE /api/v1/staff/:id — Integration Tests', () => {
    let staffToDeleteId;

    beforeAll(async () => {
        const res = await request.post('/api/v1/staff')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(makeStaff(77771));
        staffToDeleteId = res.body.data?.staff?._id;
    });

    test('should delete a staff member (200)', async () => {
        if (!staffToDeleteId) return;
        const res = await request.delete(`/api/v1/staff/${staffToDeleteId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('should return 404 when deleting already-deleted staff', async () => {
        if (!staffToDeleteId) return;
        const res = await request.delete(`/api/v1/staff/${staffToDeleteId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(404);
    });

    test('should return 401 without auth when deleting', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request.delete(`/api/v1/staff/${fakeId}`);
        expect(res.status).toBe(401);
    });
});

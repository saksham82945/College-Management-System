'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_cms_dashboard';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');

let mongod, app, request, adminToken, studentToken;

const buildApp = () => {
    const a = express();
    a.use(express.json());
    const authRouter     = require('../../src/routes/auth');
    const dashboardRouter = require('../../src/routes/dashboard');
    a.use('/api/v1/auth',      authRouter.default      || authRouter);
    a.use('/api/v1/dashboard', dashboardRouter.default || dashboardRouter);
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
        { name: 'TEACHER', permissions: [] },
    ]);

    app = buildApp();
    request = supertest(app);

    // Admin
    await request.post('/api/v1/auth/register').send({
        email: 'admin@lnmi.in', password: 'SecurePass123',
        fullName: 'Admin User', roleName: 'ADMIN'
    });
    const adminLogin = await request.post('/api/v1/auth/login').send({
        email: 'admin@lnmi.in', password: 'SecurePass123'
    });
    adminToken = adminLogin.body.data?.tokens?.accessToken;

    // Student
    await request.post('/api/v1/auth/register').send({
        email: 'student@lnmi.in', password: 'SecurePass123',
        fullName: 'Test Student', roleName: 'ADMIN' // ADMIN because direct registration is only for admin
    });
    const stuLogin = await request.post('/api/v1/auth/login').send({
        email: 'student@lnmi.in', password: 'SecurePass123'
    });
    studentToken = stuLogin.body.data?.tokens?.accessToken;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
describe('GET /api/v1/dashboard/admin — Integration Tests', () => {
    test('should return 401 without auth token', async () => {
        const res = await request.get('/api/v1/dashboard/admin');
        expect(res.status).toBe(401);
    });

    test('should return 200 with stats for authenticated admin', async () => {
        const res = await request.get('/api/v1/dashboard/admin')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('totalStudents');
        expect(res.body.data).toHaveProperty('totalTeachers');
        expect(res.body.data).toHaveProperty('attendance');
        expect(res.body.data).toHaveProperty('recentAdmissions');
        expect(res.body.data).toHaveProperty('chartData');
    });

    test('should return numeric values for totalStudents and totalTeachers', async () => {
        const res = await request.get('/api/v1/dashboard/admin')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(typeof res.body.data.totalStudents).toBe('number');
        expect(typeof res.body.data.totalTeachers).toBe('number');
    });

    test('attendance should have required fields', async () => {
        const res = await request.get('/api/v1/dashboard/admin')
            .set('Authorization', `Bearer ${adminToken}`);
        const att = res.body.data.attendance;
        expect(att).toHaveProperty('total');
        expect(att).toHaveProperty('present');
        expect(att).toHaveProperty('absent');
        expect(att).toHaveProperty('presentPct');
    });

    test('recentAdmissions should be an array', async () => {
        const res = await request.get('/api/v1/dashboard/admin')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(Array.isArray(res.body.data.recentAdmissions)).toBe(true);
    });
});

// ─── Student Dashboard ────────────────────────────────────────────────────────
describe('GET /api/v1/dashboard/student — Integration Tests', () => {
    test('should return 401 without auth token', async () => {
        const res = await request.get('/api/v1/dashboard/student');
        expect(res.status).toBe(401);
    });

    test('should return 200 for authenticated user (even without student profile)', async () => {
        const res = await request.get('/api/v1/dashboard/student')
            .set('Authorization', `Bearer ${studentToken}`);
        // Returns 200 with null student if no profile found
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});

// ─── Teacher Dashboard ────────────────────────────────────────────────────────
describe('GET /api/v1/dashboard/teacher — Integration Tests', () => {
    test('should return 401 without auth token', async () => {
        const res = await request.get('/api/v1/dashboard/teacher');
        expect(res.status).toBe(401);
    });

    test('should return 200 for authenticated user', async () => {
        const res = await request.get('/api/v1/dashboard/teacher')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('totalStudents');
    });
});

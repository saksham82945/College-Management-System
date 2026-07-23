'use strict';
// Set env before requiring anything
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_cms_auth';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');

// ─── App setup (minimal) ──────────────────────────────────────────────────────
let mongod;
let app;
let request;

const buildApp = () => {
    const app = express();
    app.use(express.json());
    
    // Apply routes
    const authRouter = require('../../src/routes/auth');
    app.use('/api/v1/auth', authRouter.default || authRouter);
    
    // Global error handler
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({ message: err.message });
    });
    
    return app;
};

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    
    // Seed roles
    const Role = require('../../src/models/Role').Role;
    await Role.insertMany([
        { name: 'ADMIN', permissions: [] },
        { name: 'STUDENT', permissions: [] },
        { name: 'TEACHER', permissions: [] },
    ]);
    
    app = buildApp();
    request = supertest(app);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

afterEach(async () => {
    // Clean users between tests (keep roles)
    const User = require('../../src/models/User').User;
    await User.deleteMany({});
});

// ─── Registration Tests ───────────────────────────────────────────────────────
describe('POST /api/v1/auth/register — Integration Tests', () => {
    const validUser = {
        email: 'admin@lnmi.in',
        password: 'SecurePass123',
        fullName: 'Admin User',
        roleName: 'ADMIN'
    };

    test('should register a new ADMIN user successfully (201)', async () => {
        const res = await request.post('/api/v1/auth/register').send(validUser);
        expect(res.status).toBe(201);
        expect(res.body.data.user.email).toBe(validUser.email);
        expect(res.body.data.tokens).toHaveProperty('accessToken');
    });

    test('should reject duplicate email (400)', async () => {
        await request.post('/api/v1/auth/register').send(validUser);
        const res = await request.post('/api/v1/auth/register').send(validUser);
        expect(res.status).toBe(400);
        expect(res.body.errorCode).toBe('USER_EXISTS');
    });

    test('should reject missing fullName (400)', async () => {
        const res = await request.post('/api/v1/auth/register').send({
            email: 'test@lnmi.in', password: 'SecurePass123'
        });
        expect(res.status).toBe(400);
    });

    test('should reject missing email (400)', async () => {
        const res = await request.post('/api/v1/auth/register').send({
            fullName: 'Test', password: 'SecurePass123'
        });
        expect(res.status).toBe(400);
    });

    test('should reject invalid email format (400)', async () => {
        const res = await request.post('/api/v1/auth/register').send({
            email: 'not-an-email', password: 'SecurePass123', fullName: 'Test'
        });
        expect(res.status).toBe(400);
    });

    test('should reject password shorter than 8 characters (400)', async () => {
        const res = await request.post('/api/v1/auth/register').send({
            email: 'test@lnmi.in', password: 'short', fullName: 'Test'
        });
        expect(res.status).toBe(400);
    });

    test('should reject TEACHER registration (403)', async () => {
        const res = await request.post('/api/v1/auth/register').send({
            email: 'teacher@lnmi.in', password: 'SecurePass123', fullName: 'Teacher', roleName: 'TEACHER'
        });
        expect(res.status).toBe(403);
    });
});

// ─── Login Tests ──────────────────────────────────────────────────────────────
describe('POST /api/v1/auth/login — Integration Tests', () => {
    beforeEach(async () => {
        await request.post('/api/v1/auth/register').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123',
            fullName: 'Admin User',
            roleName: 'ADMIN'
        });
    });

    test('should login with valid credentials (200)', async () => {
        const res = await request.post('/api/v1/auth/login').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123'
        });
        expect(res.status).toBe(200);
        expect(res.body.data.tokens).toHaveProperty('accessToken');
        expect(res.body.data.tokens).toHaveProperty('refreshToken');
    });

    test('should return 401 for wrong password', async () => {
        const res = await request.post('/api/v1/auth/login').send({
            email: 'admin@lnmi.in',
            password: 'WrongPassword'
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });

    test('should return 401 for non-existent email', async () => {
        const res = await request.post('/api/v1/auth/login').send({
            email: 'nobody@lnmi.in',
            password: 'AnyPassword123'
        });
        expect(res.status).toBe(401);
    });

    test('should return 400 when email is missing', async () => {
        const res = await request.post('/api/v1/auth/login').send({ password: 'SecurePass123' });
        expect(res.status).toBe(400);
    });

    test('should return 400 when password is missing', async () => {
        const res = await request.post('/api/v1/auth/login').send({ email: 'admin@lnmi.in' });
        expect(res.status).toBe(400);
    });
});

// ─── Token Refresh Tests ──────────────────────────────────────────────────────
describe('POST /api/v1/auth/refresh — Integration Tests', () => {
    let refreshToken;

    beforeEach(async () => {
        await request.post('/api/v1/auth/register').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123',
            fullName: 'Admin User',
            roleName: 'ADMIN'
        });
        const loginRes = await request.post('/api/v1/auth/login').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123'
        });
        refreshToken = loginRes.body.data.tokens.refreshToken;
    });

    test('should return new tokens for a valid refresh token', async () => {
        const res = await request.post('/api/v1/auth/refresh').send({ refreshToken });
        expect(res.status).toBe(200);
        expect(res.body.data.tokens).toHaveProperty('accessToken');
    });

    test('should return 400 if refreshToken is missing', async () => {
        const res = await request.post('/api/v1/auth/refresh').send({});
        expect(res.status).toBe(400);
    });

    test('should return 401 for an invalid refresh token', async () => {
        const res = await request.post('/api/v1/auth/refresh').send({ refreshToken: 'bad.token.here' });
        expect(res.status).toBe(401);
    });
});

// ─── Reset Password Tests ─────────────────────────────────────────────────────
describe('POST /api/v1/auth/reset-password — Integration Tests', () => {
    beforeEach(async () => {
        await request.post('/api/v1/auth/register').send({
            email: 'admin@lnmi.in',
            password: 'OldPassword123',
            fullName: 'Admin User',
            roleName: 'ADMIN'
        });
    });

    test('should successfully reset a password (200)', async () => {
        const res = await request.post('/api/v1/auth/reset-password').send({
            email: 'admin@lnmi.in',
            newPassword: 'NewPassword456'
        });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('should allow login with new password after reset', async () => {
        await request.post('/api/v1/auth/reset-password').send({
            email: 'admin@lnmi.in',
            newPassword: 'NewPassword456'
        });
        const loginRes = await request.post('/api/v1/auth/login').send({
            email: 'admin@lnmi.in',
            password: 'NewPassword456'
        });
        expect(loginRes.status).toBe(200);
    });

    test('should return 200 even for non-existent email (security: no enumeration)', async () => {
        const res = await request.post('/api/v1/auth/reset-password').send({
            email: 'notexist@lnmi.in',
            newPassword: 'NewPassword456'
        });
        expect(res.status).toBe(200);
    });

    test('should reject new password shorter than 8 chars (400)', async () => {
        const res = await request.post('/api/v1/auth/reset-password').send({
            email: 'admin@lnmi.in',
            newPassword: 'short'
        });
        expect(res.status).toBe(400);
    });
});

// ─── Preferences Endpoint Tests ───────────────────────────────────────────────
describe('PUT /api/v1/auth/preferences — Integration Tests', () => {
    let accessToken;

    beforeEach(async () => {
        await request.post('/api/v1/auth/register').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123',
            fullName: 'Admin User',
            roleName: 'ADMIN'
        });
        const loginRes = await request.post('/api/v1/auth/login').send({
            email: 'admin@lnmi.in',
            password: 'SecurePass123'
        });
        accessToken = loginRes.body.data.tokens.accessToken;
    });

    test('should update preferences successfully (200)', async () => {
        const res = await request
            .put('/api/v1/auth/preferences')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ phone: '9876543210', emailNotifications: true, smsNotifications: true });
        
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.phone).toBe('9876543210');
        expect(res.body.data.preferences.smsNotifications).toBe(true);
    });

    test('should return 401 without auth token', async () => {
        const res = await request.put('/api/v1/auth/preferences').send({
            phone: '9876543210'
        });
        expect(res.status).toBe(401);
    });

    test('should update only phone without affecting email toggle', async () => {
        const res = await request
            .put('/api/v1/auth/preferences')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ phone: '9111222333' });
        
        expect(res.status).toBe(200);
        expect(res.body.data.phone).toBe('9111222333');
        // emailNotifications default should still be true
        expect(res.body.data.preferences.emailNotifications).toBe(true);
    });

    test('should allow disabling email notifications', async () => {
        const res = await request
            .put('/api/v1/auth/preferences')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({ emailNotifications: false });
        
        expect(res.status).toBe(200);
        expect(res.body.data.preferences.emailNotifications).toBe(false);
    });
});

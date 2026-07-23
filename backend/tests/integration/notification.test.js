'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test_cms_notification';

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const express = require('express');

let mongod, app, request;
let adminToken;

const buildApp = () => {
    const app = express();
    app.use(express.json());
    const authRouter = require('../../src/routes/auth');
    const notifRouter = require('../../src/routes/notification');
    app.use('/api/v1/auth', authRouter.default || authRouter);
    app.use('/api/v1/notifications', notifRouter.default || notifRouter);
    return app;
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

    // Create admin and login to get token
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
    adminToken = loginRes.body.data.tokens.accessToken;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// ─── GET /notifications ───────────────────────────────────────────────────────
describe('GET /api/v1/notifications — Integration Tests', () => {
    test('should return 401 without auth token', async () => {
        const res = await request.get('/api/v1/notifications');
        expect(res.status).toBe(401);
    });

    test('should return 200 with empty notifications initially', async () => {
        const res = await request
            .get('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('unreadCount');
    });
});

// ─── POST /notifications ──────────────────────────────────────────────────────
describe('POST /api/v1/notifications — Integration Tests', () => {
    test('should create a notification (201)', async () => {
        const res = await request
            .post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Test Alert', message: 'System test notification', type: 'INFO' });
        expect(res.status).toBe(201);
        expect(res.body.data.title).toBe('Test Alert');
        expect(res.body.data.type).toBe('INFO');
    });

    test('should return 400 if title is missing', async () => {
        const res = await request
            .post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ message: 'No title provided' });
        expect(res.status).toBe(400);
    });

    test('should return 400 if message is missing', async () => {
        const res = await request
            .post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'No message' });
        expect(res.status).toBe(400);
    });

    test('should return 401 without auth token', async () => {
        const res = await request.post('/api/v1/notifications').send({
            title: 'Test', message: 'Test message'
        });
        expect(res.status).toBe(401);
    });
});

// ─── PUT /:id/read ────────────────────────────────────────────────────────────
describe('PUT /api/v1/notifications/:id/read — Integration Tests', () => {
    let notifId;

    beforeEach(async () => {
        const createRes = await request
            .post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Mark Read Test', message: 'Testing mark as read', type: 'INFO' });
        notifId = createRes.body.data._id;
    });

    test('should mark a notification as read (200)', async () => {
        const res = await request
            .put(`/api/v1/notifications/${notifId}/read`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.data.isRead).toBe(true);
    });

    test('should return 404 for non-existent notification id', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request
            .put(`/api/v1/notifications/${fakeId}/read`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(404);
    });
});

// ─── PUT /read-all ────────────────────────────────────────────────────────────
describe('PUT /api/v1/notifications/read-all — Integration Tests', () => {
    beforeEach(async () => {
        // Create two unread notifications
        await request.post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Notif 1', message: 'First', type: 'INFO' });
        await request.post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Notif 2', message: 'Second', type: 'WARNING' });
    });

    test('should mark all notifications as read', async () => {
        const res = await request
            .put('/api/v1/notifications/read-all')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toContain('read');

        // Verify none are unread
        const listRes = await request
            .get('/api/v1/notifications?unreadOnly=true')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(listRes.body.total).toBe(0);
    });
});

// ─── DELETE /:id ──────────────────────────────────────────────────────────────
describe('DELETE /api/v1/notifications/:id — Integration Tests', () => {
    let notifId;

    beforeEach(async () => {
        const createRes = await request
            .post('/api/v1/notifications')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Delete Me', message: 'To be deleted', type: 'INFO' });
        notifId = createRes.body.data._id;
    });

    test('should delete a notification (200)', async () => {
        const res = await request
            .delete(`/api/v1/notifications/${notifId}`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toContain('deleted');
    });

    test('should return 401 without token', async () => {
        const res = await request.delete(`/api/v1/notifications/${notifId}`);
        expect(res.status).toBe(401);
    });
});

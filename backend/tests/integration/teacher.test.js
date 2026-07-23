'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-integration';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-integration';

const supertest = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;
let request;
let adminToken;

const buildApp = () => {
    const app = express();
    app.use(express.json());
    
    const teacherRouter = require('../../src/routes/teacher');
    app.use('/api/v1/teachers', teacherRouter.default || teacherRouter);
    
    const authRouter = require('../../src/routes/auth');
    app.use('/api/v1/auth', authRouter.default || authRouter);
    
    return app;
};

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());

    const Role = require('../../src/models/Role').Role;
    await Role.insertMany([
        { name: 'ADMIN', permissions: [] },
        { name: 'TEACHER', permissions: [] },
    ]);

    app = buildApp();
    request = supertest(app);

    // Register and login admin
    await request.post('/api/v1/auth/register').send({
        email: 'admin@lnmi.in', password: 'SecurePass123', fullName: 'Admin', roleName: 'ADMIN'
    });
    const loginRes = await request.post('/api/v1/auth/login').send({
        email: 'admin@lnmi.in', password: 'SecurePass123'
    });
    adminToken = loginRes.body.data.tokens.accessToken;
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

describe('POST /api/v1/teachers — Integration Tests', () => {
    test('should create a new teacher successfully', async () => {
        const payload = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@lnmi.in',
            employeeId: 'EMP101',
            department: 'Computer Science',
            designation: 'Professor',
            qualification: ['PhD'],
            experience: 10,
            joiningDate: '2026-01-01',
            salary: 75000,
            contactInfo: {
                phone: '9876543210',
                address: 'LNMI Campus'
            }
        };

        const res = await request
            .post('/api/v1/teachers')
            .set('Authorization', `Bearer ${adminToken}`)
            .send(payload);

        console.log('TEST RESPONSE:', res.status, res.body);
        expect(res.status).toBe(201);
    });
});

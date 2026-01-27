import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index';
import { User } from '../../models/User';
import { Role } from '../../models/Role';

beforeAll(async () => {
    // connect to local mongodb
    const mongoUri = 'mongodb://localhost:27017/college-management-test-suite';
    try {
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        });
        console.log('Connected to test database');
    } catch (err) {
        console.error('Test DB Connection Error:', err);
    }

    // Create roles
    try {
        await Role.create([
            { name: 'ADMIN', description: 'Administrator' },
            { name: 'TEACHER', description: 'Teacher' },
            { name: 'STUDENT', description: 'Student' },
            { name: 'STAFF', description: 'Staff' }
        ]);
    } catch (e) {
        // Roles might already exist
    }
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('Authentication API', () => {
    describe('POST /api/v1/auth/register', () => {
        it('should register a new user successfully', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'Password123!',
                fullName: 'Test User',
                phone: '+1234567890',
                roleName: 'STUDENT'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('user');
            expect(response.body.data).toHaveProperty('tokens');
            expect(response.body.data.user.email).toBe(userData.email);
        });

        it('should reject duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'Password123!',
                fullName: 'Test User',
                roleName: 'STUDENT'
            };

            // First registration
            await request(app)
                .post('/api/v1/auth/register')
                .send(userData);

            // Second registration with same email
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(userData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        it('should reject missing required fields', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'test@example.com'
                });

            expect(response.status).toBeGreaterThanOrEqual(400);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            // Register a user
            await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'login@example.com',
                    password: 'Password123!',
                    fullName: 'Login User',
                    roleName: 'STUDENT'
                });
        });

        it('should login with correct credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'Password123!'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('tokens');
        });

        it('should reject incorrect password', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'WrongPassword!'
                });

            expect(response.status).toBe(401);
        });

        it('should reject non-existent user', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'Password123!'
                });

            expect(response.status).toBe(401);
        });
    });
});

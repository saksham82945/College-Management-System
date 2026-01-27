const request = require('supertest');
const express = require('express');
const { User } = require('../../src/models/User');
const { Role } = require('../../src/models/Role');
const { hashPassword } = require('../../src/utils/password');

// We need to import the app or routes. 
// Assuming auth routes are exported or we can just mount the controller.
const authRoutes = require('../../src/routes/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Integration Tests', () => {
    let studentRole;

    beforeEach(async () => {
        // Seed DB before test
        studentRole = await Role.create({ name: 'STUDENT', description: 'Student role' });
        const hashedPassword = await hashPassword('password123');

        await User.create({
            email: 'test@student.com',
            password: hashedPassword,
            fullName: 'Test Student',
            roleAssignments: [{ roleId: studentRole._id }]
        });
    });

    describe('POST /api/auth/login', () => {
        it('successfully logs in and returns token', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@student.com', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Login successful');
            expect(response.body.data.tokens).toBeDefined();
            expect(response.body.data.user.roles).toContain('STUDENT');
        });

        it('rejects invalid credentials with 401', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@student.com', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('success', false);
        });
    });
});

const mongoose = require('mongoose');
const { User } = require('../../models/User');

describe('User Model Schema', () => {
    it('throws validation error if required fields are missing', () => {
        const user = new User({});
        const err = user.validateSync();
        expect(err.errors.email).toBeDefined();
        expect(err.errors.password).toBeDefined();
        expect(err.errors.fullName).toBeDefined();
    });

    it('successfully creates standard user', () => {
        const user = new User({
            email: 'valid@example.com',
            password: 'password123',
            fullName: 'Test User'
        });
        const err = user.validateSync();
        expect(err).toBeUndefined();
    });

    it('sets status to active by default', () => {
        const user = new User({
            email: 'active@example.com',
            password: 'pwd',
            fullName: 'Active User'
        });
        expect(user.status).toBe('active');
    });
});

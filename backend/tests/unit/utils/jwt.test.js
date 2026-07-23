'use strict';
process.env.JWT_SECRET = 'test-jwt-secret-for-unit-tests';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-for-unit-tests';
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

const { generateTokens, verifyAccessToken, verifyRefreshToken } = require('../../../src/utils/jwt');

describe('JWT Utility — Unit Tests', () => {
    const payload = { userId: 'user123', email: 'test@lnmi.in', roles: ['ADMIN'] };

    describe('generateTokens()', () => {
        test('should return accessToken and refreshToken', () => {
            const tokens = generateTokens(payload);
            expect(tokens).toHaveProperty('accessToken');
            expect(tokens).toHaveProperty('refreshToken');
        });

        test('accessToken should be a non-empty string', () => {
            const { accessToken } = generateTokens(payload);
            expect(typeof accessToken).toBe('string');
            expect(accessToken.length).toBeGreaterThan(20);
        });

        test('tokens should be different from each other', () => {
            const { accessToken, refreshToken } = generateTokens(payload);
            expect(accessToken).not.toBe(refreshToken);
        });
    });

    describe('verifyAccessToken()', () => {
        test('should decode and return the payload from a valid token', () => {
            const { accessToken } = generateTokens(payload);
            const decoded = verifyAccessToken(accessToken);
            expect(decoded).toBeTruthy();
            expect(decoded.userId).toBe(payload.userId);
            expect(decoded.email).toBe(payload.email);
        });

        test('should return null for a tampered token', () => {
            const { accessToken } = generateTokens(payload);
            const tampered = accessToken + 'garbage';
            expect(verifyAccessToken(tampered)).toBeNull();
        });

        test('should return null for an empty string', () => {
            expect(verifyAccessToken('')).toBeNull();
        });

        test('should return null for a refresh token used as access token', () => {
            const { refreshToken } = generateTokens(payload);
            // refresh token signed with different secret — should fail
            expect(verifyAccessToken(refreshToken)).toBeNull();
        });
    });

    describe('verifyRefreshToken()', () => {
        test('should decode and return the payload from a valid refresh token', () => {
            const { refreshToken } = generateTokens(payload);
            const decoded = verifyRefreshToken(refreshToken);
            expect(decoded).toBeTruthy();
            expect(decoded.userId).toBe(payload.userId);
        });

        test('should return null for an invalid refresh token', () => {
            expect(verifyRefreshToken('invalid.token.here')).toBeNull();
        });
    });
});

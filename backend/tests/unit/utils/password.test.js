'use strict';
const { hashPassword, comparePassword } = require('../../../src/utils/password');

describe('Password Utility — Unit Tests', () => {
    
    describe('hashPassword()', () => {
        test('should return a hashed string different from the original', async () => {
            const hash = await hashPassword('mySecret123');
            expect(hash).toBeDefined();
            expect(hash).not.toBe('mySecret123');
            expect(typeof hash).toBe('string');
        });

        test('should produce a bcrypt hash (starts with $2b$ or $2a$)', async () => {
            const hash = await hashPassword('testPassword');
            expect(hash).toMatch(/^\$2[ab]\$/);
        });

        test('should produce different hashes for the same password (salt)', async () => {
            const hash1 = await hashPassword('samePassword');
            const hash2 = await hashPassword('samePassword');
            expect(hash1).not.toBe(hash2);
        });
    });

    describe('comparePassword()', () => {
        test('should return true when password matches hash', async () => {
            const password = 'mySecret123';
            const hash = await hashPassword(password);
            const result = await comparePassword(password, hash);
            expect(result).toBe(true);
        });

        test('should return false when password does NOT match hash', async () => {
            const hash = await hashPassword('correctPassword');
            const result = await comparePassword('wrongPassword', hash);
            expect(result).toBe(false);
        });

        test('should return false for empty string against real hash', async () => {
            const hash = await hashPassword('somePassword');
            const result = await comparePassword('', hash);
            expect(result).toBe(false);
        });
    });
});

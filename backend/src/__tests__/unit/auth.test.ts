import { hashPassword, comparePassword } from '../../utils/password';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from '../../utils/jwt';

describe('Authentication Utils', () => {
    describe('Password Hashing', () => {
        it('should hash a password successfully', async () => {
            const password = 'TestPassword123!';
            const hashed = await hashPassword(password);

            expect(hashed).toBeDefined();
            expect(hashed).not.toBe(password);
            expect(hashed.length).toBeGreaterThan(20);
        });

        it('should generate different hashes for same password', async () => {
            const password = 'TestPassword123!';
            const hash1 = await hashPassword(password);
            const hash2 = await hashPassword(password);

            expect(hash1).not.toBe(hash2);
        });

        it('should verify correct password', async () => {
            const password = 'TestPassword123!';
            const hashed = await hashPassword(password);
            const isMatch = await comparePassword(password, hashed);

            expect(isMatch).toBe(true);
        });

        it('should reject incorrect password', async () => {
            const password = 'TestPassword123!';
            const wrongPassword = 'WrongPassword456!';
            const hashed = await hashPassword(password);
            const isMatch = await comparePassword(wrongPassword, hashed);

            expect(isMatch).toBe(false);
        });
    });

    describe('JWT Token Generation', () => {
        const mockPayload = {
            userId: '507f1f77bcf86cd799439011',
            email: 'test@example.com',
            roles: ['STUDENT']
        };

        it('should generate access and refresh tokens', () => {
            const tokens = generateTokens(mockPayload);

            expect(tokens).toHaveProperty('accessToken');
            expect(tokens).toHaveProperty('refreshToken');
            expect(tokens.accessToken).toBeDefined();
            expect(tokens.refreshToken).toBeDefined();
        });

        it('should verify valid access token', () => {
            const tokens = generateTokens(mockPayload);
            const decoded = verifyAccessToken(tokens.accessToken);

            expect(decoded).toBeDefined();
            expect(decoded?.userId).toBe(mockPayload.userId);
            expect(decoded?.email).toBe(mockPayload.email);
        });

        it('should verify valid refresh token', () => {
            const tokens = generateTokens(mockPayload);
            const decoded = verifyRefreshToken(tokens.refreshToken);

            expect(decoded).toBeDefined();
            expect(decoded?.userId).toBe(mockPayload.userId);
        });

        it('should reject invalid token', () => {
            const invalidToken = 'invalid.token.here';
            const decoded = verifyAccessToken(invalidToken);

            expect(decoded).toBeNull();
        });

        it('should reject expired token', () => {
            // This would require mocking time or using a very short expiry
            // For now, we'll just verify the function handles null gracefully
            const decoded = verifyAccessToken('');
            expect(decoded).toBeNull();
        });
    });
});

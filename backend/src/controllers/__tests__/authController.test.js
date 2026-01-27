const { authLogin } = require('../../controllers/auth');
const { User } = require('../../models/User');
const { comparePassword } = require('../../utils/password');
const { generateTokens } = require('../../utils/jwt');

jest.mock('../../models/User');
jest.mock('../../utils/password');
jest.mock('../../utils/jwt');

describe('AuthController - login', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('should return 401 for invalid email', async () => {
        req.body = { email: 'wrong@example.com', password: 'password123' };

        // Mock populate chain
        const mockPopulate = jest.fn().mockResolvedValue(null);
        User.findOne.mockReturnValue({ populate: mockPopulate });

        await authLogin(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: 'wrong@example.com' });
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            message: 'Invalid credentials',
        }));
    });

    it('should return token for valid credentials', async () => {
        req.body = { email: 'valid@example.com', password: 'password123' };

        const mockUser = {
            _id: 'user123',
            email: 'valid@example.com',
            fullName: 'Valid User',
            password: 'hashedpassword',
            roleAssignments: [{ roleId: { name: 'STUDENT' } }],
            save: jest.fn().mockResolvedValue(true)
        };

        const mockPopulate = jest.fn().mockResolvedValue(mockUser);
        User.findOne.mockReturnValue({ populate: mockPopulate });

        comparePassword.mockResolvedValue(true);
        generateTokens.mockReturnValue({ access: 'mock_token' });

        await authLogin(req, res);

        expect(comparePassword).toHaveBeenCalledWith('password123', 'hashedpassword');
        expect(generateTokens).toHaveBeenCalled();
        expect(mockUser.save).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Login successful',
            data: expect.objectContaining({
                tokens: { access: 'mock_token' },
            })
        }));
    });
});

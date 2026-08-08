'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

// Mock DB models
jest.mock('../../../src/models/Teacher', () => ({
    Teacher: {
        find: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    }
}));
jest.mock('../../../src/models/User', () => ({
    User: {
        findOne: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteOne: jest.fn(),
    }
}));
jest.mock('../../../src/models/Role', () => ({
    Role: {
        findOne: jest.fn(),
    }
}));

const { Teacher } = require('../../../src/models/Teacher');
const { User } = require('../../../src/models/User');
const { Role } = require('../../../src/models/Role');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn(),
}));

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Teacher Controller — Unit Tests', () => {
    let getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher;

    beforeAll(() => {
        ({ getAllTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } =
            require('../../../src/controllers/teacher'));
    });

    beforeEach(() => jest.clearAllMocks());

    // ─── getAllTeachers ───────────────────────────────────────────────────────
    describe('getAllTeachers()', () => {
        test('should return 200 with list of teachers', async () => {
            const mockTeachers = [
                { _id: 't1', employeeId: 'E001', department: 'CS', userId: { fullName: 'Alice Teacher', email: 'at@b.com' } },
            ];
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                sort: jest.fn().mockResolvedValue(mockTeachers),
            };
            Teacher.find.mockReturnValue(chainMock);

            const req = {};
            const res = mockRes();
            await getAllTeachers(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                data: mockTeachers
            }));
        });
    });

    // ─── getTeacherById ───────────────────────────────────────────────────────
    describe('getTeacherById()', () => {
        test('should return 404 for a teacher that does not exist', async () => {
            const chainMock = {
                populate: jest.fn().mockResolvedValue(null),
            };
            Teacher.findById.mockReturnValue(chainMock);

            const req = { params: { id: 'nonexistent' } };
            const res = mockRes();
            await getTeacherById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        test('should return teacher data for a valid ID', async () => {
            const fakeTeacher = {
                _id: 't1',
                employeeId: 'E001',
                userId: { fullName: 'Alice Teacher' }
            };
            const chainMock = {
                populate: jest.fn().mockResolvedValue(fakeTeacher),
            };
            Teacher.findById.mockReturnValue(chainMock);

            const req = { params: { id: 't1' } };
            const res = mockRes();
            await getTeacherById(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                data: fakeTeacher
            }));
        });
    });

    // ─── createTeacher ────────────────────────────────────────────────────────
    describe('createTeacher()', () => {
        test('should return 400 when required fields are missing', async () => {
            const req = { body: { firstName: 'John' } }; 
            const res = mockRes();
            await createTeacher(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 when email already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'dup@x.com' }); 
            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'dup@x.com',
                    employeeId: 'E002',
                    department: 'CS',
                    designation: 'Professor',
                    qualification: 'PhD',
                    joiningDate: '2023-01-01',
                    salary: 50000
                }
            };
            const res = mockRes();
            await createTeacher(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should create teacher successfully', async () => {
            User.findOne.mockResolvedValue(null);
            Role.findOne.mockResolvedValue({ _id: 'role1', name: 'TEACHER' });
            User.create.mockResolvedValue([{ _id: 'u1' }]);
            Teacher.create.mockResolvedValue([{ _id: 't1' }]);

            const req = {
                body: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'new@x.com',
                    employeeId: 'E002',
                    department: 'CS',
                    designation: 'Professor',
                    qualification: 'PhD',
                    joiningDate: '2023-01-01',
                    salary: 50000
                }
            };
            const res = mockRes();
            await createTeacher(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: true,
                data: expect.any(Object)
            }));
        });
    });
});

'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

// Mock all DB models
jest.mock('../../../src/models/Student', () => ({
    Student: {
        find: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
        countDocuments: jest.fn(),
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
        deleteOne: jest.fn(),
    }
}));
jest.mock('../../../src/models/StudentFee', () => ({
    StudentFee: { find: jest.fn() }
}));
jest.mock('../../../src/utils/password', () => ({
    hashPassword: jest.fn().mockResolvedValue('$2b$10$hashed'),
    comparePassword: jest.fn(),
}));

const { Student } = require('../../../src/models/Student');
const { User } = require('../../../src/models/User');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Student Controller — Unit Tests', () => {
    let getAllStudents, getStudentById, createStudent, deleteStudent;

    beforeAll(() => {
        ({ getAllStudents, getStudentById, createStudent, deleteStudent } =
            require('../../../src/controllers/student'));
    });

    beforeEach(() => jest.clearAllMocks());

    // ─── getAllStudents ───────────────────────────────────────────────────────
    describe('getAllStudents()', () => {
        test('should return 200 with list of students', async () => {
            const mockStudents = [
                { _id: 's1', rollNo: 'CS001', course: 'CS', userId: { fullName: 'Alice', email: 'a@b.com', phone: '123' }, semester: '1', section: 'A', status: 'active' },
                { _id: 's2', rollNo: 'CS002', course: 'CS', userId: { fullName: 'Bob', email: 'b@b.com', phone: '456' }, semester: '2', section: 'B', status: 'active' },
            ];
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(mockStudents),
            };
            Student.find.mockReturnValue(chainMock);
            Student.countDocuments.mockResolvedValue(2);

            const req = { query: { page: '1', size: '25' } };
            const res = mockRes();
            await getAllStudents(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({ total: 2 })
            }));
        });

        test('should exclude inactive students by default', async () => {
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue([]),
            };
            Student.find.mockReturnValue(chainMock);
            Student.countDocuments.mockResolvedValue(0);

            const req = { query: {} };
            const res = mockRes();
            await getAllStudents(req, res);

            // Should filter out inactive students
            expect(Student.find).toHaveBeenCalledWith(expect.objectContaining({
                status: { $ne: 'inactive' }
            }));
        });

        test('should filter by course if provided', async () => {
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue([]),
            };
            Student.find.mockReturnValue(chainMock);
            Student.countDocuments.mockResolvedValue(0);

            const req = { query: { course: 'MBA' } };
            const res = mockRes();
            await getAllStudents(req, res);

            expect(Student.find).toHaveBeenCalledWith(expect.objectContaining({ course: 'MBA' }));
        });
    });

    // ─── getStudentById ───────────────────────────────────────────────────────
    describe('getStudentById()', () => {
        test('should return 404 for a student that does not exist', async () => {
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(null),
            };
            Student.findById.mockReturnValue(chainMock);

            const req = { params: { id: 'nonexistent' } };
            const res = mockRes();
            await getStudentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });

        test('should return student data for a valid ID', async () => {
            const fakeStudent = {
                _id: 'stu1',
                rollNo: 'CS001',
                course: 'CS',
                semester: '1',
                section: 'A',
                status: 'active',
                userId: { fullName: 'Alice', email: 'alice@b.com', phone: '123' },
            };
            const chainMock = {
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(fakeStudent),
            };
            Student.findById.mockReturnValue(chainMock);

            const req = { params: { id: 'stu1' } };
            const res = mockRes();
            await getStudentById(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({ rollNo: 'CS001' })
            }));
        });
    });

    // ─── createStudent ────────────────────────────────────────────────────────
    describe('createStudent()', () => {
        test('should return 400 when required fields are missing', async () => {
            const req = { body: { email: 'x@x.com' } }; // missing password, fullName, rollNo
            const res = mockRes();
            await createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 when email already exists', async () => {
            User.findOne.mockResolvedValue({ email: 'dup@x.com' }); // Existing user
            const req = {
                body: {
                    email: 'dup@x.com',
                    password: 'pass1234',
                    fullName: 'Dup Student',
                    rollNo: 'ROLL001',
                    course: 'CS',
                    semester: '1',
                    section: 'A',
                    guardianInfo: { fatherName: 'Dad', fatherPhone: '1234567890' },
                }
            };
            const res = mockRes();
            await createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('should return 400 when guardian info is missing', async () => {
            User.findOne.mockResolvedValue(null);
            Student.findOne.mockResolvedValue(null);
            const req = {
                body: {
                    email: 'new@x.com',
                    password: 'pass1234',
                    fullName: 'New Student',
                    rollNo: 'ROLL002',
                    course: 'CS',
                    semester: '1',
                    section: 'A',
                    // no guardianInfo
                }
            };
            const res = mockRes();
            await createStudent(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});

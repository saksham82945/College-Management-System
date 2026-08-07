'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

jest.mock('../../../src/models/Student', () => ({
    Student: {
        countDocuments: jest.fn(),
        find: jest.fn(),
        aggregate: jest.fn(),
        findOne: jest.fn(),
        findById: jest.fn(),
    }
}));
jest.mock('../../../src/models/Teacher', () => ({
    Teacher: {
        countDocuments: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
    }
}));
jest.mock('../../../src/models/Payment', () => ({
    Payment: {
        aggregate: jest.fn(),
        find: jest.fn(),
    }
}));
jest.mock('../../../src/models/Attendance', () => ({
    default: {
        aggregate: jest.fn().mockResolvedValue([{ totalRecords: 100, presentRecords: 80, absentRecords: 20 }]),
        find: jest.fn(),
        countDocuments: jest.fn(),
    }
}));
jest.mock('../../../src/models/StudentFee', () => ({
    default: { find: jest.fn() }
}));
jest.mock('../../../src/models/Exam', () => ({
    default: { find: jest.fn() }
}));
jest.mock('../../../src/models/Class', () => ({
    default: { countDocuments: jest.fn() }
}));

const { Student } = require('../../../src/models/Student');
const { Teacher } = require('../../../src/models/Teacher');
const { Payment } = require('../../../src/models/Payment');

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Dashboard Controller — Unit Tests', () => {

    beforeEach(() => jest.clearAllMocks());

    // ─── getAdminDashboardStats ───────────────────────────────────────────────
    describe('getAdminDashboardStats()', () => {
        let getAdminDashboardStats;

        beforeAll(() => {
            ({ getAdminDashboardStats } = require('../../../src/controllers/dashboard'));
        });

        test('should return 200 with student and teacher counts', async () => {
            Student.countDocuments.mockResolvedValue(120);
            Teacher.countDocuments.mockResolvedValue(22);
            Student.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue([]),
            });
            Payment.aggregate.mockResolvedValue([]);

            const req = {};
            const res = mockRes();
            await getAdminDashboardStats(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            const json = res.json.mock.calls[0][0];
            expect(json.success).toBe(true);
            expect(json.data.totalStudents).toBe(120);
            expect(json.data.totalTeachers).toBe(22);
        });

        test('should include attendance summary in response', async () => {
            Student.countDocuments.mockResolvedValue(5);
            Teacher.countDocuments.mockResolvedValue(2);
            Student.find.mockReturnValue({
                sort: jest.fn().mockReturnThis(),
                limit: jest.fn().mockReturnThis(),
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue([]),
            });
            Payment.aggregate.mockResolvedValue([]);

            const req = {};
            const res = mockRes();
            await getAdminDashboardStats(req, res);

            const json = res.json.mock.calls[0][0];
            expect(json.data).toHaveProperty('attendance');
            expect(json.data.attendance).toHaveProperty('presentPct');
        });

        test('should handle DB errors and return 500', async () => {
            Student.countDocuments.mockRejectedValue(new Error('DB timeout'));

            const req = {};
            const res = mockRes();
            await getAdminDashboardStats(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    // ─── getStudentDashboardStats ─────────────────────────────────────────────
    describe('getStudentDashboardStats()', () => {
        let getStudentDashboardStats;

        beforeAll(() => {
            ({ getStudentDashboardStats } = require('../../../src/controllers/dashboard'));
        });

        test('should return empty data when student profile not found', async () => {
            Student.findOne.mockReturnValue({
                populate: jest.fn().mockReturnThis(),
                lean: jest.fn().mockResolvedValue(null),
            });

            const req = { user: { userId: 'uid_ghost' } };
            const res = mockRes();
            await getStudentDashboardStats(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            const json = res.json.mock.calls[0][0];
            expect(json.data.student).toBeNull();
        });
    });
});

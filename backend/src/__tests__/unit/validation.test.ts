import Joi from 'joi';

// Import validators (we'll create these inline for testing)
const studentSchema = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().min(2).max(100).required(),
    rollNo: Joi.string().required(),
    classId: Joi.string().required(),
    section: Joi.string().required(),
    enrollmentYear: Joi.number().integer().min(2000).max(2100).required(),
    dateOfBirth: Joi.date().optional(),
    phone: Joi.string().optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

describe('Validation Schemas', () => {
    describe('Student Validation', () => {
        it('should validate correct student data', () => {
            const validStudent = {
                email: 'student@example.com',
                fullName: 'John Doe',
                rollNo: 'STU001',
                classId: '507f1f77bcf86cd799439011',
                section: 'A',
                enrollmentYear: 2024,
            };

            const { error } = studentSchema.validate(validStudent);
            expect(error).toBeUndefined();
        });

        it('should reject invalid email', () => {
            const invalidStudent = {
                email: 'notanemail',
                fullName: 'John Doe',
                rollNo: 'STU001',
                classId: '507f1f77bcf86cd799439011',
                section: 'A',
                enrollmentYear: 2024,
            };

            const { error } = studentSchema.validate(invalidStudent);
            expect(error).toBeDefined();
            expect(error?.details[0].path).toContain('email');
        });

        it('should reject missing required fields', () => {
            const incompleteStudent = {
                email: 'student@example.com',
                fullName: 'John Doe',
            };

            const { error } = studentSchema.validate(incompleteStudent);
            expect(error).toBeDefined();
        });

        it('should reject invalid enrollment year', () => {
            const invalidStudent = {
                email: 'student@example.com',
                fullName: 'John Doe',
                rollNo: 'STU001',
                classId: '507f1f77bcf86cd799439011',
                section: 'A',
                enrollmentYear: 1999, // Too old
            };

            const { error } = studentSchema.validate(invalidStudent);
            expect(error).toBeDefined();
        });

        it('should accept optional fields', () => {
            const studentWithOptional = {
                email: 'student@example.com',
                fullName: 'John Doe',
                rollNo: 'STU001',
                classId: '507f1f77bcf86cd799439011',
                section: 'A',
                enrollmentYear: 2024,
                dateOfBirth: new Date('2005-01-15'),
                phone: '+1234567890',
            };

            const { error } = studentSchema.validate(studentWithOptional);
            expect(error).toBeUndefined();
        });
    });

    describe('Login Validation', () => {
        it('should validate correct login credentials', () => {
            const validLogin = {
                email: 'user@example.com',
                password: 'password123',
            };

            const { error } = loginSchema.validate(validLogin);
            expect(error).toBeUndefined();
        });

        it('should reject invalid email format', () => {
            const invalidLogin = {
                email: 'notanemail',
                password: 'password123',
            };

            const { error } = loginSchema.validate(invalidLogin);
            expect(error).toBeDefined();
            expect(error?.details[0].path).toContain('email');
        });

        it('should reject short password', () => {
            const invalidLogin = {
                email: 'user@example.com',
                password: '12345', // Too short
            };

            const { error } = loginSchema.validate(invalidLogin);
            expect(error).toBeDefined();
            expect(error?.details[0].path).toContain('password');
        });

        it('should reject missing credentials', () => {
            const incompleteLogin = {
                email: 'user@example.com',
            };

            const { error } = loginSchema.validate(incompleteLogin);
            expect(error).toBeDefined();
        });
    });
});

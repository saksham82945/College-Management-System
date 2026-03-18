"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../config/index");
const Student_1 = require("../models/Student");
const Teacher_1 = require("../models/Teacher");
const Staff_1 = require("../models/Staff");
const User_1 = require("../models/User");
const FeeType_1 = require("../models/FeeType");
const StudentFee_1 = require("../models/StudentFee");
const Exam_1 = __importDefault(require("../models/Exam"));
const Attendance_1 = __importDefault(require("../models/Attendance"));
const Salary_1 = require("../models/Salary");
const SalaryPayment_1 = require("../models/SalaryPayment");

const seedExtras = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongodb.uri);
        console.log('Connected to MongoDB');

        const students = await Student_1.Student.find();
        const teachers = await Teacher_1.Teacher.find();
        const staff = await Staff_1.Staff.find();
        const adminUser = await User_1.User.findOne({ email: 'admin@college.com' });

        if (!adminUser) throw new Error("Admin not found");

        console.log("Generating Fee Types...");
        let tuitionFee = await FeeType_1.FeeType.findOne({ code: 'TUIT' });
        if (!tuitionFee) {
            tuitionFee = await FeeType_1.FeeType.create({
                code: 'TUIT', name: 'Tuition Fee 2024', amount: 50000, frequency: 'semester', description: 'Base tuition fee'
            });
        }
        let examFee = await FeeType_1.FeeType.findOne({ code: 'EXAM' });
        if (!examFee) {
            examFee = await FeeType_1.FeeType.create({
                code: 'EXAM', name: 'Exam Fee 2024', amount: 2000, frequency: 'semester', description: 'Semester exam fee'
            });
        }

        console.log(`Generating Student Fees & Attendance for ${students.length} students...`);
        for (const student of students) {
            // Fees
            await StudentFee_1.StudentFee.deleteMany({ studentId: student._id });
            await StudentFee_1.StudentFee.create({
                studentId: student._id, feeTypeId: tuitionFee._id, amountDue: tuitionFee.amount, amountPaid: 25000, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), status: 'partial'
            });
            await StudentFee_1.StudentFee.create({
                studentId: student._id, feeTypeId: examFee._id, amountDue: examFee.amount, amountPaid: 0, dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), status: 'unpaid'
            });

            // Attendance
            await Attendance_1.default.deleteMany({ student: student._id });
            for (let i = 0; i < 5; i++) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                await Attendance_1.default.create({
                    student: student._id, subject: 'Computer Science 101', date, status: i % 5 === 0 ? 'ABSENT' : 'PRESENT', markedBy: adminUser._id
                });
            }
        }

        console.log("Generating Exams...");
        await Exam_1.default.deleteMany({});
        await Exam_1.default.create({ title: 'Mid Semester Exams', date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), time: '10:00 AM', course: 'B.Tech', subject: 'Data Structures', type: 'Written', createdBy: adminUser._id });
        await Exam_1.default.create({ title: 'Final Semester Exams', date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000), time: '02:00 PM', course: 'B.Tech', subject: 'Algorithms', type: 'Written', createdBy: adminUser._id });

        console.log(`Generating Payroll for ${teachers.length} teachers...`);
        await Salary_1.Salary.deleteMany({});
        await SalaryPayment_1.SalaryPayment.deleteMany({});
        for (const teacher of teachers) {
            const salary = await Salary_1.Salary.create({
                teacherId: teacher._id, month: 'March', year: 2024, basicSalary: 60000, totalEarnings: 65000, totalDeductions: 2000, netSalary: 63000, status: 'paid'
            });
            await SalaryPayment_1.SalaryPayment.create({
                salaryId: salary._id, teacherId: teacher._id, amount: 63000, paymentMethod: 'bank_transfer', status: 'completed'
            });
        }

        console.log("Done seeding operational data (Fees, Exams, Attendance, Payroll)!");
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
seedExtras();

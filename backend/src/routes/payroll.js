"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payroll_1 = require("../controllers/payroll");
const router = express_1.default.Router();
router.get('/sheet', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.getSalarySheet);
router.get('/payslip/:id', auth_1.authMiddleware, payroll_1.getPayslip);
router.post('/process', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.processMonthlySalary);
router.post('/payment', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), payroll_1.processSalaryPayment);
exports.default = router;

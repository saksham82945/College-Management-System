"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const finance_1 = require("../controllers/finance");
const router = express_1.default.Router();
router.get('/student/:studentId', auth_1.authMiddleware, finance_1.getStudentFees);
router.get('/receipt/:id', auth_1.authMiddleware, finance_1.getReceipt);
router.get('/payment-history/:studentId', auth_1.authMiddleware, finance_1.getPaymentHistory);
router.post('/structure', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), finance_1.createFeeType); // Added
router.get('/structure', auth_1.authMiddleware, finance_1.getAllFeeTypes);
router.post('/assign-class', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), finance_1.assignFeeToClass); // Added
router.post('/pay', auth_1.authMiddleware, finance_1.processPayment);
exports.default = router;

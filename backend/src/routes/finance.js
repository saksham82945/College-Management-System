"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const finance_1 = require("../controllers/finance");
const auditLogger_1 = require("../middleware/auditLogger");

const router = express_1.default.Router();

// Read operations — no audit needed
router.get('/student/:studentId', auth_1.authMiddleware, finance_1.getStudentFees);
router.get('/receipt/:id', auth_1.authMiddleware, finance_1.getReceipt);
router.get('/receipt/:id/pdf', auth_1.authMiddleware, finance_1.downloadReceiptPDF);
router.get('/payment-history/:studentId', auth_1.authMiddleware, finance_1.getPaymentHistory);
router.get('/structure', auth_1.authMiddleware, finance_1.getAllFeeTypes);

// Write operations — all financial mutations are critically audited
router.post(
    '/structure',
    auth_1.authMiddleware,
    (0, auth_1.roleMiddleware)(['ADMIN']),
    auditLogger_1.auditLogger('CREATE_FEE_TYPE', 'Finance'),
    finance_1.createFeeType
);
router.post(
    '/assign-class',
    auth_1.authMiddleware,
    (0, auth_1.roleMiddleware)(['ADMIN']),
    auditLogger_1.auditLogger('ASSIGN_FEE_TO_CLASS', 'Finance'),
    finance_1.assignFeeToClass
);
router.post(
    '/pay',
    auth_1.authMiddleware,
    auditLogger_1.auditLogger('PROCESS_PAYMENT', 'Finance'),
    finance_1.processPayment
);

exports.default = router;

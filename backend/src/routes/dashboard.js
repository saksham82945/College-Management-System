"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../controllers/dashboard");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Protected routes
router.get('/admin', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), dashboard_1.getAdminDashboardStats);
router.get('/teacher', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['TEACHER', 'ADMIN']), dashboard_1.getTeacherDashboardStats);
router.get('/student', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT', 'ADMIN']), dashboard_1.getStudentDashboardStats);
exports.default = router;

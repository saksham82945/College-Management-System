"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const teacher_1 = require("../controllers/teacher");
const router = express_1.default.Router();
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.createTeacher);
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.getAllTeachers);
router.get('/:id', auth_1.authMiddleware, teacher_1.getTeacherById);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.updateTeacher);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), teacher_1.deleteTeacher);
exports.default = router;

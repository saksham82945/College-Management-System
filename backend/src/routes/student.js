"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const student_1 = require("../controllers/student");
const router = express_1.default.Router();
router.get('/', auth_1.authMiddleware, student_1.getAllStudents);
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN', 'TEACHER']), student_1.createStudent);
router.post('/promote/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.promoteStudent);
router.get('/:id/full-profile', auth_1.authMiddleware, student_1.getStudentFullProfile);
router.get('/:id', auth_1.authMiddleware, student_1.getStudentById);
router.patch('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.updateStudent);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), student_1.deleteStudent);
exports.default = router;

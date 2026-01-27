"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const class_1 = require("../controllers/class");
const router = express_1.default.Router();
router.get('/', auth_1.authMiddleware, class_1.getAllClasses);
router.get('/:id', auth_1.authMiddleware, class_1.getClassById);
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.createClass);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.updateClass);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), class_1.deleteClass);
exports.default = router;

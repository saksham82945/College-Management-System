"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const staff_1 = require("../controllers/staff");

const router = express_1.default.Router();

router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.createStaff);
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.getAllStaff);
router.get('/:id', auth_1.authMiddleware, staff_1.getStaffById);
router.put('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.updateStaff);
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN']), staff_1.deleteStaff);

exports.default = router;

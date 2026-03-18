"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/register', auth_1.authRegister);
router.post('/login', auth_1.authLogin);
router.post('/refresh', auth_1.authRefresh);
router.post('/reset-password', auth_1.resetPassword);
// Get current authenticated user info
router.get('/me', auth_2.authMiddleware, (req, res) => {
    res.json({
        success: true,
        data: {
            userId: req.user.userId,
            email: req.user.email,
            roles: req.user.roles,
            fullName: req.user.fullName,
        },
    });
});
exports.default = router;

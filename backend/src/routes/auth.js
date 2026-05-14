"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const auditLogger_1 = require("../middleware/auditLogger");

const router = express_1.default.Router();

// Register — audit all registration attempts
router.post('/register', auditLogger_1.auditLogger('REGISTER', 'Auth'), auth_1.authRegister);

// Login — audit all login attempts (success and failure logged in controller)
router.post('/login', auditLogger_1.auditLogger('LOGIN', 'Auth'), auth_1.authLogin);

// Token refresh
router.post('/refresh', auditLogger_1.auditLogger('TOKEN_REFRESH', 'Auth'), auth_1.authRefresh);

// Password reset — highly sensitive, always audit
router.post('/reset-password', auditLogger_1.auditLogger('RESET_PASSWORD', 'Auth'), auth_1.resetPassword);

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

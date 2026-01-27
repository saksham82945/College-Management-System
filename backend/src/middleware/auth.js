"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const errors_1 = require("../utils/errors");
const authMiddleware = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new errors_1.AppError('No authentication token provided', 401, 'NO_TOKEN');
        }
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        if (!decoded) {
            throw new errors_1.AppError('Invalid or expired token', 401, 'INVALID_TOKEN');
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof errors_1.AppError) {
            res.status(error.statusCode).json({ message: error.message, errorCode: error.errorCode });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
exports.authMiddleware = authMiddleware;
const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;

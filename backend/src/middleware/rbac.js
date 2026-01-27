"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const errors_1 = require("../utils/errors");
const rolePermissions = {
    ADMIN: [
        { resource: '*', action: 'read' },
        { resource: '*', action: 'write' },
        { resource: '*', action: 'update' },
        { resource: '*', action: 'delete' },
    ],
    TEACHER: [
        { resource: 'classes', action: 'read' },
        { resource: 'attendance', action: 'write' },
        { resource: 'attendance', action: 'read' },
        { resource: 'students', action: 'read' },
    ],
    STUDENT: [
        { resource: 'own_profile', action: 'read' },
        { resource: 'own_attendance', action: 'read' },
        { resource: 'classes', action: 'read' },
    ]
};
const checkPermission = (resource, action) => {
    return (req, res, next) => {
        var _a;
        const userRoles = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.roles) || [];
        // Admin bypass
        if (userRoles.includes('ADMIN')) {
            return next();
        }
        const hasPermission = userRoles.some((role) => {
            const permissions = rolePermissions[role] || [];
            return permissions.some(p => (p.resource === '*' || p.resource === resource) &&
                (p.action === '*' || p.action === action));
        });
        if (!hasPermission) {
            return next(new errors_1.AppError('Forbidden: Insufficient permissions', 403, 'FORBIDDEN'));
        }
        next();
    };
};
exports.checkPermission = checkPermission;

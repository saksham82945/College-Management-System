import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

// Define permissions structure
type Permission = {
    resource: string;
    action: 'read' | 'write' | 'delete' | 'update' | '*';
};

const rolePermissions: Record<string, Permission[]> = {
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
        { resource: 'grades', action: 'write' },
        { resource: 'grades', action: 'read' },
        { resource: 'students', action: 'read' },
    ],
    STUDENT: [
        { resource: 'own_profile', action: 'read' },
        { resource: 'own_grades', action: 'read' },
        { resource: 'own_attendance', action: 'read' },
        { resource: 'classes', action: 'read' },
    ]
};

export const checkPermission = (resource: string, action: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles = (req as any).user?.roles || [];

        // Admin bypass
        if (userRoles.includes('ADMIN')) {
            return next();
        }

        const hasPermission = userRoles.some((role: string) => {
            const permissions = rolePermissions[role] || [];
            return permissions.some(p =>
                (p.resource === '*' || p.resource === resource) &&
                (p.action === '*' || p.action === action)
            );
        });

        if (!hasPermission) {
            return next(new AppError('Forbidden: Insufficient permissions', 403, 'FORBIDDEN'));
        }

        next();
    };
};

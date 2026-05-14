"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
const AuditLog_1 = require("../models/AuditLog");

/**
 * Audit Logger Middleware Factory
 * Creates a middleware that logs critical actions to the AuditLog collection.
 *
 * @param {string} action - The action name (e.g., 'CREATE_STUDENT', 'DELETE_STUDENT')
 * @param {string} resource - The resource type (e.g., 'Student', 'Payment')
 * @param {Function} [getResourceId] - Optional function to extract resourceId from req (e.g., req => req.params.id)
 *
 * @example
 * // Usage on a route:
 * router.post('/', authMiddleware, auditLogger('CREATE_STUDENT', 'Student'), studentController.createStudent);
 * router.delete('/:id', authMiddleware, auditLogger('DELETE_STUDENT', 'Student', req => req.params.id), studentController.deleteStudent);
 */
const auditLogger = (action, resource, getResourceId) => {
    return async (req, res, next) => {
        // Capture original res.json to intercept status code
        const originalJson = res.json.bind(res);
        let responseStatusCode = 200;

        res.json = (body) => {
            responseStatusCode = res.statusCode || 200;
            return originalJson(body);
        };

        // Continue to next middleware/controller first
        next();

        // After response, write audit log asynchronously (non-blocking)
        // We use setImmediate so this does not slow down the response
        setImmediate(async () => {
            try {
                const ipAddress =
                    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
                    req.socket?.remoteAddress ||
                    'unknown';

                const resourceId = getResourceId ? getResourceId(req) : (req.params?.id || null);

                await AuditLog_1.AuditLog.create({
                    userId: req.user?.userId || null,
                    action,
                    resource,
                    resourceId,
                    ipAddress,
                    userAgent: req.headers['user-agent'] || 'unknown',
                    statusCode: responseStatusCode,
                    details: {
                        method: req.method,
                        path: req.originalUrl,
                        query: req.query,
                        // Exclude sensitive fields from body logging
                        body: sanitizeBodyForLog(req.body),
                    },
                });
            } catch (logError) {
                // Audit log failure should NEVER crash the app
                console.error('[AuditLog] Failed to write audit log:', logError.message);
            }
        });
    };
};
exports.auditLogger = auditLogger;

/**
 * Removes sensitive fields from request body before logging.
 * Prevents passwords and tokens from being stored in audit logs.
 */
function sanitizeBodyForLog(body) {
    if (!body || typeof body !== 'object') return {};
    const SENSITIVE_FIELDS = ['password', 'newPassword', 'token', 'refreshToken', 'secret', 'key'];
    const sanitized = { ...body };
    for (const field of SENSITIVE_FIELDS) {
        if (sanitized[field] !== undefined) {
            sanitized[field] = '[REDACTED]';
        }
    }
    return sanitized;
}

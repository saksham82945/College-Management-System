"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssSanitizer = void 0;
const xss_1 = require("xss");

/**
 * XSS Sanitizer Middleware
 * Recursively sanitizes all string values in req.body, req.query, and req.params
 * to prevent Cross-Site Scripting attacks.
 *
 * Uses the 'xss' library which is actively maintained (unlike the deprecated xss-clean).
 */
const xssSanitizer = (req, res, next) => {
    req.body = sanitizeValue(req.body);
    req.query = sanitizeValue(req.query);
    req.params = sanitizeValue(req.params);
    next();
};
exports.xssSanitizer = xssSanitizer;

/**
 * Recursively sanitizes a value:
 * - Strings: strips XSS payloads
 * - Objects/Arrays: recursively sanitizes each child
 * - Other types (numbers, booleans): returned as-is
 */
function sanitizeValue(value) {
    if (typeof value === 'string') {
        return (0, xss_1.filterXSS)(value, {
            whiteList: {}, // Allow NO HTML tags
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script', 'style'],
        });
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }
    if (value !== null && typeof value === 'object') {
        const sanitized = {};
        for (const key of Object.keys(value)) {
            sanitized[key] = sanitizeValue(value[key]);
        }
        return sanitized;
    }
    return value;
}

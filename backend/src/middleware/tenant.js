"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const Organization_1 = require("../models/Organization");
const { tenantStorage } = require("../utils/tenantContext");

const tenantMiddleware = async (req, res, next) => {
    try {
        const host = req.headers['x-forwarded-host'] || req.headers.host || '';
        
        let subdomain = '';
        if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
            const parts = host.split('.');
            if (parts.length > 2) {
                subdomain = parts[0].toLowerCase();
            }
        }
        
        let org = null;
        if (subdomain) {
            org = await Organization_1.Organization.findOne({ subdomain });
        } else {
            org = await Organization_1.Organization.findOne({ customDomain: host.toLowerCase() });
        }
        
        // Fallback default organization to ensure dev/test modes do not break
        if (!org) {
            org = await Organization_1.Organization.findOne({ subdomain: 'default' });
            if (!org) {
                org = await Organization_1.Organization.create({
                    name: 'Default College',
                    subdomain: 'default',
                    status: 'active'
                });
            }
        }
        
        // Scope the request downstream chain inside the tenant context
        tenantStorage.run({ tenantId: org._id }, () => {
            req.tenantId = org._id;
            req.organization = org;
            next();
        });
    } catch (error) {
        console.error('[TENANT MIDDLEWARE ERROR]:', error);
        res.status(500).json({ message: 'Failed to resolve college context' });
    }
};

exports.tenantMiddleware = tenantMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantMiddleware = void 0;
const Organization_1 = require("../models/Organization");
const { tenantStorage } = require("../utils/tenantContext");

// Cache the resolved org to avoid repeated DB lookups on every request
let _cachedDefaultOrg = null;

const tenantMiddleware = async (req, res, next) => {
    try {
        // ── Option 1: Pin to a specific tenant via env var (most reliable for single-tenant)
        if (process.env.DEFAULT_TENANT_ID) {
            const mongoose = require('mongoose');
            const tenantId = new mongoose.Types.ObjectId(process.env.DEFAULT_TENANT_ID);
            tenantStorage.run({ tenantId }, () => {
                req.tenantId = tenantId;
                next();
            });
            return;
        }

        // ── Option 2: Resolve by subdomain or custom domain from host header
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
        }
        if (!org && host) {
            org = await Organization_1.Organization.findOne({ customDomain: host.toLowerCase() });
        }

        // ── Option 3: Fallback — upsert the default org (prevents duplicate creation)
        if (!org) {
            if (_cachedDefaultOrg) {
                org = _cachedDefaultOrg;
            } else {
                org = await Organization_1.Organization.findOneAndUpdate(
                    { subdomain: 'default' },
                    { $setOnInsert: { name: 'Default College', subdomain: 'default', status: 'active' } },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );
                // Cache to avoid repeated DB calls
                _cachedDefaultOrg = org;
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

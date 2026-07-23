"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantPlugin = void 0;
const mongoose = require("mongoose");
const { tenantStorage } = require("../../utils/tenantContext");

const tenantPlugin = (schema) => {
    // 1. Add tenantId field ref to Organization
    schema.add({
        tenantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization',
            required: true,
            index: true
        }
    });

    // Helper to get active tenantId from thread context
    const getTenantId = () => {
        const store = tenantStorage.getStore();
        return store ? store.tenantId : null;
    };

    // 2. Query Hooks: Scope read/update/delete criteria
    const queryMethods = [
        'find', 'findOne', 'countDocuments', 'estimatedDocumentCount',
        'findOneAndUpdate', 'updateOne', 'updateMany', 'deleteOne', 'deleteMany'
    ];

    queryMethods.forEach(method => {
        schema.pre(method, function (next) {
            const tenantId = getTenantId();
            if (tenantId) {
                this.where({ tenantId });
            }
            next();
        });
    });

    // 3. Save Hook: Auto-inject active tenantId on validation/saving
    schema.pre('validate', async function (next) {
        let tenantId = getTenantId();
        if (!tenantId) {
            if (this.tenantId) {
                return next();
            }
            // Fallback during testing/development if no active request context is present
            if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
                try {
                    const Organization = mongoose.model('Organization');
                    let org = await Organization.findOne({ subdomain: 'default' });
                    if (!org) {
                        org = await Organization.create({
                            name: 'Default College',
                            subdomain: 'default',
                            status: 'active'
                        });
                    }
                    tenantId = org._id;
                } catch (err) {
                    return next(err);
                }
            }
        }
        if (tenantId && !this.tenantId) {
            this.tenantId = tenantId;
        }
        next();
    });
};

exports.tenantPlugin = tenantPlugin;

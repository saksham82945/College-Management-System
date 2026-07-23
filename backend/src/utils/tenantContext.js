"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantStorage = void 0;
const async_hooks_1 = require("async_hooks");

// Local storage thread-context context store for resolving active SaaS tenant
exports.tenantStorage = new async_hooks_1.AsyncLocalStorage();

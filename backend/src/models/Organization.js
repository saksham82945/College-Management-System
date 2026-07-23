"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = __importDefault(require("mongoose"));

const organizationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    subdomain: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    customDomain: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['trial', 'active', 'suspended'],
        default: 'trial',
    },
    settings: {
        themeColor: { type: String, default: 'from-indigo-600 to-purple-600' },
        logoUrl: { type: String, default: '' },
    }
}, { timestamps: true });

exports.Organization = mongoose_1.default.model('Organization', organizationSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const feeTypeSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        enum: ['one-time', 'yearly', 'semester', 'monthly'],
        required: true,
    },
    description: {
        type: String,
    },
    isOptional: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.FeeType = mongoose_1.default.model('FeeType', feeTypeSchema);

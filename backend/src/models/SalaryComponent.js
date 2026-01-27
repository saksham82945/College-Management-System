"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryComponent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const salaryComponentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['earning', 'deduction'],
        required: true,
    },
    description: {
        type: String,
    },
}, { timestamps: true });
exports.SalaryComponent = mongoose_1.default.model('SalaryComponent', salaryComponentSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const parentSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherPhone: {
        type: String,
        required: true,
    },
    motherPhone: {
        type: String,
    },
    fatherOccupation: String,
    motherOccupation: String,
    primaryEmail: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        country: String,
    },
    children: [{
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, { timestamps: true });
exports.Parent = mongoose_1.default.model('Parent', parentSchema);

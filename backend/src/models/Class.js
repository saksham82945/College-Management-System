"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    classTeacher: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    subjects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Subject',
        },
    ],
    studentCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Compound index for unique class per academic year
classSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });
exports.Class = mongoose_1.default.model('Class', classSchema);

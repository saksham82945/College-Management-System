"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const timetableSchema = new mongoose_1.default.Schema({
    classId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    schedule: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            },
            periods: [
                {
                    periodNo: Number,
                    startTime: String,
                    endTime: String,
                    subjectId: mongoose_1.default.Schema.Types.ObjectId,
                    teacherId: mongoose_1.default.Schema.Types.ObjectId,
                    room: String,
                },
            ],
        },
    ],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, { timestamps: true });
// Indexes
timetableSchema.index({ classId: 1, academicYear: 1 });
exports.Timetable = mongoose_1.default.model('Timetable', timetableSchema);

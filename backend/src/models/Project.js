"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function (o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PROPOSED"] = "PROPOSED";
    ProjectStatus["APPROVED"] = "APPROVED";
    ProjectStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ProjectStatus["SUBMITTED"] = "SUBMITTED";
    ProjectStatus["CHANGES_REQUESTED"] = "CHANGES_REQUESTED";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    batch: { type: String, required: true },
    domain: [{ type: String }],
    studentIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Student', required: true }],
    mentorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Teacher' },
    status: {
        type: String,
        enum: Object.values(ProjectStatus),
        default: ProjectStatus.PROPOSED
    },
    submission: {
        fileUrl: { type: String },
        originalName: { type: String },
        mimeType: { type: String },
        size: { type: Number },
        pageCount: { type: Number },
        submittedAt: { type: Date },
        plagiarismScore: { type: Number, min: 0, max: 100 }
    },
}, {
    timestamps: true
});
// Indexes for faster queries
projectSchema.index({ batch: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ mentorId: 1 });
projectSchema.index({ studentIds: 1 });
exports.Project = mongoose_1.default.model('Project', projectSchema);

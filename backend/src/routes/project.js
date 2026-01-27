"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const project_1 = require("../controllers/project");
const project_validation_1 = require("../validation/project.validation");
const router = express_1.default.Router();
// Public/Shared (Authenticated)
router.get('/my-project', auth_1.authMiddleware, project_1.getMyProject);
router.get('/:id', auth_1.authMiddleware, project_1.getProjectById);
// Student routes
router.post('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT']), (0, project_validation_1.validate)(project_validation_1.createProjectSchema), project_1.createProject);
router.post('/:id/submit', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['STUDENT']), (0, project_validation_1.validate)(project_validation_1.submitReportSchema), project_1.submitReport);
// Faculty/Admin routes
router.get('/', auth_1.authMiddleware, (0, auth_1.roleMiddleware)(['ADMIN', 'TEACHER']), (0, project_validation_1.validateQuery)(project_validation_1.getAllProjectsQuerySchema), project_1.getAllProjects);
exports.default = router;

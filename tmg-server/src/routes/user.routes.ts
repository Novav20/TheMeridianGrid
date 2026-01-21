import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { PrismaService } from "../services/prisma.service";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { SystemRole } from "../config/roles";

const router = Router();

// 1. Instantiate dependencies (Manual DI)
const prisma = PrismaService.getInstance().client;
const passwordService = new PasswordService();
const userService = new UserService(prisma, passwordService);
const userController = new UserController(userService);

/**
 * Routes: /api/users
 * Protection: All routes require ADMINISTRATOR role for MVP.
 */

// Apply authentication and administrator authorization to all routes
router.use(authenticate);
router.use(authorize([SystemRole.ADMINISTRATOR]));

router.get("/", userController.getAll);
router.post("/", userController.create);
router.patch("/:id", userController.update);
router.delete("/:id", userController.disable); // Soft delete

export default router;

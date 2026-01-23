import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { SystemRole } from "../config/roles";
import { container } from "../config/container";

const router = Router();
const userController = container.userController;

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

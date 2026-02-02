import { Router } from "express";
import { container } from "../config/container";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const { dashboardController } = container;

// All dashboard routes require authentication
router.use(authenticate);

router.get("/", dashboardController.getAll);
router.get("/:id", dashboardController.getById);
router.post("/", dashboardController.create);
router.put("/:id", dashboardController.update);
router.delete("/:id", dashboardController.delete);

export default router;
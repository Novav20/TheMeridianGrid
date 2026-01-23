import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { container } from "../config/container";

const router = Router();

const authController = container.authController;

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
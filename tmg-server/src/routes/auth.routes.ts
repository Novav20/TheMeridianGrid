import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";
import { PrismaService } from "../services/prisma.service";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// 1. Instantiate dependencies (Manual DI)
const prisma = PrismaService.getInstance().client;
const passwordService = new PasswordService();
const userService = new UserService(prisma, passwordService);
const tokenService = new TokenService();

// 2. Instantiate controller
const authController = new AuthController(
  userService,
  passwordService,
  tokenService
);

// 3. Define routes
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
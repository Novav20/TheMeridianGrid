import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";
import { PrismaService } from "../services/prisma.service";

const router = Router();

// 1. Instantiate dependencies (Manual DI)
const prisma = PrismaService.getInstance().client;
const userService = new UserService(prisma);
const passwordService = new PasswordService();
const tokenService = new TokenService();

// 2. Instantiate controller
const authController = new AuthController(
  userService,
  passwordService,
  tokenService
);

// 3. Define routes
router.post("/login", authController.login);

export default router;

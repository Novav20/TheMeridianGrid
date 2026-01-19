import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";
import { loginSchema, LoginDto } from "../schemas/auth.schema";
import { AppError } from "../utils/AppError";

/**
 * Controller: AuthController
 * Purpose: Handles authentication-related HTTP requests.
 */
export class AuthController {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  /**
   * Method: login
   * Handles user login by validating credentials and issuing a JWT via HttpOnly cookie.
   */
  public login = async (
    req: Request<{}, any, LoginDto>,
    res: Response,
    next: NextFunction
  ) => {
    // 1. Validate inputs (Zod)
    const validatedData = loginSchema.parse(req.body);

    // 2. Find user
    const user = await this.userService.findByEmail(validatedData.email);
    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    // 3. Verify password
    const isValid = await this.passwordService.verify(
      user.passwordHash,
      validatedData.password
    );

    if (!isValid) {
      throw new AppError(401, "Invalid credentials");
    }

    // 4. Generate token
    const token = this.tokenService.signToken({
      userId: user.id,
      role: user.role.name,
    });

    // 5. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    // 6. Send response (Excluding passwordHash)
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  };
}
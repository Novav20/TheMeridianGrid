import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { PasswordService } from "../services/password.service";
import { TokenService } from "../services/token.service";
import { loginSchema, LoginDto, ApiResponse } from "@tmg/shared";
import { AppError } from "../utils/AppError";

/**
 * Controller: AuthController
 * Purpose: Handles authentication-related HTTP requests.
 */
export class AuthController {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private tokenService: TokenService,
  ) {}

  /**
   * Method: login
   * Handles user login by validating credentials and issuing a JWT via HttpOnly cookie.
   */
  public login = async (
    req: Request<{}, ApiResponse, LoginDto>,
    res: Response<ApiResponse>,
    next: NextFunction,
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
      validatedData.password,
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
      success: true,
      message: "Login successful",
      data: userWithoutPassword,
    });
  };

  /**
   * Method: me
   * Purpose: Returns the currently logged-in user's profile.
   * protected: This route must be protected by the 'authenticate' middleware.
   */
  public me = async (
    req: Request<{}, ApiResponse>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    if (!req.user) {
      throw new AppError(404, "User not found");
    }
    const user = await this.userService.findById(req.user.userId);
    if (!user) throw new AppError(404, "User not found");
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  };

  /**
   * Method: logout
   * Purpose: Clears the authentication cookie.
   */
  public logout = async (
    req: Request<{}, ApiResponse>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  };
}

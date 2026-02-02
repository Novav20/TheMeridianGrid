import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { AppError } from "../utils/AppError";
import {
  createUserSchema,
  updateUserSchema,
  CreateUserDto,
  UpdateUserDto,
  UserStatus,
  ApiResponse,
} from "@tmg/shared";

/**
 * Interface: UserParams
 * Defines URL parameters for user management.
 */
interface UserParams {
  id: string;
}

/**
 * Controller: UserController
 * Purpose: Handles user management (CRUD) operations.
 */
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Method: create
   * Purpose: Creates a new user (Admin only).
   */
  public create = async (
    req: Request<{}, ApiResponse, CreateUserDto>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    // 1. Validate inputs (Zod)
    const validatedData = createUserSchema.parse(req.body);

    // 2. Create user via service
    const user = await this.userService.create(validatedData);

    // 3. Return response (strip sensitive data)
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userWithoutPassword,
    });
  };

  /**
   * Method: getAll
   * Purpose: Lists all users.
   */
  public getAll = async (
    req: Request,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    const users = await this.userService.findAll();

    // Strip passwords from all users
    const safeUsers = users.map((user) => {
      const { passwordHash, ...rest } = user;
      return rest;
    });

    res.status(200).json({
      success: true,
      data: safeUsers,
    });
  };

  /**
   * Method: update
   * Purpose: Updates a user's details.
   */
  public update = async (
    req: Request<UserParams, ApiResponse, UpdateUserDto>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    // 1. Validate inputs
    const validatedData = updateUserSchema.parse(req.body);

    // 2. Update user
    const user = await this.userService.update(id, validatedData);
    const { passwordHash, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: userWithoutPassword,
    });
  };

  /**
   * Method: disable
   * Purpose: Soft-deletes a user (sets status to DISABLED).
   */
  public disable = async (
    req: Request<UserParams, ApiResponse>,
    res: Response<ApiResponse>,
    next: NextFunction,
  ) => {
    const { id } = req.params;

    // Prevent self-disable to avoid locking out the last admin
    if (req.user?.userId === id) {
      throw new AppError(400, "You cannot disable your own account.");
    }

    await this.userService.setStatus(id, UserStatus.DISABLED);

    res.status(200).json({
      success: true,
      message: "User disabled successfully",
    });
  };
}
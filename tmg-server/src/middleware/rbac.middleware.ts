import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

/**
 * Middleware Factory: authorize
 * Purpose: Returns a middleware that checks if the authenticated user has one of the allowed roles.
 * @param allowedRoles List of roles that are permitted to access the route.
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Ensure user is authenticated (req.user must exist)
    if (!req.user) {
      return next(new AppError(401, "Not authenticated"));
    }

    // 2. Check if the user's role is in the allowed list
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden: You do not have permission to perform this action"));
    }

    // 3. User is authorized
    next();
  };
};

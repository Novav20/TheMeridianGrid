import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { container } from "../config/container";

const tokenService = container.tokenService;

/**
 * Middleware: authenticate
 * Purpose: Verifies the JWT in the 'token' cookie and attaches the payload to req.user.
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError(401, "Not authenticated");
    }

    const payload = tokenService.verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    // If it's already an AppError (from verifyToken or our check), pass it on
    if (error instanceof AppError) {
      return next(error);
    }
    // Otherwise wrap it
    next(new AppError(401, "Invalid token"));
  }
};
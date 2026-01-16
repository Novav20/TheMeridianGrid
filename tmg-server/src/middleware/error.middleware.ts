import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"; // Import for specific Prisma errors

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    // Detailed Zod errors could be attached here: message = err.errors;
  } else if (err instanceof PrismaClientKnownRequestError) {
    // Handle Prisma's "Record not found" error
    if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
    // Other Prisma errors (e.g., unique constraint failure P2002) can be handled here as well.
  }

  console.error(
    `[ERROR] ${req.method} ${req.path} >> ${statusCode}: ${message}`,
    err
  );

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

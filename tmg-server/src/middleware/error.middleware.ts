import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client"; // Import for specific Prisma errors

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let isOperational = false;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = true;
  } else if (err.name === "ZodError") {
    statusCode = 400;
    message = "Validation Error";
    isOperational = true;
  } else if (err instanceof PrismaClientKnownRequestError) {
    isOperational = true;
    if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  }

  // LOGGING LOGIC (The "Result Pattern" equivalent for logging)
  // 1. For 401/404, we just log a short info message (they are expected app flow)
  if (statusCode === 401 || statusCode === 404) {
    console.info(`[INFO] ${req.method} ${req.path} >> ${statusCode}: ${message}`);
  } 
  // 2. For other operational errors (400, 403), we log the error but skip the stack trace
  else if (isOperational) {
    console.warn(`[WARN] ${req.method} ${req.path} >> ${statusCode}: ${message}`);
  } 
  // 3. For 500 errors (unexpected crashes), we log the full stack trace
  else {
    console.error(
      `[CRITICAL] ${req.method} ${req.path} >> ${statusCode}: ${message}`,
      err
    );
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

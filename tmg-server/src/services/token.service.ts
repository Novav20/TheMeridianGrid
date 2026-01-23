import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "../utils/AppError";

/**
 * Interface: TokenPayload
 * Purpose: Defines the structure of the data encoded within the JWT.
 */
export interface TokenPayload {
  userId: string;
  role: string;
}

/**
 * Service: TokenService
 * Purpose: Handles JSON Web Token (JWT) creation and verification.
 * Implements: FR-14 (Foundation)
 */
export class TokenService {
  private readonly secret: string;
  private readonly expiresIn: SignOptions["expiresIn"];

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    this.secret = process.env.JWT_SECRET;
    // We cast to the specific type expected by jsonwebtoken options
    this.expiresIn = (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h";
  }

  /**
   * Generates a signed JWT for a user.
   * @param payload The data to encode in the token.
   * @returns A signed JWT string.
   */
  signToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  /**
   * Verifies a JWT and returns its payload.
   * @param token The JWT string to verify.
   * @returns The decoded payload if valid.
   */
  verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.secret) as TokenPayload;
    } catch (error) {
      throw new AppError(401, "Invalid or expired token");
    }
  }
}

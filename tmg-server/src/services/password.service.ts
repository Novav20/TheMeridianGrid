import * as argon2 from "argon2";

/**
 * Service: PasswordService
 * Purpose: Handles secure password hashing and verification using Argon2id.
 * Implements: FR-14 (Foundation)
 */
export class PasswordService {
  /**
   * Hashes a plain-text password using Argon2id.
   * @param password The plain-text password to hash.
   * @returns A Promise that resolves to the hashed password string.
   */
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  /**
   * Verifies a plain-text password against a stored hash.
   * @param hash The stored Argon2id hash.
   * @param password The plain-text password to verify.
   * @returns A Promise that resolves to true if the password is valid, false otherwise.
   */
  async verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
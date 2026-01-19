import { PrismaClient } from "../../prisma/client/client";

/**
 * Service: UserService
 * Purpose: Handles user-related database operations.
 */
export class UserService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Finds a user by their email address.
   * Includes the role relation to get the role name.
   * @param email The email address to search for.
   */
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true }, // We need the role for the JWT payload
    });
  }
}

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

  /**
   * Finds a user by their unique ID.
   * Includes the role relation.
   * @param id The UUID of the user.
   */
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }
}


import { PrismaClient, UserStatus } from "../../prisma/client/client";
import { PasswordService } from "./password.service";

/**
 * Service: UserService
 * Purpose: Handles user-related database operations.
 * Implements: FR-12
 */
export class UserService {
  constructor(
    private prisma: PrismaClient,
    private passwordService: PasswordService
  ) {}

  /**
   * Lists all users in the system.
   */
  async findAll() {
    return this.prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: "desc" },
    });
  }

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

  /**
   * Creates a new user account.
   * @param data Object containing email, name, plain password, and roleId.
   */
  async create(data: {
    email: string;
    name: string;
    password: string;
    roleId: string;
  }) {
    const passwordHash = await this.passwordService.hash(data.password);

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        roleId: data.roleId,
        status: UserStatus.ACTIVE,
      },
      include: { role: true },
    });
  }

  /**
   * Updates an existing user's information.
   * Note: Password updates should be handled separately for security.
   */
  async update(
    id: string,
    data: { email?: string; name?: string; roleId?: string }
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { role: true },
    });
  }

  /**
   * Changes a user's status (ACTIVE, DISABLED, SUSPENDED).
   * Used for soft-deletion/disabling accounts.
   */
  async setStatus(id: string, status: UserStatus) {
    return this.prisma.user.update({
      where: { id },
      data: { status },
      include: { role: true },
    });
  }
}


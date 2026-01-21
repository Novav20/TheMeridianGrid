import { PrismaClient, UserStatus } from "../client/client";
import { PasswordService } from "../../src/services/password.service";
import { SystemRole } from "../../src/config/roles";

export async function seedEssential(prisma: PrismaClient) {
  console.log("Starting essential seeding...");

  const passwordService = new PasswordService();

  // 1. Seed Roles
  const roles = Object.values(SystemRole);
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // 2. Generate a real hash for the admin
  const adminPassword = "admin123";
  const hash = await passwordService.hash(adminPassword);

  // 3. Seed Default Administrator
  await prisma.user.upsert({
    where: { email: "admin@tmg.com" },
    update: {
      passwordHash: hash, // Ensure existing admin gets the real hash too
    },
    create: {
      name: "System Administrator",
      email: "admin@tmg.com",
      passwordHash: hash,
      status: UserStatus.ACTIVE,
      role: {
        connect: { name: SystemRole.ADMINISTRATOR },
      },
    },
  });

  console.log("Essential seeding completed.");
  console.log(`Default Admin: admin@tmg.com / ${adminPassword}`);
}
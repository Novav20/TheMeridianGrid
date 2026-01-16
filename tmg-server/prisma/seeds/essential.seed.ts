import { PrismaClient, UserStatus } from "../client/client";

export async function seedEssential(prisma: PrismaClient) {
  console.log("Starting essential seeding...");

  // 1. Seed Roles
  const roles = ["ADMINISTRATOR", "INTEGRATOR", "OPERATOR", "VIEWER"];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    });
  }

  // 2. Seed Default Administrator
  await prisma.user.upsert({
    where: { email: "admin@tmg.com" },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@tmg.com",
      passwordHash: "MOCK_HASH_FOR_DEV",
      status: UserStatus.ACTIVE,
      role: {
        connect: { name: "ADMINISTRATOR" },
      },
    },
  });

  console.log("Essential seeding completed.");
}

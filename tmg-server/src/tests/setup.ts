import { beforeAll, beforeEach, afterAll } from "vitest";
import { PrismaService } from "../services/prisma.service";
import dotenv from "dotenv";
import path from "path";
import { SystemRole } from "../config/roles";

// Load test environment variables before anything else
dotenv.config({ path: path.resolve(__dirname, "../../.env.test") });

// Use the Singleton instance
const prisma = PrismaService.getInstance().client;

beforeAll(async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Could not connect to the Test Database. Is docker-compose.test.yml running?");
    process.exit(1);
  }
});

beforeEach(async () => {
  // 1. Clear the database between tests to ensure isolation
  try {
    // We dynamically fetch all tables to avoid hardcoding names
    const tables = await prisma.$queryRaw<
      { tablename: string }[]
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    for (const { tablename } of tables) {
      if (tablename !== "_prisma_migrations") {
        try {
          await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
          );
        } catch (error) {
          console.warn(`Could not truncate table ${tablename}:`, (error as Error).message);
        }
      }
    }

    // 2. Seed Static Data (Roles)
    for (const roleName of Object.values(SystemRole)) {
      await prisma.role.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName },
      });
    }

  } catch (error) {
    console.error("Critical Error in Test Setup (Database Reset):");
    console.error(error);
    throw error; // Fail the test if we can't clean the DB
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});

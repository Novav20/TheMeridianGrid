import { beforeAll, beforeEach, afterAll } from "vitest";
import { PrismaService } from "../services/prisma.service";
import dotenv from "dotenv";
import path from "path";

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
  // Clear the database between tests to ensure isolation
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
});

afterAll(async () => {
  await prisma.$disconnect();
});

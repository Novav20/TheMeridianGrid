import { PrismaClient, UserStatus } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

// Explicitly load .env from the root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

// 1. Create a PostgreSQL connection pool
const pool = new Pool({ connectionString });

// 2. Create the Prisma Adapter using the pool
const adapter = new PrismaPg(pool);

// 3. Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

/**
 * Essential Seeding:
 * Populates data required for the application to function (Roles, System Admin).
 * This should run in every environment (Dev, Staging, Prod).
 */
async function seedEssential() {
  console.log("Starting essential seeding...");

  // 1. Seed Roles
  const roles = ["ADMINISTRATOR", "INTEGRATOR", "OPERATOR", "VIEWER"];
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {}, // Required by Prisma upsert syntax
      create: { name: roleName },
    });
  }

  // 2. Seed Default Administrator
  await prisma.user.upsert({
    where: { email: "novillus-admin@themeridiangrid.com" },
    update: {}, // Required by Prisma upsert syntax
    create: {
      name: "System Administrator",
      email: "novillus-admin@themeridiangrid.com",
      passwordHash: "MOCK_HASH_FOR_DEV", // TODO: Implement hashing
      status: UserStatus.ACTIVE,
      role: {
        connect: { name: "ADMINISTRATOR" },
      },
    },
  });

  console.log("Essential seeding completed.");
}

/**
 * Dummy Seeding:
 * Populates mock data for testing/development (Assets, Telemetry).
 * This should only run when explicitly requested.
 */
async function seedDummy() {
  console.log("Starting dummy data seeding...");
  // TODO: Future implementation: Add mock assets and telemetry here.
  console.log("Dummy seeding completed.");
}

async function main() {
  await seedEssential();

  // Usage: SEED_DUMMY=true npx prisma db seed
  if (process.env.SEED_DUMMY === "true") {
    await seedDummy();
  } else {
    console.log("Skipping dummy data. Set SEED_DUMMY=true to enable.");
  }
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

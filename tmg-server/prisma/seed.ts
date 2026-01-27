import { PrismaClient } from "@tmg/shared";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

// Modular Seeds
import { seedEssential } from "./seeds/essential.seed";
import { seedTestData } from "./seeds/test-data.seed";

// Explicitly load .env from the root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * Construct the connection string.
 * Priority: process.env.DATABASE_URL > Component variables.
 */
let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
  } = process.env;

  if (
    !POSTGRES_USER ||
    !POSTGRES_PASSWORD ||
    !POSTGRES_HOST ||
    !POSTGRES_PORT ||
    !POSTGRES_DB
  ) {
    throw new Error(
      "Database configuration is incomplete. Ensure DATABASE_URL or all POSTGRES_* variables are set."
    );
  }

  connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Seed Dummy: ${process.env.SEED_DUMMY}`);

  // 1. Always run essential seeding
  await seedEssential(prisma);

  // 2. Run test data seeding if requested
  if (process.env.SEED_DUMMY === "true") {
    await seedTestData(prisma);
  } else {
    console.log("Skipping test data. Set SEED_DUMMY=true to enable.");
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
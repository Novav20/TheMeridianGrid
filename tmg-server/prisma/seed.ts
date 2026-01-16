import { PrismaClient } from "./client/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

// Modular Seeds
import { seedEssential } from "./seeds/essential.seed";
import { seedTestData } from "./seeds/test-data.seed";

// Explicitly load .env from the root directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Always run essential seeding
  await seedEssential(prisma);

  // 2. Run test data seeding if requested
  // Usage: SEED_DUMMY=true npx prisma db seed
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

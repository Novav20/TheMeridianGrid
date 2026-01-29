import { PrismaClient } from "@tmg/shared/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * Service: PrismaService
 * Purpose: Manages the single database connection instance for the entire application.
 * Pattern: Singleton
 */
export class PrismaService {
  private static instance: PrismaService;
  public client: PrismaClient;

  private constructor() {
    // 1. Try to use the full DATABASE_URL (provided by Docker Compose)
    let connectionString = process.env.DATABASE_URL;

    // 2. If missing (Local Dev), build it from individual components in .env
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
          "Database configuration is incomplete. Ensure DATABASE_URL or all POSTGRES_* variables are set.",
        );
      }

      connectionString = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    this.client = new PrismaClient({ adapter });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }
}

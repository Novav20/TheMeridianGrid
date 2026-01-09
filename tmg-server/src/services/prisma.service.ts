import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

/**
 * Service: PrismaService
 * Purpose: Manages the single database connection instance for the entire application.
 * Pattern: Singleton
 */
export class PrismaService {
  private static instance: PrismaService;
  public client: PrismaClient;

  private constructor() {
    const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
    
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

import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Prisma Configuration
 * 
 * We load the root .env by default for convenience. 
 * If DATABASE_URL is already set (e.g., by dotenv-cli in tests), 
 * it will be preferred over building the string from components.
 */
dotenv.config({ path: path.join(__dirname, '../.env') });

const {
  DATABASE_URL,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

// 1. Prefer the full URL if provided
// 2. Fallback to building it from individual POSTGRES_* variables
// 3. Use a placeholder if configuration is missing (Prisma will throw a clear error on usage)
const connectionString = DATABASE_URL || (
  (POSTGRES_USER && POSTGRES_PASSWORD && POSTGRES_HOST && POSTGRES_PORT && POSTGRES_DB)
    ? `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    : "postgresql://missing_config"
);

export default defineConfig({
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: connectionString,
  },
});
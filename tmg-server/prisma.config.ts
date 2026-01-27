import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables. Prioritize .env.test if NODE_ENV is 'test',
// otherwise fall back to the default .env location.
const envPath = process.env.NODE_ENV === 'test'
  ? path.join(__dirname, '../.env.test') // This correctly points to tmg-server/.env.test
  : path.join(__dirname, '../.env'); // This points to tmg-server/../.env (root .env)

dotenv.config({ path: envPath });

const {
  DATABASE_URL,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
} = process.env;

// Construct the connection string using variables from the loaded .env file
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
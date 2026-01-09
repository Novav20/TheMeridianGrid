import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the project root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Construct the connection string dynamically
const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

export default defineConfig({
  migrations: {
    // Specify the path to your seed script
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: connectionString,
  },
});
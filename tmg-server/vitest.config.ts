import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Allows us to use 'describe', 'it', 'expect' without importing them
    environment: "node",
    include: ["src/**/*.test.ts"], // Look for .test.ts files inside src
    setupFiles: ["src/tests/setup.ts"], // Run this file before any test
    pool: "forks", // Required for some Prisma/Node combinations
  },
});

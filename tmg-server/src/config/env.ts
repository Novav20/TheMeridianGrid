import dotenv from "dotenv";
import path from "path";

/**
 * Global Environment Loader
 * 
 * In development/production, we load the root .env file.
 * In testing, we skip this to allow the test runner (Vitest) 
 * to use .env.test without interference.
 */
if (process.env.NODE_ENV !== "test") {
  dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
}

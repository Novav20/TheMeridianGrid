import dotenv from "dotenv";
import path from "path";

// Load environment variables from the project root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

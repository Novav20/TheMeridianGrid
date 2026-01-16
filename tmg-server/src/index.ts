import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import path from "path";
import assetRouter from "./routes/asset.routes";
import telemetryRouter from "./routes/telemetry.routes";
import ruleRouter from "./routes/rule.routes";
import { globalErrorHandler } from "./middleware/error.middleware"; // Import the error handler

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());

// =========================================================
// Routes
// =========================================================

app.get("/", (req, res) => {
  res.send("TMG Server is running.");
});

app.use("/api/assets", assetRouter);
app.use("/api/telemetry", telemetryRouter);
app.use("/api/rules", ruleRouter);

// =========================================================
// Error Handling Middleware (MUST be last)
// =========================================================
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

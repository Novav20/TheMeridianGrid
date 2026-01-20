import "./config/env"; // MUST be the first import to load env vars before other imports
import express from "express";
import Cors from "cors";
import cookieParser from "cookie-parser";
import assetRouter from "./routes/asset.routes";
import telemetryRouter from "./routes/telemetry.routes";
import ruleRouter from "./routes/rule.routes";
import authRouter from "./routes/auth.routes";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());
app.use(cookieParser());

// =========================================================
// Routes
// =========================================================

app.get("/", (req, res) => {
  res.send("TMG Server is running.");
});

app.use("/api/auth", authRouter);
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

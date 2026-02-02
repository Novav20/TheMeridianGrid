import "./config/env";
import express from "express";
import Cors from "cors";
import cookieParser from "cookie-parser";
import assetRouter from "./routes/asset.routes";
import telemetryRouter from "./routes/telemetry.routes";
import ruleRouter from "./routes/rule.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import dashboardRouter from "./routes/dashboard.routes";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();

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
app.use("/api/users", userRouter);
app.use("/api/assets", assetRouter);
app.use("/api/dashboards", dashboardRouter);
app.use("/api/telemetry", telemetryRouter);
app.use("/api/rules", ruleRouter);

// =========================================================
// Error Handling Middleware (MUST be last)
// =========================================================
app.use(globalErrorHandler);

export { app };

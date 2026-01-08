import express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Services & Controllers
import { PrismaService } from "./services/prisma.service";
import { AssetService } from "./services/asset.service";
import { AssetController } from "./controllers/asset.controller";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(Cors());

// =========================================================
// Dependency Injection (Wiring)
// =========================================================

const prisma = PrismaService.getInstance().client;

const assetService = new AssetService(prisma);

const assetController = new AssetController(assetService);
// =========================================================
// Routes
// =========================================================

app.get("/", (req, res) => {
  res.send("TMG Server is running.");
});

app.get("/api/assets", assetController.getAll);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

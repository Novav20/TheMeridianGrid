import { Router } from "express";
import { TelemetryController } from "../controllers/telemetry.controller";
import { TelemetryService } from "../services/telemetry.service";
import { PrismaService } from "../services/prisma.service";

const prisma = PrismaService.getInstance().client;
const telemetryService = new TelemetryService(prisma);
const telemetryController = new TelemetryController(telemetryService);
const router = Router();

router.post("/", telemetryController.ingest);
router.get("/:assetId/history", telemetryController.getHistory);
router.get("/:assetId/latest", telemetryController.getLatest);

export default router;

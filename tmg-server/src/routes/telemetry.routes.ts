import { Router } from "express";
import { TelemetryController } from "../controllers/telemetry.controller";
import { TelemetryService } from "../services/telemetry.service";
import { EvaluationService } from "../services/evaluation.service";
import { PrismaService } from "../services/prisma.service";

const prisma = PrismaService.getInstance().client;
const evaluationService = new EvaluationService(prisma);
const telemetryService = new TelemetryService(prisma, evaluationService);
const telemetryController = new TelemetryController(telemetryService);
const router = Router();

router.post("/", telemetryController.ingest);
router.get("/:assetId/history", telemetryController.getHistory);
router.get("/:assetId/latest", telemetryController.getLatest);

export default router;

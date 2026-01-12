import { Router } from "express";
import { TelemetryController } from "../controllers/telemetry.controller";
import { TelemetryService } from "../services/telemetry.service";
import { PrismaService } from "../services/prisma.service";

const prisma = PrismaService.getInstance().client;
const telemetryService = new TelemetryService(prisma);
const telemetryController = new TelemetryController(telemetryService);
const router = Router();

router.post("/", telemetryController.ingest);

export default router;

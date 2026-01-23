import { Router } from "express";
import { container } from "../config/container";

const router = Router();
const telemetryController = container.telemetryController;

router.post("/", telemetryController.ingest);
router.get("/:assetId/history", telemetryController.getHistory);
router.get("/:assetId/latest", telemetryController.getLatest);

export default router;

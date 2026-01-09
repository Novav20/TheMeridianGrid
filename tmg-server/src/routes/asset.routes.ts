import { Router } from "express";
import { AssetController } from "../controllers/asset.controller";
import { AssetService } from "../services/asset.service";
import { PrismaService } from "../services/prisma.service";

const prisma = PrismaService.getInstance().client;
const assetService = new AssetService(prisma);
const assetController = new AssetController(assetService);

const router = Router();

router.get("/", assetController.getAll);
router.post("/", assetController.create);
router.get("/:id", assetController.getById);

export default router;
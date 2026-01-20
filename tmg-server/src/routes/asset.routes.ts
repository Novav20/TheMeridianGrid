import { Router } from "express";
import { AssetController } from "../controllers/asset.controller";
import { AssetService } from "../services/asset.service";
import { PrismaService } from "../services/prisma.service";
import { authenticate } from "../middleware/auth.middleware";

const prisma = PrismaService.getInstance().client;
const assetService = new AssetService(prisma);
const assetController = new AssetController(assetService);

const router = Router();

// Apply authentication middleware to all asset routes
router.use(authenticate);

router.get("/", assetController.getAll);
router.post("/", assetController.create);
router.get("/:id", assetController.getById);
router.patch("/:id", assetController.update);
router.delete("/:id", assetController.delete);

export default router;
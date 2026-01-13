import { Router } from "express";
import { RuleController } from "../controllers/rule.controller";
import { RuleService } from "../services/rule.service";
import { PrismaService } from "../services/prisma.service";

const prisma = PrismaService.getInstance().client;
const ruleService = new RuleService(prisma);
const ruleController = new RuleController(ruleService);

const router = Router();

router.post("/", ruleController.create);
router.get("/asset/:assetId", ruleController.getByAsset);
router.patch("/:id", ruleController.update);
router.delete("/:id", ruleController.delete);

export default router;

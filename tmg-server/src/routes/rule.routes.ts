import { Router } from "express";
import { container } from "../config/container";

const router = Router();
const ruleController = container.ruleController;

router.post("/", ruleController.create);
router.get("/asset/:assetId", ruleController.getByAsset);
router.patch("/:id", ruleController.update);
router.delete("/:id", ruleController.delete);

export default router;

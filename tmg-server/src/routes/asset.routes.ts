import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/rbac.middleware";
import { SystemRole } from "../config/roles";
import { container } from "../config/container";

const router = Router();
const assetController = container.assetController;

// Apply authentication middleware to all asset routes
router.use(authenticate);

router.get("/", assetController.getAll);
router.post(
  "/",
  authorize([SystemRole.ADMINISTRATOR, SystemRole.INTEGRATOR]),
  assetController.create,
);
router.get("/:id", assetController.getById);
router.patch(
  "/:id",
  authorize([SystemRole.ADMINISTRATOR, SystemRole.INTEGRATOR]),
  assetController.update,
);
router.delete(
  "/:id",
  authorize([SystemRole.ADMINISTRATOR, SystemRole.INTEGRATOR]),
  assetController.delete,
);

export default router;

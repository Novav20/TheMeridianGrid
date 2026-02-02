import type { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { createDashboardSchema, updateDashboardSchema } from "@tmg/shared";
import { AppError } from "../utils/AppError";

// Explicitly define the params interface
interface DashboardParams {
  id: string;
}

export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  getAll = async (req: Request, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");
    const dashboards = await this.dashboardService.findAll(req.user.userId);
    res.json({ data: dashboards });
  };

  // Use generic Request type to enforce params structure: Request<Params, ResBody, ReqBody, ReqQuery>
  getById = async (req: Request<DashboardParams>, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");
    const { id } = req.params; // Now explicitly string
    
    const dashboard = await this.dashboardService.findById(id, req.user.userId);

    if (!dashboard) {
      throw new AppError(404, "Dashboard not found");
    }

    res.json({ data: dashboard });
  };

  create = async (req: Request, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");
    
    const validatedData = createDashboardSchema.parse(req.body);

    const dashboard = await this.dashboardService.create(req.user.userId, validatedData);
    res.status(201).json({ data: dashboard });
  };

  update = async (req: Request<DashboardParams>, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");
    const { id } = req.params;

    const validatedData = updateDashboardSchema.parse(req.body);

    const dashboard = await this.dashboardService.update(id, req.user.userId, validatedData);
    res.json({ data: dashboard });
  };

  delete = async (req: Request<DashboardParams>, res: Response) => {
    if (!req.user) throw new AppError(401, "Unauthorized");
    const { id } = req.params;

    await this.dashboardService.delete(id, req.user.userId);
    res.status(204).send();
  };
}
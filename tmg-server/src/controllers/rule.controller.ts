import { Request, Response } from "express";
import { RuleService } from "../services/rule.service";
import { createRuleSchema, updateRuleSchema } from "../schemas/rule.schema";

export class RuleController {
  constructor(private ruleService: RuleService) {}

  public create = async (req: Request, res: Response) => {
    const validatedData = createRuleSchema.parse(req.body); // ZodError will be caught by global handler
    const rule = await this.ruleService.createRule(validatedData);
    res.status(201).json(rule);
  };

  public getByAsset = async (req: Request, res: Response) => {
    const { assetId } = req.params;
    const rules = await this.ruleService.getRulesByAsset(assetId);
    res.status(200).json(rules);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const validatedData = updateRuleSchema.parse(req.body);
    const updatedRule = await this.ruleService.updateRule(id, validatedData);
    res.json(updatedRule);
    // Prisma P2025 errors will now be caught by the global handler
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.ruleService.deleteRule(id);
    res.status(204).send();
    // Prisma P2025 errors will now be caught by the global handler
  };
}

import { Request, Response } from "express";
import { RuleService } from "../services/rule.service";
import { createRuleSchema, updateRuleSchema } from "../schemas/rule.schema";

export class RuleController {
  constructor(private ruleService: RuleService) {}

  public create = async (req: Request, res: Response) => {
    try {
      const validatedData = createRuleSchema.parse(req.body);
      const rule = await this.ruleService.createRule(validatedData);
      res.status(201).json(rule);
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ error: error.errors || error.message });
    }
  };

  public getByAsset = async (req: Request, res: Response) => {
    try {
      const { assetId } = req.params;
      const rules = await this.ruleService.getRulesByAsset(assetId);
      res.status(200).json(rules);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const validatedData = updateRuleSchema.parse(req.body);
      const updatedRule = await this.ruleService.updateRule(id, validatedData);
      res.json(updatedRule);
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ error: "Rule not found" });
        return;
      }
      console.error(error);
      res.status(400).json({ error: error.errors || error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.ruleService.deleteRule(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        res.status(404).json({ error: "Rule not found" });
        return;
      }
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

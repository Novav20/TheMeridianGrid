import { Request, Response, NextFunction } from "express";
import { RuleService } from "../services/rule.service";
import {
  createRuleSchema,
  updateRuleSchema,
  CreateRuleDto,
  UpdateRuleDto,
} from "../schemas/rule.schema";
import { ApiResponse } from "../utils/types";
import { Rule } from "../../prisma/client/client";

/**
 * Controller: RuleController
 * Purpose: Handles HTTP traffic for Rule management.
 */
export class RuleController {
  constructor(private ruleService: RuleService) {}

  /**
   * Creates a new rule for an asset.
   */
  public create = async (
    req: Request<{}, ApiResponse<Rule>, CreateRuleDto>,
    res: Response<ApiResponse<Rule>>,
    next: NextFunction
  ) => {
    const validatedData = createRuleSchema.parse(req.body);
    const rule = await this.ruleService.createRule(validatedData);
    res.status(201).json({
      success: true,
      message: "Rule created successfully",
      data: rule,
    });
  };

  /**
   * Retrieves all rules associated with a specific asset.
   */
  public getByAsset = async (
    req: Request<{ assetId: string }, ApiResponse<Rule[]>>,
    res: Response<ApiResponse<Rule[]>>,
    next: NextFunction
  ) => {
    const { assetId } = req.params;
    const rules = await this.ruleService.getRulesByAsset(assetId);
    res.status(200).json({
      success: true,
      data: rules,
    });
  };

  /**
   * Updates an existing rule.
   */
  public update = async (
    req: Request<{ id: string }, ApiResponse<Rule>, UpdateRuleDto>,
    res: Response<ApiResponse<Rule>>,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const validatedData = updateRuleSchema.parse(req.body);
    const updatedRule = await this.ruleService.updateRule(id, validatedData);
    res.status(200).json({
      success: true,
      message: "Rule updated successfully",
      data: updatedRule,
    });
  };

  /**
   * Deletes a rule.
   */
  public delete = async (
    req: Request<{ id: string }, ApiResponse>,
    res: Response<ApiResponse>,
    next: NextFunction
  ) => {
    const { id } = req.params;
    await this.ruleService.deleteRule(id);
    res.status(200).json({
      success: true,
      message: "Rule deleted successfully",
    });
  };
}
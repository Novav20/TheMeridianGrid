import { PrismaClient } from "../../prisma/client/client";
import { CreateRuleDto, UpdateRuleDto } from "../schemas/rule.schema";

export class RuleService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new rule for an asset.
   */
  async createRule(data: CreateRuleDto) {
    return this.prisma.rule.create({
      data,
    });
  }

  /**
   * Retrieves all rules associated with a specific asset.
   */
  async getRulesByAsset(assetId: string) {
    return this.prisma.rule.findMany({
      where: { assetId },
    });
  }

  /**
   * Updates an existing rule.
   */
  async updateRule(id: string, data: UpdateRuleDto) {
    return this.prisma.rule.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a rule.
   */
  async deleteRule(id: string) {
    return this.prisma.rule.delete({
      where: { id },
    });
  }
}

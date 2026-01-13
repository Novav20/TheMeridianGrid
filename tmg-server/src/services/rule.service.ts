import { PrismaClient } from "../../prisma/client/client";
import { CreateRuleDto, UpdateRuleDto } from "../schemas/rule.schema";

export class RuleService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new rule for an asset.
   */
  async createRule(data: CreateRuleDto) {
    // [STUDENT TASK]
    // Implement prisma.rule.create()
    return this.prisma.rule.create({
      data,
    });
  }

  /**
   * Retrieves all rules associated with a specific asset.
   */
  async getRulesByAsset(assetId: string) {
    // [STUDENT TASK]
    // Implement prisma.rule.findMany() where assetId matches
    return this.prisma.rule.findMany({
      where: { assetId },
    });
  }

  /**
   * Updates an existing rule.
   */
  async updateRule(id: string, data: UpdateRuleDto) {
    // [STUDENT TASK]
    // Implement prisma.rule.update() where id matches
    return this.prisma.rule.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a rule.
   */
  async deleteRule(id: string) {
    // [STUDENT TASK]
    // Implement prisma.rule.delete() where id matches
    return this.prisma.rule.delete({
      where: { id },
    });
  }
}

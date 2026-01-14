import {
  PrismaClient,
  RuleOperator,
  AlertStatus,
  Rule,
  Prisma,
} from "../../prisma/client/client";
import { TelemetryDataPointDto } from "../schemas/telemetry.schema";

export class EvaluationService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Evaluates a batch of telemetry points against active rules.
   * Creates alerts for any breaches found, with deduplication.
   *
   * @param telemetryPoints The points being ingested
   * @param tx Optional Prisma transaction client
   */
  async evaluateBatch(
    telemetryPoints: TelemetryDataPointDto[],
    tx?: Prisma.TransactionClient
  ) {
    const client = tx || this.prisma;

    const assetIds = [...new Set(telemetryPoints.map((p) => p.assetId))];

    const rules: Rule[] = await client.rule.findMany({
      where: { assetId: { in: assetIds }, isActive: true },
    });

    for (const point of telemetryPoints) {
      const applicableRules = rules.filter(
        (r) => r.assetId === point.assetId && r.metric === point.propertyName
      );

      for (const rule of applicableRules) {
        if (this.isBreached(point.value, rule.operator, rule.threshold)) {
          // Check if an active alert (status: NEW) already exists
          const existingAlert = await client.alert.findFirst({
            where: {
              status: AlertStatus.NEW,
              ruleId: rule.id,
              assetId: point.assetId,
            },
          });

          if (!existingAlert) {
            await client.alert.create({
              data: {
                status: AlertStatus.NEW,
                severity: rule.severity,
                triggeredAt: point.time,
                ruleId: rule.id,
                assetId: point.assetId,
              },
            });
          }
        }
      }
    }
  }

  /**
   * Safe comparison logic for rule operators.
   */
  private isBreached(
    value: number,
    operator: RuleOperator,
    threshold: number
  ): boolean {
    switch (operator) {
      case RuleOperator.GT:
        return value > threshold;
      case RuleOperator.LT:
        return value < threshold;
      case RuleOperator.EQ:
        return value === threshold;
      case RuleOperator.GTE:
        return value >= threshold;
      case RuleOperator.LTE:
        return value <= threshold;
      default:
        console.warn(
          `Unknown rule operator: ${operator}. Defaulting to false.`
        );
        return false;
    }
  }
}

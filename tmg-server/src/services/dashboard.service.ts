import type { PrismaClient, CreateDashboardDto, UpdateDashboardDto } from "@tmg/shared";
import type { Dashboard } from "@tmg/shared";
import { AppError } from "../utils/AppError";

export class DashboardService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Find all dashboards for a user (or all if admin)
   */
  async findAll(userId: string): Promise<Dashboard[]> {
    return this.prisma.dashboard.findMany({
      where: { creatorId: userId },
      include: { widgets: true },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Find a single dashboard by ID
   */
  async findById(id: string, userId: string): Promise<Dashboard | null> {
    return this.prisma.dashboard.findFirst({
      where: { id, creatorId: userId },
      include: { widgets: true },
    });
  }

  /**
   * Create a new dashboard
   */
  async create(userId: string, data: CreateDashboardDto): Promise<Dashboard> {
    const { layout, widgets, ...rest } = data;

    // Transaction to ensure widgets are created with the dashboard
    return this.prisma.$transaction(async (tx) => {
      const dashboard = await tx.dashboard.create({
        data: {
          ...rest,
          layout: layout as any, // Prisma Json type
          creatorId: userId,
        },
      });

      if (widgets && widgets.length > 0) {
        await tx.widget.createMany({
          data: widgets.map((w) => ({
            type: w.type,
            config: w.props || {},
            dashboardId: dashboard.id,
          })),
        });
      }

      return dashboard;
    });
  }

  /**
   * Update a dashboard layout and widgets
   */
  async update(
    id: string,
    userId: string,
    data: UpdateDashboardDto
  ): Promise<Dashboard> {
    const { layout, widgets, ...rest } = data;

    return this.prisma.$transaction(async (tx) => {
      // 1. Verify ownership
      const existing = await tx.dashboard.findFirst({
        where: { id, creatorId: userId },
      });
      if (!existing) throw new AppError(404, "Dashboard not found or access denied");

      // 2. Update basic info & layout
      const updated = await tx.dashboard.update({
        where: { id },
        data: {
          ...rest,
          layout: layout ? (layout as any) : undefined,
        },
      });

      // 3. Re-create widgets if provided (Simpler than diffing for now)
      if (widgets) {
        await tx.widget.deleteMany({ where: { dashboardId: id } });
        await tx.widget.createMany({
          data: widgets.map((w) => ({
            type: w.type,
            config: w.props || {},
            dashboardId: id,
          })),
        });
      }

      return updated;
    });
  }

  /**
   * Delete a dashboard
   */
  async delete(id: string, userId: string): Promise<void> {
    const existing = await this.prisma.dashboard.findFirst({
      where: { id, creatorId: userId },
    });

    if (!existing) {
      throw new AppError(404, "Dashboard not found or access denied");
    }

    await this.prisma.dashboard.delete({ where: { id } });
  }
}
import type { Dashboard, ApiResponse, CreateDashboardDto, UpdateDashboardDto } from "@tmg/shared";

/**
 * DashboardService - Frontend API client for dashboard management
 * Wraps backend endpoints: GET /api/dashboards, POST /api/dashboards, etc.
 */
export class DashboardService {
    private static baseUrl = "/api/dashboards";

    /**
     * Fetch all dashboards for the current user
     */
    static async getDashboards(): Promise<Dashboard[]> {
        try {
            const response = await fetch(DashboardService.baseUrl, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch dashboards: ${response.statusText}`);
            }

            const body: ApiResponse<Dashboard[]> = await response.json();
            return body.data || [];
        } catch (error) {
            console.error("DashboardService.getDashboards error:", error);
            throw error;
        }
    }

    /**
     * Fetch a single dashboard by ID
     */
    static async getDashboard(id: string): Promise<Dashboard> {
        try {
            const response = await fetch(`${DashboardService.baseUrl}/${id}`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
            }

            const body: ApiResponse<Dashboard> = await response.json();
            if (!body.data) throw new Error("Dashboard not found");
            return body.data;
        } catch (error) {
            console.error("DashboardService.getDashboard error:", error);
            throw error;
        }
    }

    /**
     * Create a new dashboard
     */
    static async createDashboard(data: CreateDashboardDto): Promise<Dashboard> {
        try {
            const response = await fetch(DashboardService.baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorBody: ApiResponse<unknown> = await response.json();
                throw new Error(errorBody.message || "Failed to create dashboard");
            }

            const body: ApiResponse<Dashboard> = await response.json();
            return body.data!;
        } catch (error) {
            console.error("DashboardService.createDashboard error:", error);
            throw error;
        }
    }

    /**
     * Update an existing dashboard
     */
    static async updateDashboard(id: string, data: UpdateDashboardDto): Promise<Dashboard> {
        try {
            const response = await fetch(`${DashboardService.baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorBody: ApiResponse<unknown> = await response.json();
                throw new Error(errorBody.message || "Failed to update dashboard");
            }

            const body: ApiResponse<Dashboard> = await response.json();
            return body.data!;
        } catch (error) {
            console.error("DashboardService.updateDashboard error:", error);
            throw error;
        }
    }

    /**
     * Delete a dashboard
     */
    static async deleteDashboard(id: string): Promise<void> {
        try {
            const response = await fetch(`${DashboardService.baseUrl}/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const errorBody: ApiResponse<unknown> = await response.json();
                throw new Error(errorBody.message || "Failed to delete dashboard");
            }
        } catch (error) {
            console.error("DashboardService.deleteDashboard error:", error);
            throw error;
        }
    }
}
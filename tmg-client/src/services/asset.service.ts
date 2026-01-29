import type { Asset, ApiResponse, AssetState } from "@tmg/shared";

/**
 * AssetService - Frontend API client for asset management
 * Wraps backend endpoints: GET /api/assets, POST /api/assets
 */
export class AssetService {
    private static baseUrl = "/api/assets";

    /**
     * Fetch all assets from the backend
     */
    static async getAssets(): Promise<Asset[]> {
        try {
            const response = await fetch(this.baseUrl, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch assets: ${response.statusText}`);
            }

            const body: ApiResponse<Asset[]> = await response.json();
            return body.data || [];
        } catch (error) {
            console.error("AssetService.getAssets error:", error);
            throw error;
        }
    }

    /**
     * Create a new asset
     */
    static async createAsset(data: {
        name: string;
        model: object;
        state?: AssetState;
    }): Promise<Asset> {
        try {
            const response = await fetch(this.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorBody: ApiResponse<unknown> = await response.json();
                throw new Error(errorBody.message || "Failed to create asset");
            }

            const body: ApiResponse<Asset> = await response.json();
            if (!body.data) {
                throw new Error("No asset data returned from server");
            }

            return body.data;
        } catch (error) {
            console.error("AssetService.createAsset error:", error);
            throw error;
        }
    }
}

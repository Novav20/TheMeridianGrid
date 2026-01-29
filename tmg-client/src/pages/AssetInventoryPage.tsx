import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Button,
    Alert,
    Chip,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import type { Asset } from "@tmg/shared";
import { AssetService } from "../services/asset.service";
import { CreateAssetModal } from "@/components/CreateAssetModal";

/**
 * AssetInventoryPage - Display all assets in a data grid
 */
export const AssetInventoryPage = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const loadAssets = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await AssetService.getAssets();
            setAssets(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load assets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAssets();
    }, []);

    const handleAssetCreated = () => {
        setModalOpen(false);
        loadAssets(); // Refresh the list
    };

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Asset Name",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "state",
            headerName: "State",
            width: 130,
            renderCell: (params) => {
                const colorMap: Record<string, "success" | "default" | "warning" | "error"> = {
                    ACTIVE: "success",
                    DRAFT: "default",
                    MAINTENANCE: "warning",
                    ARCHIVED: "error",
                };
                return (
                    <Chip
                        label={params.value}
                        color={colorMap[params.value] || "default"}
                        size="small"
                    />
                );
            },
        },
        {
            field: "model",
            headerName: "Model",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => {
                const modelStr = JSON.stringify(params.value);
                return (
                    <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                        {modelStr.length > 50 ? `${modelStr.substring(0, 50)}...` : modelStr}
                    </Typography>
                );
            },
        },
        {
            field: "lastSeen",
            headerName: "Last Seen",
            width: 180,
            valueFormatter: (value) => {
                if (!value) return "Never";
                return new Date(value).toLocaleString();
            },
        },
        {
            field: "createdAt",
            headerName: "Created",
            width: 180,
            valueFormatter: (value) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 3 }}>
            {/* Header */}
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h5" fontWeight="bold">
                        Asset Inventory
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setModalOpen(true)}
                    >
                        Create Asset
                    </Button>
                </Box>
            </Paper>

            {/* Error Display */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Data Grid */}
            <Paper elevation={2} sx={{ flex: 1, minHeight: 400, display: "flex", flexDirection: "column" }}>
                <DataGrid
                    rows={assets}
                    columns={columns}
                    loading={loading}
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        "& .MuiDataGrid-cell": {
                            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                            borderBottom: (theme) => `2px solid ${theme.palette.divider}`,
                        },
                    }}
                />
            </Paper>

            {/* Create Asset Modal */}
            <CreateAssetModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={handleAssetCreated}
            />
        </Box>
    );
};

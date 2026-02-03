import { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { AssetService } from "../services/asset.service";
import { CreateAssetModal } from "@/components/CreateAssetModal";
import { queryKeys } from "@/api/queryKeys";

/**
 * AssetInventoryPage - Display all assets in a data grid using React Query
 */
export const AssetInventoryPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    
    // Store the hash (message) of the error the user manually dismissed
    const [dismissedErrorHash, setDismissedErrorHash] = useState<string | null>(null);

    // Fetch assets using React Query
    const { 
        data: assets = [], 
        isLoading, 
        error 
    } = useQuery({
        queryKey: queryKeys.assets.lists(),
        queryFn: () => AssetService.getAssets(),
    });

    // Derived State: We only show the error if it exists AND hasn't been dismissed yet
    const shouldShowError = !!error && dismissedErrorHash !== (error as Error).message;

    const handleAssetCreated = () => {
        setModalOpen(false);
    };

    const handleDismissError = () => {
        if (error) {
            setDismissedErrorHash((error as Error).message);
        }
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

            {/* Error Display - Using Derived visibility state to satisfy ESLint & React 19 best practices */}
            {shouldShowError && (
                <Alert 
                    severity="error" 
                    sx={{ mb: 2 }} 
                    onClose={handleDismissError}
                >
                    {(error as Error).message || "Failed to load assets"}
                </Alert>
            )}

            {/* Data Grid */}
            <Paper elevation={2} sx={{ flex: 1, minHeight: 400, display: "flex", flexDirection: "column" }}>
                <DataGrid
                    rows={assets}
                    columns={columns}
                    loading={isLoading}
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
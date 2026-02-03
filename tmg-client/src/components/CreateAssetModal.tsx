import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
    CircularProgress,
    Box,
} from "@mui/material";
import { AssetState } from "@tmg/shared";
import { AssetService } from "../services/asset.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKeys";

interface CreateAssetModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

/**
 * CreateAssetModal - Form for creating new assets using React Query Mutations
 */
export const CreateAssetModal = ({ open, onClose, onSuccess }: CreateAssetModalProps) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState("");
    const [modelJson, setModelJson] = useState('{"type": "device"}');
    const [state, setState] = useState<AssetState>(AssetState.DRAFT);

    // Mutation for creating the asset
    const { mutate, isPending, error, reset } = useMutation({
        mutationFn: (data: { name: string; model: object; state?: AssetState }) => 
            AssetService.createAsset(data),
        onSuccess: () => {
            // 1. Invalidate cache to trigger refetch in AssetInventoryPage
            queryClient.invalidateQueries({ queryKey: queryKeys.assets.lists() });
            // 2. Notify parent
            onSuccess();
            // 3. Cleanup
            handleClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate JSON
        let modelObject: object;
        try {
            modelObject = JSON.parse(modelJson);
        } catch {
            return; // Validation handled by TextField helperText or similar if needed
        }

        mutate({
            name: name.trim(),
            model: modelObject,
            state,
        });
    };

    const handleClose = () => {
        setName("");
        setModelJson('{"type": "device"}');
        setState(AssetState.DRAFT);
        reset(); // Clear mutation errors
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Asset</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error instanceof Error ? error.message : "Failed to create asset"}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        required
                        fullWidth
                        label="Asset Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        margin="normal"
                        placeholder="e.g., Main Pump 01"
                    />

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>State</InputLabel>
                        <Select
                            value={state}
                            label="State"
                            onChange={(e) => setState(e.target.value as AssetState)}
                            disabled={isPending}
                        >
                            <MenuItem value={AssetState.DRAFT}>Draft</MenuItem>
                            <MenuItem value={AssetState.ACTIVE}>Active</MenuItem>
                            <MenuItem value={AssetState.MAINTENANCE}>Maintenance</MenuItem>
                            <MenuItem value={AssetState.ARCHIVED}>Archived</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        fullWidth
                        label="Model (JSON)"
                        value={modelJson}
                        onChange={(e) => setModelJson(e.target.value)}
                        disabled={isPending}
                        margin="normal"
                        multiline
                        rows={6}
                        placeholder='{"type": "pump", "capacity": 100}'
                        helperText="Enter a valid JSON object"
                        sx={{ fontFamily: "monospace" }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isPending}
                        startIcon={isPending && <CircularProgress size={20} />}
                    >
                        {isPending ? "Creating..." : "Create Asset"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
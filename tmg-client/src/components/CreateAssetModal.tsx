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

interface CreateAssetModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

/**
 * CreateAssetModal - Form for creating new assets
 */
export const CreateAssetModal = ({ open, onClose, onSuccess }: CreateAssetModalProps) => {
    const [name, setName] = useState("");
    const [modelJson, setModelJson] = useState('{"type": "device"}');
    const [state, setState] = useState<AssetState>(AssetState.DRAFT);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate JSON
        let modelObject: object;
        try {
            modelObject = JSON.parse(modelJson);
        } catch {
            setError("Model must be valid JSON");
            return;
        }

        // Validate name
        if (!name.trim()) {
            setError("Asset name is required");
            return;
        }

        try {
            setLoading(true);
            await AssetService.createAsset({
                name: name.trim(),
                model: modelObject,
                state,
            });

            // Reset form
            setName("");
            setModelJson('{"type": "device"}');
            setState(AssetState.DRAFT);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create asset");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setName("");
            setModelJson('{"type": "device"}');
            setState(AssetState.DRAFT);
            setError(null);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Asset</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        autoFocus
                        required
                        fullWidth
                        label="Asset Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        margin="normal"
                        placeholder="e.g., Main Pump 01"
                    />

                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>State</InputLabel>
                        <Select
                            value={state}
                            label="State"
                            onChange={(e) => setState(e.target.value as AssetState)}
                            disabled={loading}
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
                        disabled={loading}
                        margin="normal"
                        multiline
                        rows={6}
                        placeholder='{"type": "pump", "capacity": 100}'
                        helperText="Enter a valid JSON object representing the asset model"
                        sx={{ fontFamily: "monospace" }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? "Creating..." : "Create Asset"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

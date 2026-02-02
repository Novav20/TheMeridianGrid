import { Box, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { BaseWidget } from "./BaseWidget";

interface StatusWidgetProps {
    title: string;
    isActive: boolean;
    activeLabel?: string;
    inactiveLabel?: string;
    // react-grid-layout props
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
}

export const StatusWidget = ({
    isActive,
    activeLabel = "Running",
    inactiveLabel = "Stopped",
    ...props
}: StatusWidgetProps) => {
    return (
        <BaseWidget {...props}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    gap: 2,
                }}
            >
                {isActive ? (
                    <CheckCircleIcon sx={{ fontSize: 60, color: "success.main" }} />
                ) : (
                    <ErrorIcon sx={{ fontSize: 60, color: "error.main" }} />
                )}
                <Chip
                    label={isActive ? activeLabel : inactiveLabel}
                    color={isActive ? "success" : "error"}
                    variant="outlined"
                />
            </Box>
        </BaseWidget>
    );
};

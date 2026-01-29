import { Typography, Box } from "@mui/material";
import { BaseWidget } from "./BaseWidget";

interface StatWidgetProps {
    title: string;
    value: string | number;
    unit?: string;
    // react-grid-layout props
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
}

export const StatWidget = ({ value, unit, ...props }: StatWidgetProps) => {
    return (
        <BaseWidget {...props}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography variant="h3" component="div" fontWeight="bold">
                    {value}
                </Typography>
                {unit && (
                    <Typography variant="subtitle1" color="text.secondary">
                        {unit}
                    </Typography>
                )}
            </Box>
        </BaseWidget>
    );
};

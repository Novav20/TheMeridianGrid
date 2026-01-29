import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, IconButton, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface BaseWidgetProps {
    title: string;
    children: ReactNode;
    className?: string; // Passed by react-grid-layout
    style?: React.CSSProperties; // Passed by react-grid-layout
    onMouseDown?: React.MouseEventHandler; // Passed by react-grid-layout
    onMouseUp?: React.MouseEventHandler; // Passed by react-grid-layout
    onTouchEnd?: React.TouchEventHandler; // Passed by react-grid-layout
    // Add other standard props
}

/**
 * Base Widget Container
 * Wraps all specific widgets with a standard UI (Title, Menu, Drag Handle)
 */
export const BaseWidget = ({
    title,
    children,
    className,
    style,
    onMouseDown,
    onMouseUp,
    onTouchEnd,
    ...props
}: BaseWidgetProps) => { // Capture other props
    return (
        <Card
            className={className}
            style={{ ...style, height: "100%", display: "flex", flexDirection: "column" }}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            {...props}
            raised
        >
            <CardHeader
                title={title}
                titleTypographyProps={{ variant: "h6", fontSize: "1rem" }}
                className="drag-handle" // Class used by React-Grid-Layout to restrict dragging to header
                action={
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                }
                sx={{
                    cursor: "grab",
                    backgroundColor: (theme) => theme.palette.action.hover,
                    padding: 1,
                    "& .MuiCardHeader-action": { margin: 0 },
                }}
            />
            <CardContent sx={{ flex: 1, overflow: "auto", padding: 2 }}>
                {children}
            </CardContent>
        </Card>
    );
};

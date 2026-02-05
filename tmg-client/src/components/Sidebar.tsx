import { Box, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorIcon from "@mui/icons-material/Monitor";
import { Link, useLocation } from "react-router-dom";

/**
 * Sidebar - Navigation sidebar for protected routes.
 * Upgraded to MUI for professional aesthetic.
 */
export const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Assets", icon: <InventoryIcon />, path: "/assets" },
    { text: "Operator View", icon: <MonitorIcon />, path: "/operator" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 0,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          TMG
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mb: 0.5,
                mx: 1,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "rgba(59, 130, 246, 0.12)",
                  color: "primary.main",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ variant: "body2", fontWeight: location.pathname === item.path ? 600 : 400 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAuth } from "../hooks/useAuth";
import { useColorMode } from "../hooks/useColorMode";

/**
 * Navbar - Top navigation bar for protected routes.
 * Homogenized with MUI and project theme.
 */
export const Navbar = () => {
  const { logout, user } = useAuth();
  const { mode, toggleColorMode } = useColorMode();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
          The Meridian Grid
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user && (
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          )}

          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <Button
            variant="outlined"
            size="small"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{
              borderColor: (theme) => theme.palette.divider,
              "&:hover": {
                borderColor: (theme) => theme.palette.text.primary,
                backgroundColor: (theme) => theme.palette.action.hover,
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

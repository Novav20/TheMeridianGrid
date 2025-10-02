import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div">The Meridian Grid</Typography>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AppLayout;

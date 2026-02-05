import { Box, Typography, Paper, AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RefreshIcon from "@mui/icons-material/Refresh";
import { queryKeys } from "@/api/queryKeys";
import { AssetService } from "../services/asset.service";
import { StatusWidget } from "../components/widgets/StatusWidget";
import { StatWidget } from "../components/widgets/StatWidget";

/**
 * OperatorViewPage - A high-performance HMI (HPHMI) prototype based on ISA-101.
 * Focuses on situational awareness: Grayscale by default, color for alarms only.
 */
export const OperatorViewPage = () => {
  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: queryKeys.assets.lists(),
    queryFn: AssetService.getAssets,
    refetchInterval: 5000, // Frequent updates for operator view
  });

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100vh", 
      bgcolor: "#e0e0e0", // ISA-101 gray background
      color: "#000" 
    }}>
      {/* HPHMI Header */}
      <AppBar position="static" sx={{ bgcolor: "#bdbdbd", color: "#000", boxShadow: "none", borderBottom: "1px solid #9e9e9e" }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            OPERATOR CONSOLE | SYSTEM HEALTH
          </Typography>
          <Tooltip title="Refresh">
            <IconButton onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Fullscreen">
            <IconButton onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}>
              <FullscreenIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Main Grid View - Using Flexbox for maximum stability across MUI versions */}
      <Box sx={{ 
        flex: 1, 
        p: 2, 
        overflow: "auto",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: 2
      }}>
        {assets.map((asset) => (
          <Paper 
            key={asset.id}
            elevation={0} 
            sx={{ 
              p: 2, 
              border: "2px solid #9e9e9e", 
              bgcolor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: { xs: "100%", md: "calc(50% - 16px)", lg: "calc(33.33% - 16px)" },
              minWidth: 300
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #bdbdbd", pb: 0.5 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#000" }}>
                {asset.name}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: "monospace", color: "#424242" }}>
                {asset.id.split("-")[0]}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <StatusWidget 
                  title="Connection" 
                  isActive={asset.state === "ACTIVE"}
                  activeLabel="ACTIVE"
                  inactiveLabel="OFFLINE"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <StatWidget 
                  title="State" 
                  value={asset.state} 
                  unit="" 
                />
              </Box>
            </Box>
            
            {/* HPHMI Analog Indicator Placeholder */}
            <Box sx={{ mt: 1, p: 1, bgcolor: "#eeeeee", border: "1px solid #bdbdbd" }}>
               <Typography variant="caption" display="block" gutterBottom>Primary Metric Flow</Typography>
               <Box sx={{ height: 20, width: "100%", bgcolor: "#ccc", position: "relative" }}>
                  <Box sx={{ 
                    height: "100%", 
                    width: asset.state === "ACTIVE" ? "65%" : "0%", 
                    bgcolor: "#757575", // Muted color for normal operation
                    transition: "width 0.5s ease"
                  }} />
               </Box>
               <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                  <Typography variant="caption">0</Typography>
                  <Typography variant="caption">100</Typography>
               </Box>
            </Box>
          </Paper>
        ))}
        
        {isLoading && assets.length === 0 && (
          <Typography sx={{ m: 2 }}>Loading assets for console...</Typography>
        )}
      </Box>

      {/* Footer Info Bar */}
      <Box sx={{ 
        bgcolor: "#bdbdbd", 
        p: 0.5, 
        display: "flex", 
        justifyContent: "space-between", 
        borderTop: "1px solid #9e9e9e" 
      }}>
        <Typography variant="caption">Status: {isLoading ? "UPDATING..." : "LIVE"}</Typography>
        <Typography variant="caption">ISA-101 COMPLIANT VIEW (BETA)</Typography>
      </Box>
    </Box>
  );
};
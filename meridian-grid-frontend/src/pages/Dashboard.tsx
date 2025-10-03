import { Box, Grid, Typography } from "@mui/material";
import Gauge from "../components/dashboard/Gauge";
import RealTimeLineChart from "../components/dashboard/RealTimeLineChart";

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Machine Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <Gauge label="Temperature" value={75} unit="°C" />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <RealTimeLineChart />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;

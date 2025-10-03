import { Box, Typography } from "@mui/material";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export interface GaugeProps {
  label: string;
  value: number;
  unit: string;
}

function Gauge(props: GaugeProps) {
  return (
    <>
      <Box position="relative">
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">
            {props.value}
            {props.unit}
          </Typography>
          <Typography variant="subtitle1">{props.label}</Typography>
        </Box>
        <ResponsiveContainer width="100%" height={200}>
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={[{ value: props.value }]}
          >
            <RadialBar
              dataKey="value"
              cornerRadius="20%"
              background={{ fill: "#eee" }}
              fill="#8884d8"
            ></RadialBar>
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

export default Gauge;

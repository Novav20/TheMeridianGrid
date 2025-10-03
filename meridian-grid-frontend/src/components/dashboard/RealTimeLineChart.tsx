import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DataPoint } from "../../types/chart.types";

interface LineChartProps {
  data: DataPoint[];
}
const staticData: DataPoint[] = [
  { time: "10:00", value: 50 },
  { time: "10:05", value: 55 },
  { time: "10:10", value: 53 },
  { time: "10:15", value: 55 },
  { time: "10:20", value: 54 },
  { time: "10:25", value: 53 },
  { time: "10:30", value: 54 },
  { time: "10:35", value: 56 },
  { time: "10:40", value: 57 },
  { time: "10:45", value: 58 },
];

function RealTimeLineChart() {
  return (
    <>
      <ResponsiveContainer width="50%" height={300}>
        <LineChart data={staticData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            name="Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default RealTimeLineChart;

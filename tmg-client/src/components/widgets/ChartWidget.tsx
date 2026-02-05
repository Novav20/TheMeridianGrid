import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { BaseWidget } from "./BaseWidget";

interface ChartWidgetProps {
    title: string;
    data?: Record<string, unknown>[];
    dataKey?: string;
    // react-grid-layout props
    className?: string;
    style?: React.CSSProperties;
    onMouseDown?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;
    onTouchEnd?: React.TouchEventHandler;
}

const dummyData = [
    { name: "00:00", value: 400 },
    { name: "04:00", value: 300 },
    { name: "08:00", value: 200 },
    { name: "12:00", value: 278 },
    { name: "16:00", value: 189 },
    { name: "20:00", value: 239 },
    { name: "24:00", value: 349 },
];

export const ChartWidget = ({ data = dummyData, dataKey = "value", ...props }: ChartWidgetProps) => {
    return (
        <BaseWidget {...props}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" style={{ fontSize: '0.75rem' }} />
                    <YAxis style={{ fontSize: '0.75rem' }} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </BaseWidget>
    );
};

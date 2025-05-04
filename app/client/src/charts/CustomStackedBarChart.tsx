import { CSSProperties } from 'react';
import { CartesianGrid, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const STACKED_BARS = [
    { dataKey: '50% Paid', fill: '#3DD42F' },
    { dataKey: '50% Not Paid', fill: '#FF4242' },
    { dataKey: 'Fully Paid', fill: '#4C50FD' },
];

const stackedBarChartProps = {
    strokeDashArray: '3 3',
    dataKey: 'name',
    stackId: 'a',
    strokes: {
        cartesianGridStroke: '#374151',
        xAxisStroke: '#9ca3af',
        yAxisStroke: '#9ca3af',
    },

    tooltip: {
        active: true,
        contentStyle: {
            backgroundColor: 'rgba(31, 45, 55, 0.8)',
            borderColor: '#4b5563',
        },
        itemStyle: { color: '#e5e7eb' },
    },
    stackedBars: STACKED_BARS,
    legend: true,
};

export const CustomStackedBarChart = ({ data }: { data: any }) => {
    const { strokeDashArray, dataKey, stackId, strokes, tooltip, stackedBars, legend } = stackedBarChartProps;
    const { cartesianGridStroke, xAxisStroke, yAxisStroke } = strokes;
    const { active, contentStyle, itemStyle } = tooltip;
    return (
        <ResponsiveContainer width={'100%'} height={'100%'} minWidth={'350px'}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray={strokeDashArray} stroke={cartesianGridStroke} />
                <XAxis dataKey={dataKey} stroke={xAxisStroke} />
                <YAxis stroke={yAxisStroke} />
                {stackedBars.map((bar, index) => (
                    <Bar key={index} dataKey={bar.dataKey} stackId={stackId} fill={bar.fill} />
                ))}
                {active && (
                    <Tooltip
                        contentStyle={{
                            ...contentStyle,
                        }}
                        itemStyle={{ ...itemStyle }}
                    />
                )}
                {legend && <Legend />}
            </BarChart>
        </ResponsiveContainer>
    );
};

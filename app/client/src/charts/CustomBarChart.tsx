import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const barChartProps = {
    strokeDashArray: '3 3',
    dataKeys: ['name', 'sales'],
    strokes: {
        cartesianGridStroke: '#4b5563',
        xAxisStroke: '#9ca3af',
        yAxisStroke: '#9ca3af',
    },
    bars: [
        { dataKey: 'Internal 1', fill: '#8B5CF6' },
        { dataKey: 'Internal 2', fill: '#10B981' },
        { dataKey: 'Internal 3', fill: '#F59E0B' },
    ],
    tooltip: {
        active: true,
        contentStyle: {
            backgroundColor: 'rgba(31, 45, 55, 0.8)',
            borderColor: '#4b5563',
        },
        itemStyle: { color: '#e5e7eb' },
    },
    colors: ['#10b981'],
    legend: true,
};

interface CustomBarChartProps {
    data: { [key: string]: number | string }[];
    bar?: {
        fill: string;
    };
}

export const CustomBarChart = ({ data, bar }: CustomBarChartProps) => {
    const { strokeDashArray, dataKeys, strokes, bars, tooltip, colors, legend } = barChartProps;
    const { cartesianGridStroke, xAxisStroke, yAxisStroke } = strokes;
    const { active, contentStyle, itemStyle } = tooltip;
    const barProps = {
        ...bar,
        dataKey: dataKeys[1],
    };

    return (
        <ResponsiveContainer width={'100%'} height={'100%'} minWidth={'350px'}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray={strokeDashArray} stroke={cartesianGridStroke} />
                <XAxis dataKey={dataKeys[0]} stroke={xAxisStroke} />
                <YAxis stroke={yAxisStroke} />
                {bars ? (
                    bars.map((bar, index) => <Bar key={index} dataKey={bar.dataKey} fill={bar.fill} />)
                ) : (
                    <Bar {...barProps}>
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                )}

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

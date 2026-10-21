import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const bankData = [
    { name: 'ABM Bank', value: 25, color: '#10D5C2', outerRadius: 95 },
    { name: 'DBL Bank', value: 25, color: '#4C75FF', outerRadius: 80 },
    { name: 'MCP Bank', value: 25, color: '#FFB338', outerRadius: 82 },
    { name: 'BRC Bank', value: 25, color: '#FF6598', outerRadius: 72 },
];

const legendItems = [
    { name: 'DBL Bank', color: '#4C75FF' },
    { name: 'BRC Bank', color: '#FF6598' },
    { name: 'ABM Bank', color: '#10D5C2' },
    { name: 'MCP Bank', color: '#FFB338' },
]

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0];
        return (
        <div className="bg-[#1E293B] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.color }}/>
            <span className="font-medium">{data.name}</span>
        </div>
        )
    }
    return null
}

const ExpenseStatistics = () => {
    return (
        <div className="flex">
            <div className="w-[500px] max-w-[280px] bg-white rounded-3xl p-5 border border-slate-100 flex flex-col items-center">
                <div className="w-full h-84 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            {bankData.map((entry, index) => {
                                const startAngle = 90 - index * 90;
                                const endAngle = 90 - (index + 1) * 90;
                                return (
                                <Pie
                                    key={entry.name}
                                    data={[entry]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={38}
                                    outerRadius={entry.outerRadius}
                                    startAngle={startAngle}
                                    endAngle={endAngle}
                                    stroke="none"
                                    isAnimationActive={true}
                                >
                                    <Cell fill={entry.color} />
                                </Pie>
                                );
                            })}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-2 w-full px-2">
                    {legendItems.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[#718EBF] text-xs font-semibold whitespace-nowrap">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExpenseStatistics
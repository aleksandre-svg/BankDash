import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
} from 'recharts';

const data = [
    { day: 'Sat', Expense: 500, Income: 950 },
    { day: 'Sun', Expense: 400, Income: 750 },
    { day: 'Mon', Expense: 380, Income: 520 },
    { day: 'Tue', Expense: 850, Income: 450 },
    { day: 'Wed', Expense: 600, Income: 850 },
    { day: 'Thu', Expense: 650, Income: 400 },
    { day: 'Fri', Expense: 750, Income: 850 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
        <div className="bg-[#1E293B] text-white p-3 rounded-xl shadow-xl border border-slate-700/50 text-xs font-medium space-y-1">
            <p className="text-slate-400 font-semibold mb-1">{label}</p>
            <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3AEC]" />
            <span className="text-slate-300">Expense:</span>
            <span className="font-bold text-white">${payload[0]?.value}</span>
            </div>
            <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59100]" />
            <span className="text-slate-300">Income:</span>
            <span className="font-bold text-white">${payload[1]?.value}</span>
            </div>
        </div>
        );
    }
    return null;
};

const ExpenseOverview = () => {
    return (
        <>
            <div className="flex items-center justify-center font-sans">
                <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="text-[#718EBF] text-sm sm:text-base font-normal leading-relaxed">
                            <span className="text-[#232323] font-bold text-base sm:text-lg">$7,560</span>{' '}
                            <span>Expense</span>
                            <span className="mx-1 font-normal">&amp;</span>
                            <span className="text-[#232323] font-bold text-base sm:text-lg">$5,420</span>{' '}
                            <span>Income in this Week</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2.5">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#1E3AEC] inline-block shrink-0" />
                                <span className="text-[#718EBF] text-sm font-medium">Expense</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#F59100] inline-block shrink-0" />
                                <span className="text-[#718EBF] text-sm font-medium">Income</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[280px] sm:h-[320px] ">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                            barGap={8}
                            barCategoryGap="20%"
                            >
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#8BA3CB', fontSize: 13, fontWeight: 500 }}
                                dy={12}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            
                            <Bar
                                dataKey="Expense"
                                fill="#1E3AEC"
                                radius={[12, 12, 12, 12]}
                                maxBarSize={18}
                            />
                            
                            <Bar
                                dataKey="Income"
                                fill="#F59100"
                                radius={[12, 12, 12, 12]}
                                maxBarSize={18}
                            />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExpenseOverview
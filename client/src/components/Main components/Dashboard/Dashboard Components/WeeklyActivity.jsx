import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts"

const WeeklyActivity = ({weeklyActivityData}) => {
    return (
        <>
            <div className="w-full h-[350px]">
                <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                    Weekly Activity
                </h2>
                <div className="bg-white rounded-3xl p-6 h-[355px] w-full translate-y-[2px]">

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyActivityData} barGap={12}>
                        <CartesianGrid stroke="#EDF1F7" vertical={false} />

                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="withdraw"
                            fill="#2323F5"
                            radius={[10, 10, 10, 10]}
                            barSize={18}
                        />

                        <Bar
                            dataKey="deposit"
                            fill="#26C6C3"
                            radius={[10, 10, 10, 10]}
                            barSize={18}
                        />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default WeeklyActivity
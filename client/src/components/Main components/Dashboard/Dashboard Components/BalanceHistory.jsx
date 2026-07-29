import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"

const data = [
    { month: "Jul", balance: 120 },
    { month: "Aug", balance: 320 },
    { month: "Sep", balance: 470 },
    { month: "Oct", balance: 780 },
    { month: "Nov", balance: 220 },
    { month: "Dec", balance: 570 },
    { month: "Jan", balance: 250 },
    { month: "Feb", balance: 640 },
];

const BalanceHistory = ({BalanceHistoryData}) => {
    return (
        <>
            <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                Balance History
            </h2>
            <div className="bg-white rounded-3xl p-6 h-[350px]">

                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={data}>
                    <defs>
                        <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2D60FF" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#2D60FF" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        stroke="#E5E7EB"
                        strokeDasharray="5 5"
                        vertical={true}
                    />

                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#2D60FF"
                        strokeWidth={3}
                        fill="url(#balance)"
                    />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default BalanceHistory
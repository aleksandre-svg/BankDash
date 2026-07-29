import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Cell,
    LabelList,
} from "recharts"

const Expense = ({expenseData}) => {
    return (
        <>
            <h3 className="font-[600] text-[22px] text-[#343C6A]">My Expense</h3>
            <div className="bg-white rounded-3xl p-6 h-[235px]">

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData}>
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                        />

                        <Bar
                            dataKey="expense"
                            radius={[10, 10, 10, 10]}
                            barSize={36}
                        >
                            <LabelList
                                dataKey="expense"
                                position="top"
                                formatter={(value) =>
                                    value === 12500 ? "$12,500" : ""
                                }
                                />
                            {
                                expenseData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                    entry.month === "Dec"
                                        ? "#22D3C5"
                                        : "#EEF2FA"
                                    }
                                />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default Expense
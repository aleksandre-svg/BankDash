import { useState, useEffect } from 'react'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
} from 'recharts'
import api from '../../../../api/axios'
import { UserContext } from '../../../../App'
import { useContext } from 'react'

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
        )
    }
    return null
}

const ExpenseOverview = () => {
    const { currentUser } = useContext(UserContext)
    const [data, setData] = useState([])
    const [totalExpense, setTotalExpense] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const response = await api.get('transactions/')
                const transactions = response.data

                const daysOrder = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                const aggregated = daysOrder.reduce((acc, day) => {
                    acc[day] = { day, Expense: 0, Income: 0 }
                    return acc
                }, {})

                let expSum = 0
                let incSum = 0

                transactions.forEach((tx) => {
                    const dateObj = new Date(tx.date)
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                    const amount = Math.abs(parseFloat(tx.balance) || 0)

                    if (aggregated[dayName]) {
                        if ((tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id)))) {
                            aggregated[dayName].Income += amount
                            incSum += amount
                        } else {
                            aggregated[dayName].Expense += amount
                            expSum += amount
                        }
                    }
                })

                setData(daysOrder.map(day => aggregated[day]))
                setTotalExpense(expSum)
                setTotalIncome(incSum)
            } catch (err) {
                console.error("Failed to fetch expense overview data", err)
            } finally {
                setLoading(false)
            }
        }

        fetchOverviewData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center font-sans bg-white rounded-3xl p-8 h-[350px] shadow-sm">
                <p className="text-sm text-[#718EBF]">Loading overview...</p>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center font-sans">
            <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="text-[#718EBF] text-sm sm:text-base font-normal leading-relaxed">
                        <span className="text-[#232323] font-bold text-base sm:text-lg">${totalExpense.toLocaleString()}</span>{' '}
                        <span>Expense</span>
                        <span className="mx-1 font-normal">&amp;</span>
                        <span className="text-[#232323] font-bold text-base sm:text-lg">${totalIncome.toLocaleString()}</span>{' '}
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

                <div className="h-[280px] sm:h-[320px]">
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
    )
}

export default ExpenseOverview
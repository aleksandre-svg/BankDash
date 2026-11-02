import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
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
import { UserContext } from '../../../../App'
import api from '../../../../api/axios'

const DAYS_ORDER = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const WeeklyActivity = () => {
    const { currentUser } = useContext(UserContext)
    const [weeklyActivityData, setWeeklyActivityData] = useState([])
    const [loading, setLoading] = useState(true)

    const currentUserId = Number(currentUser?.id)

    const isDeposit = useCallback((tx) => {
        const isOwner = Number(tx.transaction_owner) === currentUserId
        return (tx.transation_result && isOwner) || (!tx.transation_result && !isOwner)
    }, [currentUserId])

    useEffect(() => {
        let isMounted = true

        const fetchWeeklyActivity = async () => {
            try {
                const { data: transactions } = await api.get('transactions/')

                const aggregated = DAYS_ORDER.reduce((acc, day) => {
                    acc[day] = { day, withdraw: 0, deposit: 0 }
                    return acc
                }, {})

                transactions.forEach((tx) => {
                    const dayName = new Date(tx.date).toLocaleDateString('en-US', { weekday: 'short' })
                    const amount = Math.abs(parseFloat(tx.balance) || 0)

                    if (aggregated[dayName]) {
                        if (isDeposit(tx)) {
                            aggregated[dayName].deposit += amount
                        } else {
                            aggregated[dayName].withdraw += amount
                        }
                    }
                })

                if (isMounted) {
                    setWeeklyActivityData(DAYS_ORDER.map(day => aggregated[day]))
                }
            } catch (err) {
                console.error("Failed to fetch weekly activity", err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchWeeklyActivity()
        return () => { isMounted = false }
    }, [isDeposit])

    const chartContent = useMemo(() => {
        if (loading) {
            return (
                <div className="bg-white rounded-3xl p-6 h-[355px] w-full flex items-center justify-center">
                    <p className="text-sm text-[#718EBF]">Loading activity...</p>
                </div>
            )
        }

        return (
            <div className="bg-white rounded-3xl p-6 h-[312px] w-full translate-y-[2px] shadow-sm border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyActivityData} barGap={12}>
                        <CartesianGrid stroke="#EDF1F7" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#718EBF', fontSize: 12 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: '#718EBF', fontSize: 12 }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="withdraw"
                            name="Income"
                            fill="#2323F5"
                            radius={[10, 10, 10, 10]}
                            barSize={18}
                        />
                        <Bar
                            dataKey="deposit"
                            name="Expense"
                            fill="#26C6C3"
                            radius={[10, 10, 10, 10]}
                            barSize={18}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }, [loading, weeklyActivityData])

    return (
        <div className="w-full h-[350px]">
            <h2 className="text-[22px] font-semibold mb-4 text-[#343C6A]">
                Weekly Activity
            </h2>
            {chartContent}
        </div>
    )
}

export default WeeklyActivity
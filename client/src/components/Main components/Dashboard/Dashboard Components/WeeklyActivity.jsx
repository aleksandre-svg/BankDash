import { useState, useEffect } from 'react'
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
import api from '../../../../api/axios'
import { useContext } from 'react'
import { UserContext } from '../../../../App'

const WeeklyActivity = () => {
    const { currentUser } = useContext(UserContext)
    const [weeklyActivityData, setWeeklyActivityData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWeeklyActivity = async () => {
            try {
                const response = await api.get('transactions/')
                const transactions = response.data

                const daysOrder = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                const aggregated = daysOrder.reduce((acc, day) => {
                    acc[day] = { day, withdraw: 0, deposit: 0 }
                    return acc
                }, {})

                transactions.forEach((tx) => {
                    const dateObj = new Date(tx.date)
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                    const amount = Math.abs(parseFloat(tx.balance) || 0)

                    if ((tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id)))) {
                        aggregated[dayName].deposit += amount
                    } else {
                        aggregated[dayName].withdraw += amount
                    }
                    
                })

                setWeeklyActivityData(daysOrder.map(day => aggregated[day]))
            } catch (err) {
                console.error("Failed to fetch weekly activity", err)
            } finally {
                setLoading(false)
            }
        }

        fetchWeeklyActivity()
    }, [])

    if (loading) {
        return (
            <div className="w-full h-[350px]">
                <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                    Weekly Activity
                </h2>
                <div className="bg-white rounded-3xl p-6 h-[355px] w-full flex items-center justify-center">
                    <p className="text-sm text-[#718EBF]">Loading activity...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-[350px]">
            <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                Weekly Activity
            </h2>
            <div className="bg-white rounded-3xl p-6 h-[355px] w-full translate-y-[2px] shadow-sm border border-slate-100">
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
        </div>
    )
}

export default WeeklyActivity
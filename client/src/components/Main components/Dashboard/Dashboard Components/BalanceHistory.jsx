import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"
import { UserContext } from '../../../../App'
import api from '../../../../api/axios'

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#1E293B] text-white p-3 rounded-xl shadow-xl border border-slate-700/50 text-xs font-medium space-y-1">
                <p className="text-slate-400 font-semibold mb-1">{label}</p>
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2D60FF]" />
                    <span className="text-slate-300">Balance:</span>
                    <span className="font-bold text-white">${Number(payload[0]?.value || 0).toLocaleString()}</span>
                </div>
            </div>
        )
    }
    return null
}

const BalanceHistory = () => {
    const { currentUser } = useContext(UserContext)
    const [balanceData, setBalanceData] = useState([])
    const [loading, setLoading] = useState(true)

    const currentUserId = Number(currentUser?.id)

    const isIncome = useCallback((tx) => {
        const ownerId = typeof tx.transaction_owner === 'object' ? tx.transaction_owner?.id : tx.transaction_owner
        const isOwner = Number(ownerId) === currentUserId
        return (tx.transation_result === true && isOwner) || (!tx.transation_result && !isOwner)
    }, [currentUserId])

    useEffect(() => {
        let isMounted = true

        const fetchBalanceHistory = async () => {
            try {
                const [{ data: cards }, { data: transactions }] = await Promise.all([
                    api.get('cards/'),
                    api.get('transactions/')
                ])

                const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))
                const currentBalance = cards.reduce((sum, card) => sum + (parseFloat(card.balance) || 0), 0)
                
                const monthMap = {}
                const now = new Date()
                for (let i = 7; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
                    const label = MONTH_NAMES[d.getMonth()]
                    monthMap[label] = { month: label, balance: 0 }
                }

                if (!currentUser) {
                    Object.keys(monthMap).forEach(m => {
                        monthMap[m].balance = currentBalance
                    })
                } else {
                    const monthlyDeltas = {}
                    Object.keys(monthMap).forEach(m => { monthlyDeltas[m] = 0 })

                    sortedTx.forEach(tx => {
                        const d = new Date(tx.date)
                        const label = MONTH_NAMES[d.getMonth()]
                        if (monthMap[label]) {
                            const amount = parseFloat(tx.balance) || 0
                            if (isIncome(tx)) {
                                monthlyDeltas[label] -= amount
                            } else {
                                monthlyDeltas[label] += amount
                            }
                        }
                    })

                    let tempBalance = currentBalance
                    const keys = Object.keys(monthMap)
                    for (let i = keys.length - 1; i >= 0; i--) {
                        const label = keys[i]
                        monthMap[label].balance = tempBalance
                        tempBalance += monthlyDeltas[label]
                    }
                }

                if (isMounted) {
                    setBalanceData(Object.values(monthMap))
                }
            } catch (err) {
                console.error("Failed to fetch balance history", err)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchBalanceHistory()
        return () => { isMounted = false }
    }, [currentUser, isIncome])

    const chartContent = useMemo(() => {
        if (loading) {
            return (
                <div className="bg-white rounded-3xl p-6 h-[350px] flex items-center justify-center border border-slate-100 shadow-sm">
                    <p className="text-sm text-[#718EBF] font-medium">Loading balance history...</p>
                </div>
            )
        }

        return (
            <div className="bg-white rounded-3xl p-6 h-[350px] shadow-sm border border-slate-100">
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={balanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                            tick={{ fill: '#718EBF', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#718EBF', fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2D60FF', strokeWidth: 1, strokeDasharray: '3 3' }} />
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
        )
    }, [loading, balanceData])

    return (
        <div className="w-full">
            <h2 className="text-[22px] font-semibold mb-4 text-[#343C6A]">
                Balance History
            </h2>
            {chartContent}
        </div>
    )
}

export default BalanceHistory
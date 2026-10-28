import { useState, useEffect } from 'react'
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts"
import api from '../../../../api/axios'
import { useContext } from 'react'
import { UserContext } from '../../../../App'

const BalanceHistory = () => {
    const { currentUser } = useContext(UserContext)
    const [balanceData, setBalanceData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBalanceHistory = async () => {
            try {
                const response = await api.get('cards/')
                const cards = response.data

                const txResponse = await api.get('transactions/')
                const transactions = txResponse.data

                const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date))

                let currentBalance = cards.reduce((sum, card) => sum + (parseFloat(card.balance) || 0), 0)
                
                const monthMap = {}
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

                const now = new Date()
                for (let i = 7; i >= 0; i--) {
                    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
                    const label = `${monthNames[d.getMonth()]}`
                    monthMap[label] = { month: label, balance: 0 }
                }

                if (!currentUser) {
                    Object.keys(monthMap).forEach(m => {
                        monthMap[m].balance = currentBalance
                    })
                } else {
                    let runningBalance = currentBalance
                    
                    const monthlyDeltas = {}
                    Object.keys(monthMap).forEach(m => { monthlyDeltas[m] = 0 })

                    sortedTx.forEach(tx => {
                        const d = new Date(tx.date)
                        const label = monthNames[d.getMonth()]
                        if (monthMap[label]) {
                            const amount = parseFloat(tx.balance) || 0
                            const ownerId = typeof tx.transaction_owner === 'object' ? tx.transaction_owner?.id : tx.transaction_owner
                            const isIncome = tx.transation_result === true
                            const isOwner = Number(ownerId) === Number(currentUser.id)

                            if ((isIncome && isOwner) || (!isIncome && !isOwner)) {
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

                setBalanceData(Object.values(monthMap))
            } catch (err) {
                console.error("Failed to fetch balance history", err)
            } finally {
                setLoading(false)
            }
        }

        fetchBalanceHistory()
    }, [currentUser])

    if (loading) {
        return (
            <>
                <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                    Balance History
                </h2>
                <div className="bg-white rounded-3xl p-6 h-[350px] flex items-center justify-center">
                    <p className="text-sm text-[#718EBF]">Loading balance history...</p>
                </div>
            </>
        )
    }

    return (
        <>
            <h2 className="text-[22px] font-[600] mb-4 text-[#343C6A]">
                Balance History
            </h2>
            <div className="bg-white rounded-3xl p-6 h-[350px] shadow-sm border border-slate-100">
                <ResponsiveContainer width="100%" height="90%">
                    <AreaChart data={balanceData}>
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
                            tick={{ fill: '#718EBF', fontSize: 12 }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#718EBF', fontSize: 12 }}
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
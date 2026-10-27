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

                if (sortedTx.length === 0) {
                    Object.keys(monthMap).forEach(m => {
                        monthMap[m].balance = currentBalance
                    })
                } else {
                    let runningBalance = currentBalance
                    sortedTx.forEach(tx => {
                        const d = new Date(tx.date)
                        const label = monthNames[d.getMonth()]
                        if (monthMap[label]) {
                            const amount = parseFloat(tx.balance) || 0
                            if ((tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id)))) {
                                runningBalance -= amount
                            } else {
                                runningBalance += amount
                            }
                        }
                    })

                    let lastKnown = currentBalance
                    Object.keys(monthMap).forEach(m => {
                        monthMap[m].balance = lastKnown
                    })
                }

                setBalanceData(Object.values(monthMap))
            } catch (err) {
                console.error("Failed to fetch balance history", err)
            } finally {
                setLoading(false)
            }
        }

        fetchBalanceHistory()
    }, [])

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
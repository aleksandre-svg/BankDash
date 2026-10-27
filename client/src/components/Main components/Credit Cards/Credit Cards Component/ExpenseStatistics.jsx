import { useState, useEffect, useContext } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import api from '../../../../api/axios'
import { UserContext } from '../../../../App'

const palette = ['#10D5C2', '#4C75FF', '#FFB338', '#FF6598', '#8B5CF6', '#EC4899']
const outerRadii = [95, 80, 82, 72, 88, 76]

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0]
        return (
            <div className="bg-[#1E293B] text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.payload.color }} />
                <span className="font-medium">{data.name}: ${data.value.toLocaleString()}</span>
            </div>
        )
    }
    return null
}

const ExpenseStatistics = () => {
    const { currentUser } = useContext(UserContext)
    const [bankData, setBankData] = useState([])
    const [legendItems, setLegendItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBankExpenses = async () => {
            try {
                const [txRes, cardRes] = await Promise.all([
                    api.get('transactions/'),
                    api.get('cards/')
                ])

                const transactions = txRes.data
                const cards = cardRes.data

                const cardBankMap = {}
                cards.forEach((card) => {
                    console.log(card.bank)
                    cardBankMap[card.id] = card.bank || 'Other Bank'
                })

                const bankTotals = {}
                cards.forEach((card) => {
                    const bankName = card.bank || 'Other Bank'
                    if (!bankTotals[bankName]) {
                        bankTotals[bankName] = 0
                    }
                })

                transactions.forEach((tx) => {
                    const amount = Math.abs(parseFloat(tx.balance) || 0)
                    const ownerId = typeof tx.transaction_owner === 'object' ? tx.transaction_owner?.id : tx.transaction_owner
                    const isIncome = (tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id)))
                    const isOwner = currentUser.id ? Number(ownerId) === Number(currentUser.id) : true

                    const isExpense = tx.transation_result

                    if (isExpense) {
                        const cardId = typeof tx.card === 'object' ? tx.card?.id : tx.card
                        const bankName = cardBankMap[cardId] || 'Other Bank'
                        bankTotals[bankName] = (bankTotals[bankName] || 0) + amount
                    }
                })

                const entries = Object.keys(bankTotals)
                const formattedData = entries.map((bank, index) => {
                    const value = bankTotals[bank]
                    const color = palette[index % palette.length]
                    const outerRadius = outerRadii[index % outerRadii.length]
                    return { name: bank, value, color, outerRadius }
                })

                const activeData = formattedData.filter(item => item.value > 0)
                const finalData = activeData.length > 0 ? activeData : formattedData.map(item => ({ ...item, value: 1 }))
                
                const sumValues = finalData.reduce((acc, curr) => acc + curr.value, 0)

                let accumulatedAngle = 90
                const processedData = finalData.map((entry) => {
                    const angleSpan = (entry.value / sumValues) * 360
                    const startAngle = accumulatedAngle
                    const endAngle = accumulatedAngle - angleSpan
                    accumulatedAngle = endAngle

                    return {
                        ...entry,
                        startAngle,
                        endAngle
                    }
                })

                setBankData(processedData)
                setLegendItems(finalData.map(item => ({ name: item.name, color: item.color })))
            } catch (err) {
                console.error("Failed to fetch bank expenses", err)
            } finally {
                setLoading(false)
            }
        }

        fetchBankExpenses()
    }, [])

    if (loading) {
        return (
            <div className="flex">
                <div className="w-[500px] max-w-[280px] h-[350px] bg-white rounded-3xl p-5 border border-slate-100 flex flex-col items-center justify-center">
                    <p className="text-sm text-[#718EBF]">Loading statistics...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex">
            <div className="w-[500px] max-w-[280px] bg-white rounded-3xl p-5 border border-slate-100 flex flex-col items-center">
                <div className="w-full h-84 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Tooltip content={<CustomTooltip />} />
                            {bankData.map((entry) => (
                                <Pie
                                    key={entry.name}
                                    data={[entry]}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={38}
                                    outerRadius={entry.outerRadius}
                                    startAngle={entry.startAngle}
                                    endAngle={entry.endAngle}
                                    stroke="none"
                                    isAnimationActive={true}
                                >
                                    <Cell fill={entry.color} />
                                </Pie>
                            ))}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-2 w-full px-2">
                    {legendItems.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[#718EBF] text-xs font-semibold whitespace-nowrap truncate">
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExpenseStatistics
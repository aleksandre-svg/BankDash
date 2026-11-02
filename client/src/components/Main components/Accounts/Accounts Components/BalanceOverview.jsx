import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { Wallet, HandCoins, BanknoteArrowDown, Coins } from 'lucide-react'
import api from '../../../../api/axios'
import { UserContext } from '../../../../App'

const BalanceOverview = () => {
    const { currentUser } = useContext(UserContext)
    const [cards, setCards] = useState([])
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const currentUserId = Number(currentUser?.id)

    const isIncomeTx = useCallback((tx) => {
        const isOwner = Number(tx.transaction_owner) === currentUserId
        return (tx.transation_result && isOwner) || (!tx.transation_result && !isOwner)
    }, [currentUserId])

    useEffect(() => {
        let isMounted = true

        const fetchData = async () => {
            try {
                const [cardsRes, txRes] = await Promise.all([
                    api.get('cards/'),
                    api.get('transactions/')
                ])
                if (isMounted) {
                    setCards(cardsRes.data)
                    setTransactions(txRes.data)
                }
            } catch (err) {
                console.error("Failed to fetch balance overview data", err)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchData()
        return () => { isMounted = false }
    }, [])

    const totalBalance = useMemo(() => {
        return cards.reduce((sum, c) => sum + (parseFloat(c.balance) || 0), 0)
    }, [cards])

    const { totalIncome, totalExpense } = useMemo(() => {
        let income = 0
        let expense = 0

        transactions.forEach(tx => {
            const amount = Math.abs(parseFloat(tx.balance) || 0)
            if (isIncomeTx(tx)) {
                income += amount
            } else {
                expense += amount
            }
        })

        return { totalIncome: income, totalExpense: expense }
    }, [transactions, isIncomeTx])

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-[120px] bg-white rounded-[25px] shadow-sm border border-slate-100">
                <p className="text-sm text-[#718EBF]">Loading overview...</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px] shadow-sm border border-slate-100">
                <div className="bg-[#FFF5D9] w-[70px] h-[70px] rounded-full flex items-center justify-center shrink-0">
                    <Wallet color="#FFBB38" size={30} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#718EBF] text-[16px] font-medium">My Balance</h2>
                    <h3 className="text-[#232323] text-[25px] font-bold">
                        ${totalBalance.toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className="h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px] shadow-sm border border-slate-100">
                <div className="bg-[#E7EDFF] w-[70px] h-[70px] rounded-full flex items-center justify-center shrink-0">
                    <HandCoins color="#396AFF" size={30} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#718EBF] text-[16px] font-medium">Income</h2>
                    <h3 className="text-[#232323] text-[25px] font-bold">
                        ${totalIncome.toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className="h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px] shadow-sm border border-slate-100">
                <div className="bg-[#FFE0EB] w-[70px] h-[70px] rounded-full flex items-center justify-center shrink-0">
                    <BanknoteArrowDown color="#FF82AC" size={30} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#718EBF] text-[16px] font-medium">Expense</h2>
                    <h3 className="text-[#232323] text-[25px] font-bold">
                        ${totalExpense.toLocaleString()}
                    </h3>
                </div>
            </div>

            <div className="h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px] shadow-sm border border-slate-100">
                <div className="bg-[#DCFAF8] w-[70px] h-[70px] rounded-full flex items-center justify-center shrink-0">
                    <Coins color="#16DBCC" size={30} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-[#718EBF] text-[16px] font-medium">Total Debt</h2>
                    <h3 className="text-[#232323] text-[25px] font-bold">
                        ${(totalBalance < 0 ? totalBalance : 0).toLocaleString()}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default BalanceOverview
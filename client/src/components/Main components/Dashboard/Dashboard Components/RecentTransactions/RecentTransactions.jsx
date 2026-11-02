import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { Wrench, User, Bell } from 'lucide-react'
import { UserContext } from '../../../../../App'
import api from '../../../../../api/axios'

const RecentTransactions = () => {
    const { currentUser } = useContext(UserContext)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const currentUserId = Number(currentUser?.id)

    const isIncome = useCallback((item) => {
        const isOwner = Number(item.transaction_owner) === currentUserId
        return (item.transation_result && isOwner) || (!item.transation_result && !isOwner)
    }, [currentUserId])

    useEffect(() => {
        let isMounted = true

        const getTransactions = async () => {
            try {
                const { data } = await api.get('transactions/')
                const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
                if (isMounted) {
                    setTransactions(sorted.slice(0, 4))
                }
            } catch (err) {
                console.error("Failed to fetch recent transactions", err)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        getTransactions()
        return () => { isMounted = false }
    }, [])

    const content = useMemo(() => {
        if (loading) {
            return <p className="text-sm text-[#718EBF] text-center">Loading...</p>
        }

        if (transactions.length === 0) {
            return <p className="text-sm text-[#718EBF] text-center">No recent transactions</p>
        }

        return transactions.map((item) => {
            const income = isIncome(item)
            const type = item.transaction_type?.toLowerCase() || ''
            const isTransfer = type.includes('transfer')
            const isService = type.includes('service')

            return (
                <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-[50px] h-[50px] rounded-[20px] flex items-center justify-center shrink-0 ${isTransfer ? 'bg-pink-50' : isService ? 'bg-blue-50' : 'bg-teal-50'}`}>
                            {isTransfer && <User size={22} color='#FF82AC' />}
                            {isService && <Wrench size={22} color='#396AFF' />}
                            {!isTransfer && !isService && <Bell color='#16DBCC' size={22} />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#232323] font-semibold text-sm leading-tight">
                                {item.description || 'Transaction'}
                            </span>
                            <span className="text-[#A3AED0] text-xs font-normal mt-1">
                                {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                    <div className={`text-sm font-semibold ${income ? 'text-[#05CD99]' : 'text-[#EE5D50]'}`}>
                        {income ? '+' : '-'}${Math.abs(item.balance)}
                    </div>
                </div>
            )
        })
    }, [loading, transactions, isIncome])

    return (
        <div className="flex flex-col gap-[20px]">
            <h2 className="text-[#343C6A] text-[22px] font-semibold">Recent Transaction</h2>
            <div className="w-[350px] bg-white rounded-[25px] py-[25px] px-[20px] flex flex-col gap-[20px] border border-slate-100 shadow-sm">
                {content}
            </div>
        </div>
    )
}

export default RecentTransactions
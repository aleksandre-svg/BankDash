import { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { Wrench, User, Bell } from 'lucide-react'
import { UserContext } from '../../../../App'
import api from '../../../../api/axios'

const LastTransaction = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(UserContext)

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
                const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
                if (isMounted) {
                    setTransactions(sortedData.slice(0, 3))
                }
            } catch (err) {
                console.error("Failed to fetch transactions", err)
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
            return <p className="text-sm text-[#718EBF] text-center py-4">Loading transactions...</p>
        }

        if (transactions.length === 0) {
            return <h2 className="text-[#333B69] text-[16px] font-semibold py-[15px] text-center">No transactions</h2>
        }

        return transactions.map((item) => {
            const income = isIncome(item)
            const type = item.transaction_type?.toLowerCase() || ''
            const isTransfer = type.includes('transfer')
            const isService = type.includes('service')

            const formattedDate = new Date(item.date).toLocaleDateString()
            const formattedTime = new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            return (
                <div key={item.id} className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 py-2.5 hover:bg-slate-50/60 rounded-2xl transition-colors duration-150 px-3 sm:px-5">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-[200px] sm:min-w-[240px]">
                        <div className={`w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-[16px] sm:rounded-[20px] flex items-center justify-center shrink-0 ${isTransfer ? 'bg-pink-50' : isService ? 'bg-blue-50' : 'bg-teal-50'}`}>
                            {isTransfer && <User size={22} color='#FF82AC' />}
                            {isService && <Wrench size={22} color='#396AFF' />}
                            {!isTransfer && !isService && <Bell color='#16DBCC' size={22} />}
                        </div>

                        <div className="flex flex-col truncate">
                            <span className="text-[#232323] font-semibold text-sm sm:text-base leading-snug truncate max-w-[140px] sm:max-w-[180px]">
                                {item.description || 'Transaction'}
                            </span>
                            <span className="text-[#A3AED0] text-xs sm:text-sm font-normal">
                                {formattedDate} {formattedTime}
                            </span>
                        </div>
                    </div>

                    <div className="min-w-[80px] text-left hidden md:block">
                        <span className="text-[#A3AED0] text-sm sm:text-base font-normal capitalize">
                            {item.transaction_type}
                        </span>
                    </div>

                    <div className="min-w-[90px] text-left hidden lg:block">
                        <span className="text-[#8F9BBA] text-sm sm:text-base font-normal">
                            Card ID: {item.card}
                        </span>
                    </div>

                    <div className="min-w-[90px] text-left hidden sm:block">
                        <span className={`text-xs sm:text-sm font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${income ? 'text-[#05CD99] bg-emerald-50' : 'text-[#EE5D50] bg-rose-50'}`}>
                            {income ? 'Income' : 'Expense'}
                        </span>
                    </div>

                    <div className="text-right min-w-[80px] sm:min-w-[90px] ml-auto sm:ml-0">
                        <span className={`text-sm sm:text-base font-semibold ${income ? 'text-[#05CD99]' : 'text-[#EE5D50]'}`}>
                            {income ? '+' : '-'}${Math.abs(item.balance)}
                        </span>
                    </div>
                </div>
            )
        })
    }, [loading, transactions, isIncome])

    return (
        <div className="w-full max-w-[800px] h-auto sm:h-[235px] bg-white rounded-[25px] flex flex-col p-3 sm:p-4 gap-2 shadow-sm border border-slate-100 overflow-y-auto">
            {content}
        </div>
    )
}

export default LastTransaction
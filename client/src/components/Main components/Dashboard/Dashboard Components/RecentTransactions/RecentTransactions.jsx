import { useState, useEffect, useContext } from 'react'
import { Wrench, User, Bell } from 'lucide-react'
import api from '../../../../../api/axios'
import { UserContext } from '../../../../../App'

const RecentTransactions = () => {
    const { currentUser } = useContext(UserContext)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const getTransactions = async () => {
        try {
            const response = await api.get('transactions/')
            const sorted = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            setTransactions(sorted.slice(0, 4))
        } catch (err) {
            console.error("Failed to fetch recent transactions", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    return (
        <div className="flex flex-col gap-[20px]">
            <h1 className="text-[#343C6A] text-[22px] font-[600]">Recent Transaction</h1>
            <div className="w-[350px] bg-white rounded-[25px] py-[25px] px-[20px] flex flex-col gap-[20px] border border-slate-100">
                {loading ? (
                    <p className="text-sm text-[#718EBF] text-center">Loading...</p>
                ) : transactions.length === 0 ? (
                    <p className="text-sm text-[#718EBF] text-center">No recent transactions</p>
                ) : (
                    transactions.map((item) => {
                        const isIncome = (item.transation_result && Number(item.transaction_owner) === Number(currentUser.id) ) || (!item.transation_result === true && Number(item.transaction_owner !== Number(currentUser.id)))
                        const isTransfer = item.transaction_type?.toLowerCase().includes('transfer')
                        const isService = item.transaction_type?.toLowerCase().includes('service')

                        return (
                            <div key={item.id} className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-[50px] h-[50px] rounded-[20px] flex items-center justify-center shrink-0 ${isTransfer ? 'bg-pink-50' : isService ? 'bg-blue-50' : 'bg-teal-50'}`}>
                                        {isTransfer && <User size="22px" color='#FF82AC' />}
                                        {isService && <Wrench size="22px" color='#396AFF' />}
                                        {!isTransfer && !isService && <Bell color='#16DBCC' size="22px" />}
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
                                <div className={`text-sm font-semibold ${isIncome ? 'text-[#05CD99]' : 'text-[#EE5D50]'}`}>
                                    {isIncome ? '+' : '-'}${Math.abs(item.balance)}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default RecentTransactions
import { Wrench, User, Bell } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../../App'
import api from '../../../../api/axios'

const LastTransaction = () => {
    const [transactions, setTransactions] = useState([])
    const { currentUser } = useContext(UserContext)

    const getTransactions = async () => {
        try {
            const response = await api.get('transactions/')
            const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            setTransactions(sortedData.slice(0, 3))
        } catch (err) {
            console.error("Failed to fetch transactions", err)
        }
    }

    useEffect(() => {
        getTransactions()
    }, [])

    console.log(transactions)

    return (
        <div className='w-[800px] h-[235px] bg-white rounded-[25px] flex flex-col p-4 gap-2 shadow-sm border border-slate-100'>
            {transactions?.map((item) => {
                const isIncome = (item.transation_result && Number(item.transaction_owner) === Number(currentUser.id) ) || (!item.transation_result === true && Number(item.transaction_owner !== Number(currentUser.id)))
                const isTransfer = item.transaction_type?.toLowerCase().includes('transfer')
                const isService = item.transaction_type?.toLowerCase().includes('service')

                return (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-1 hover:bg-slate-50/60 rounded-2xl transition-colors duration-150 px-5">
                        <div className="flex items-center gap-4 min-w-[240px]">
                            <div className={`w-[55px] h-[55px] rounded-[20px] flex items-center justify-center shrink-0 ${isTransfer ? 'bg-pink-50' : isService ? 'bg-blue-50' : 'bg-teal-50'}`}>
                                {isTransfer && <User size="25px" color='#FF82AC' />}
                                {isService && <Wrench size="25px" color='#396AFF' />}
                                {!isTransfer && !isService && <Bell color='#16DBCC' size="25px" />}
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[#232323] font-semibold text-base sm:text-lg leading-snug">
                                    {item.description}
                                </span>
                                <span className="text-[#A3AED0] text-sm sm:text-base font-normal">
                                    {new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>

                        <div className="min-w-[100px] text-left">
                            <span className="text-[#A3AED0] text-base sm:text-lg font-normal capitalize">
                                {item.transaction_type}
                            </span>
                        </div>

                        <div className="min-w-[110px] text-left hidden sm:block">
                            <span className="text-[#8F9BBA] text-base sm:text-lg font-normal">
                                Card ID: {item.card}
                            </span>
                        </div>

                        <div className="min-w-[100px] text-left hidden md:block">
                            <span className={`text-base sm:text-lg font-medium px-2.5 py-1 rounded-full text-xs ${isIncome ? 'bg-emerald-50 text-[#05CD99]' : 'bg-rose-50 text-[#EE5D50]'}`}>
                                {isIncome ? 'Income' : 'Expense'}
                            </span>
                        </div>

                        <div className="text-right min-w-[90px]">
                            <span className={`text-base sm:text-lg font-semibold ${isIncome ? 'text-[#05CD99]' : 'text-[#EE5D50]'}`}>
                                {isIncome ? '+' : '-'}${Math.abs(item.balance)}
                            </span>
                        </div>
                    </div>
                )
            })}
            {
                transactions?.length == 0 ? <h2 className='text-[#333B69] text-[16px] font-[600] py-[15px]'>No transactions</h2> : null
            }
        </div>
    )
}

export default LastTransaction
import { useState, useEffect, useCallback, useMemo } from "react"
import CreditCardManagement from "./Transactions Components/CreditCardManagement"
import TransactionsInfo from "./Transactions Components/Transactions Info/TransactionsInfo"
import api from "../../../api/axios"

const TransactionsMain = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTransactions = useCallback(async () => {
        try {
            const { data } = await api.get('transactions/')
            setTransactions(data)
        } catch (err) {
            console.error("Failed to fetch transactions", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    const transactionsContent = useMemo(() => {
        if (loading) {
            return (
                <div className="w-full py-12 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm text-sm text-[#718EBF] font-medium">
                    Loading transactions...
                </div>
            )
        }

        return <TransactionsInfo transactionsInfo={transactions} />
    }, [loading, transactions])

    return (
        <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
            <section className="w-full">
                <CreditCardManagement />
            </section>
            
            <section className="w-full">
                <h2 className="text-[22px] font-semibold text-[#343C6A] pb-[20px]">Recent Transactions</h2>
                {transactionsContent}
            </section>
        </div>
    )
}

export default TransactionsMain
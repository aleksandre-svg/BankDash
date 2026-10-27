import CreditCardManagement from "./Transactions Components/CreditCardManagement"
import TransactionsInfo from "./Transactions Components/Transactions Info/TransactionsInfo"
import api from "../../../api/axios"
import { useState, useEffect, use } from "react"

const expenseData = [
    { month: "Aug", expense: 9000 },
    { month: "Sep", expense: 14000 },
    { month: "Oct", expense: 9500 },
    { month: "Nov", expense: 4500 },
    { month: "Dec", expense: 12500 },
    { month: "Jan", expense: 8500 },
];

const TransactionsMain = () => {
    const [transactions, setTransactions] = useState([])

    const getTransactions = async () => {
        const response = await api.get('transactions/')
        setTransactions(response.data)
    }

    useEffect(() => {
        getTransactions()
    }, [])

    console.log(transactions)

    return (
        <>
            <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
                <div className="flex gap-[30px] w-full">
                    <CreditCardManagement/>
                </div>
                <div>
                    <h2 className="text-[22px] font-[600] text-[#343C6A] pb-[20px]">Recent Transactions</h2>
                    <TransactionsInfo transactionsInfo={transactions}/>
                </div>
            </div>
        </>
    )
}

export default TransactionsMain
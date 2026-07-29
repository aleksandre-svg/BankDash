import Transaction from "./Transaction"
const RecentTransactions = () => {
    return (
        <div className="flex flex-col gap-[20px]">
            <h1 className="text-[#343C6A] text-[22px] font-[600]">Recent Transaction</h1>
            <div className="w-[350px] bg-white rounded-[25px] py-[25px] flex flex-col gap-[20px]">
                <Transaction transactionType='debit/transfer' transactionDate='28 January 2021' transactionAmount={-850}/>
                <Transaction transactionType='deposit/transfer' transactionDate='28 January 2021' transactionAmount={850}/>
                <Transaction transactionType='debit/card' transactionDate='28 January 2021' transactionAmount={-850}/>
            </div>
        </div>
    )
}

export default RecentTransactions
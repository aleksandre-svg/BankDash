import CreditCardManagement from "./Transactions Components/CreditCardManagement"
import Expense from "./Transactions Components/Expense"

const expenseData = [
    { month: "Aug", expense: 9000 },
    { month: "Sep", expense: 14000 },
    { month: "Oct", expense: 9500 },
    { month: "Nov", expense: 4500 },
    { month: "Dec", expense: 12500 },
    { month: "Jan", expense: 8500 },
];

const TransactionsMain = () => {
    return (
        <>
            <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
                <div className="flex gap-[30px]">
                    <div className="w-full">
                        <CreditCardManagement/>
                    </div>

                    <div className="w-full flex flex-col gap-[15px]">
                        <Expense expenseData={expenseData}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionsMain
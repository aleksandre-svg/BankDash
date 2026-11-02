import BalanceOverview from "./Accounts Components/BalanceOverview"
import LastTransaction from "./Accounts Components/LastTransaction"
import ExpenseOverview from "./Accounts Components/ExpenseOverview"
import CreditCardManagement from "../Transactions/Transactions Components/CreditCardManagement"

const AccountsMain = () => {
    return (
        <div className="p-[20px] min-h-screen flex flex-col gap-[20px]">
            <section className="w-full">
                <BalanceOverview />
            </section>
            
            <section className="flex flex-col xl:flex-row items-start justify-between gap-[20px] w-full">
                <div className="w-full">
                    <h2 className="text-[#333B69] text-[22px] font-semibold py-[10px]">Last Transaction</h2>
                    <LastTransaction />
                </div>
                <div className="w-full">
                    <CreditCardManagement />
                </div>
            </section>

            <section className="w-full">
                <div>
                    <h2 className="text-[#333B69] text-[22px] font-semibold py-[15px]">Expense & Income Overview</h2>
                    <ExpenseOverview />
                </div>
            </section>
        </div>
    )
}

export default AccountsMain
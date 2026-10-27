import BalanceOverview from "./Accounts Components/BalanceOverview"
import LastTransaction from "./Accounts Components/LastTransaction"
import ExpenseOverview from "./Accounts Components/ExpenseOverview"
import CreditCardManagment from "../Transactions/Transactions Components/CreditCardManagement"

const AccountsMain = () => {
    return (
        <div className="p-[20px] min-h-screen">
            <BalanceOverview/>
            <section className="flex items-center justify-between gap-[15px]">
                <div className="w-full">
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[10px]'>Last Transaction</h2>
                    <LastTransaction/>
                </div>
                <div className="w-full">
                    <CreditCardManagment/>
                </div>
            </section>
            <section>
                <div>
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Expense & Income Overview</h2>
                    <ExpenseOverview/>
                </div>
            </section>
        </div>
    )
}

export default AccountsMain
import BalanceOverview from "./Accounts Components/BalanceOverview"
import LastTransaction from "./Accounts Components/LastTransaction"
import CreditCard from "../Dashboard/Dashboard Components/CreditCards/CreditCard"
import ExpenseOverview from "./Accounts Components/ExpenseOverview"

const AccountsMain = () => {
    return (
        <div className="p-[20px] min-h-screen">
            <BalanceOverview/>
            <section className="flex items-center justify-between">
                <div>
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Last Transaction</h2>
                    <LastTransaction/>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>My Card</h2>
                        <h3 className='text-[#333B69] text-[18px] font-[600] py-[15px]'>See All</h3>
                    </div>
                    <div className="flex gap-[30px]">
                        <CreditCard 
                            creditCardColor="#2D60FF"
                            creditCardBalance={12650}
                            creditCardHolder="Aleksandre Dzukaevi"
                            creditCardValidDate="03/30"
                            creditCardPAN={6011456789012345}
                            lightMode={false}
                        />
                        <CreditCard 
                            creditCardColor="#FCAA0B"
                            creditCardBalance={947}
                            creditCardHolder="Aleksandre Dzukaevi"
                            creditCardValidDate="09/29"
                            creditCardPAN={4111222233334444}
                            lightMode={false}
                        />
                    </div>
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
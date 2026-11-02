import CreditCardManagement from "./Dashboard Components/CreditCards/CreditCardManagement"
import BalanceHistory from "./Dashboard Components/BalanceHistory"
import RecentTransactions from "./Dashboard Components/RecentTransactions/RecentTransactions"
import WeeklyActivity from "./Dashboard Components/WeeklyActivity"

const DashboardMain = () => {
    return (
        <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
            <section className="flex w-full">
                <CreditCardManagement />
            </section>
            
            <section className="flex flex-col xl:flex-row w-full items-start justify-between gap-[45px]">
                <RecentTransactions />
                <WeeklyActivity />
            </section>

            <section>
                <BalanceHistory />
            </section>
        </div>
    )
}

export default DashboardMain
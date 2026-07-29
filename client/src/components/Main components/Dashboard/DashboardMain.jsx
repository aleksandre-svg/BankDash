import CreditCardManagement from "./Dashboard Components/CreditCards/CreditCardManagement"
import BalanceHistory from "./Dashboard Components/BalanceHistory"
import RecentTransactions from "./Dashboard Components/RecentTransactions/RecentTransactions"
import WeeklyActivity from "./Dashboard Components/WeeklyActivity"

const weeklyData = [
    { day: "Sat", deposit: 250, withdraw: 480 },
    { day: "Sun", deposit: 130, withdraw: 350 },
    { day: "Mon", deposit: 270, withdraw: 330 },
    { day: "Tue", deposit: 370, withdraw: 480 },
    { day: "Wed", deposit: 250, withdraw: 160 },
    { day: "Thu", deposit: 250, withdraw: 390 },
    { day: "Fri", deposit: 340, withdraw: 390 },
];

const balanceData = [
    { month: "Jul", balance: 120 },
    { month: "Aug", balance: 320 },
    { month: "Sep", balance: 470 },
    { month: "Oct", balance: 780 },
    { month: "Nov", balance: 220 },
    { month: "Dec", balance: 570 },
    { month: "Jan", balance: 250 },
    { month: "Feb", balance: 640 },
];

const DashboardMain = () => {
    return (
        <>
            <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
                <div className="flex w-full ">
                    <CreditCardManagement/>
                </div>
                
                <div className="flex w-full items-start justify-between gap-[45px]">
                    <RecentTransactions/>
                    <WeeklyActivity weeklyActivityData={weeklyData}/>
                </div>

                <div>
                    <BalanceHistory BalanceHistoryData={balanceData}/>
                </div>
            </div>
        </>
    )
}

export default DashboardMain
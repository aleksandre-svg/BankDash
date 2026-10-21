import { Wrench, User, Bell } from 'lucide-react';

const transactions = [
    {
        id: 1,
        title: 'Spotify Subscription',
        date: '25 Jan 2021',
        category: 'Shopping',
        card: '1234 ****',
        status: 'Pending',
        amount: '-$150',
        type: 'expense',
        bgColor: 'bg-[#E7FAF6]',
        iconColor: 'text-[#10B981]',
        iconType: 'shopping'
    },
    {
        id: 2,
        title: 'Mobile Service',
        date: '25 Jan 2021',
        category: 'Service',
        card: '1234 ****',
        status: 'Completed',
        amount: '-$340',
        type: 'expense',
        bgColor: 'bg-[#EBF1FF]',
        iconColor: 'text-[#4F46E5]',
        iconType: 'service'
    },
    {
        id: 3,
        title: 'Emilly Wilson',
        date: '25 Jan 2021',
        category: 'Transfer',
        card: '1234 ****',
        status: 'Completed',
        amount: '+$780',
        type: 'income',
        bgColor: 'bg-[#FFEBF0]',
        iconColor: 'text-[#EC4899]',
        iconType: 'transfer'
    }
];


const LastTransaction = () => {
    return (
        <div className='w-[800px] h-[235px] bg-white rounded-[25px] flex flex-col justify-evenly'>
            {transactions.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-1 hover:bg-slate-50/60 rounded-2xl transition-colors duration-150 px-5">
                    <div className="flex items-center gap-4 min-w-[240px]">
                        <div className={`w-[55px] h-[55px] rounded-[20px] flex items-center justify-center shrink-0 ${item.bgColor}`}>
                            {item.iconType === 'shopping' && (
                                <div className="relative flex items-center justify-center">
                                    <Bell color='#16DBCC' size={"25px"}/>
                                </div>
                            )}

                            {item.iconType === 'service' && (
                                <Wrench size={"25px"} color='#396AFF'/>
                            )}

                            {item.iconType === 'transfer' && (
                                <User size="25px" color='#FF82AC' />
                            )}
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[#232323] font-semibold text-base sm:text-lg leading-snug">
                                {item.title}
                            </span>
                            <span className="text-[#A3AED0] text-sm sm:text-base font-normal">
                                {item.date}
                            </span>
                        </div>
                    </div>

                    <div className="min-w-[100px] text-left">
                        <span className="text-[#A3AED0] text-base sm:text-lg font-normal">
                            {item.category}
                        </span>
                    </div>

                    <div className="min-w-[110px] text-left hidden sm:block">
                        <span className="text-[#8F9BBA] text-base sm:text-lg font-normal">
                            {item.card}
                        </span>
                    </div>

                    <div className="min-w-[100px] text-left hidden md:block">
                        <span className="text-[#8F9BBA] text-base sm:text-lg font-normal">
                            {item.status}
                        </span>
                    </div>

                    <div className="text-right min-w-[90px]">
                        <span className={`text-base sm:text-lg font-semibold ${
                            item.type === 'income' ? 'text-[#05CD99]' : 'text-[#EE5D50]'
                        }`}>
                            {item.amount}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LastTransaction
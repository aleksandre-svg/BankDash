import { Wallet, HandCoins, BanknoteArrowDown, Coins } from 'lucide-react'

const BalanceOverview = () => {
    return (
        <div className='flex items-center w-full justify-between'>
            <div className="w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[25px]">
                <div className='bg-[#FFF5D9] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <Wallet color='#FFBB38' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>My Balance</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>12,750</span></h3>
                </div>
            </div>

            <div className="w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[25px]">
                <div className='bg-[#E7EDFF] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <HandCoins color='#396AFF' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Income</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>5,600</span></h3>
                </div>
            </div>

            <div className="w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[25px]">
                <div className='bg-[#FFE0EB] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <BanknoteArrowDown color='#FF82AC' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Expense</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>3,460</span></h3>
                </div>
            </div>
            
            <div className="w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[25px]">
                <div className='bg-[#DCFAF8] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <Coins color='#16DBCC' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Total Debt</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>3,460</span></h3>
                </div>
            </div>
        </div>
    )
}

export default BalanceOverview
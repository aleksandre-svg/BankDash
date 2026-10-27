import { Wallet, HandCoins, BanknoteArrowDown, Coins } from 'lucide-react'
import { useState, useEffect, useContext } from 'react'
import api from '../../../../api/axios'
import { UserContext } from '../../../../App'

const BalanceOverview = () => {
    const { currentUser } = useContext(UserContext)
    const [cards, setCards] = useState([])
    const [transactions, setTransactions] = useState([])

    const getCards = async () => {
        const response = await api.get('cards/')
        setCards(response.data)
    }
    const getTransactions = async () => {
        const response = await api.get('transactions/')
        setTransactions(response.data)
    }

    useEffect(() => {
        getCards()
        getTransactions()
    }, [])

    const totalBalance = cards?.map(c => Number(c.balance))?.reduce((a, b) => a + b, 0)
    const totalIncome = transactions?.filter(tx => (tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id))))?.map(tx => Number(tx.balance))?.reduce((a, b) => a + b, 0)
    const totalExpense = transactions?.filter(tx => !((tx.transation_result && Number(tx.transaction_owner) === Number(currentUser.id) ) || (!tx.transation_result === true && Number(tx.transaction_owner !== Number(currentUser.id)))))?.map(tx => Number(tx.balance))?.reduce((a, b) => a + b, 0)

    console.log()

    return (
        <div className='flex items-center w-full justify-between'>
            <div className="min-w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px]">
                <div className='bg-[#FFF5D9] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <Wallet color='#FFBB38' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>My Balance</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>{totalBalance}</span></h3>
                </div>
            </div>

            <div className="min-w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px]">
                <div className='bg-[#E7EDFF] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <HandCoins color='#396AFF' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Income</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>{totalIncome}</span></h3>
                </div>
            </div>

            <div className="min-w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px]">
                <div className='bg-[#FFE0EB] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <BanknoteArrowDown color='#FF82AC' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Expense</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>{totalExpense}</span></h3>
                </div>
            </div>
            
            <div className="min-w-[215px] h-[120px] rounded-[25px] bg-white flex items-center justify-center gap-[20px] px-[10px]">
                <div className='bg-[#DCFAF8] w-[70px] h-[70px] rounded-full flex items-center justify-center'>
                    <Coins color='#16DBCC' size={"30px"}/>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-[#718EBF] text-[16px] font-[500]'>Total Debt</h2>
                    <h3 className='text-[#232323] text-[25px] font-[700]'>$<span>{totalBalance < 0 ? totalBalance : 0}</span></h3>
                </div>
            </div>
        </div>
    )
}

export default BalanceOverview
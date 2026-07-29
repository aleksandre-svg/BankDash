import { CreditCard, BanknoteArrowDown, Coins, Move3d } from 'lucide-react'

const Transaction = ({transactionType, transactionDate, transactionAmount}) => {
    const transactionTypes = [
        {
            type : 'deposit/card',
            text : 'Deposit from my Card',
            icon : CreditCard,
            bgColor : '#DCFAF8',
            iconColor : '#16DBCC'
        },
        {
            type : 'deposit/transfer',
            text : 'Deposit Account',
            icon : Coins,
            bgColor : '#E7EDFF',
            iconColor : '#396AFF'
        },
        {
            type : 'debit/card',
            text : 'Debit to my Card',
            icon : BanknoteArrowDown,
            bgColor : '#FFF5D9',
            iconColor : '#FFBB38'
        },
        {
            type : 'debit/transfer',
            text : 'Debit to another Account',
            icon : Move3d,
            bgColor : '#FFE0EB',
            iconColor : '#FF82AC'
        }
    ]

    const choosedTransaction = transactionTypes.find(item => item.type == transactionType)

    return (
        <>
            <div className='flex justify-between px-[20px] items-center'>
                <div className='flex items-center gap-[10px]'>
                    <div className='w-[55px] h-[55px] rounded-full flex items-center justify-center' style={{
                        backgroundColor: choosedTransaction.bgColor
                    }}>
                        <choosedTransaction.icon color={choosedTransaction.iconColor}/>
                    </div>
                    <div className='flex flex-col justify-between items-start'>
                        <h2 className='font-[500] text-[16px] text-[#232323]'>{choosedTransaction.text}</h2>
                        <h3 className='font-[400] text-[15px] text-[#718EBF]'>{transactionDate}</h3>
                    </div>
                </div>
                <div className={`flex justify-center items-center ${transactionAmount > 0 ? 'text-[#41D4A8]' : 'text-[#FF4B4A]'}`}>
                    <h3 className='font-[500]'>{transactionAmount > 0 ? '+' : '-'}${transactionAmount > 0 ? transactionAmount : String(transactionAmount).slice(1)}</h3>
                </div>
            </div>
        </>
    )
}

export default Transaction
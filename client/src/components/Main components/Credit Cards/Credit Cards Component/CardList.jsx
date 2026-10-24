import { CreditCard } from 'lucide-react';

const cards = [
  {
    id: 1,
    type: 'Secondary',
    bank: 'DBL Bank',
    cardNumber: '**** **** 5600',
    nameOnCard: 'William',
    bgColor: 'bg-[#E8EEFF]',
    iconColor: 'text-[#2563EB]',
    badgeBg: 'bg-[#2563EB]',
  },
  {
    id: 2,
    type: 'Secondary',
    bank: 'BRC Bank',
    cardNumber: '**** **** 4300',
    nameOnCard: 'Michel',
    bgColor: 'bg-[#FFE8EE]',
    iconColor: 'text-[#E11D48]',
    badgeBg: 'bg-[#E11D48]',
  },
  {
    id: 3,
    type: 'Secondary',
    bank: 'ABM Bank',
    cardNumber: '**** **** 7560',
    nameOnCard: 'Edward',
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]',
    badgeBg: 'bg-[#D97706]',
  },
  {
    id: 3,
    type: 'Secondary',
    bank: 'ABM Bank',
    cardNumber: '**** **** 7560',
    nameOnCard: 'Edward',
    bgColor: 'bg-[#FEF3C7]',
    iconColor: 'text-[#D97706]',
    badgeBg: 'bg-[#D97706]',
  },
];

const CardList = () => {
    return (
        <div className="w-full max-w-4xl font-sans">
            <div className="flex flex-col gap-3">
                {cards.map((card) => (
                    <div key={'card-'+card.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 border border-slate-100">
                        <div className="flex items-center gap-4 min-w-[150px]">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${card.bgColor}`}>
                                <div className="relative flex items-center justify-center">
                                <CreditCard className={`w-6 h-6 sm:w-7 sm:h-7 ${card.iconColor}`} />
                                    <span className={`absolute -bottom-1 -right-1 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center text-white ${card.badgeBg}`}>
                                        $
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                    Card Type
                                </span>
                                <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal mt-0.5">
                                    {card.type}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col min-w-[90px]">
                            <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                Bank
                            </span>
                            <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal mt-0.5">
                                {card.bank}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[130px]">
                            <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                Card Number
                            </span>
                            <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal tracking-wide mt-0.5">
                                {card.cardNumber}
                            </span>
                        </div>

                        <div className="flex flex-col min-w-[100px]">
                            <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                Namain Card
                            </span>
                            <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal mt-0.5">
                                {card.nameOnCard}
                            </span>
                        </div>

                        <div className="flex items-center justify-end">
                            <button type="button" className="text-[#2563EB] font-medium text-sm sm:text-base hover:text-blue-700 hover:underline transition-all">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardList
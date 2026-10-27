import { CreditCard } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/axios'

const CardList = () => {
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const getCards = async () => {
        try {
            const response = await api.get('cards/')
            setCards(response.data)
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Failed to load cards"))
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCards()
    }, [])

    if (loading) {
        return <div className="p-4 text-[#718EBF] text-sm">Loading cards...</div>
    }

    if (error) {
        return <div className="p-4 text-red-600 text-sm">{error}</div>
    }

    return (
        <div className="w-full max-w-4xl font-sans">
            <div className="flex flex-col gap-3">
                {cards.map((card, index) => {
                    const colors = [
                        { bg: 'bg-[#E8EEFF]', icon: 'text-[#2563EB]', badge: 'bg-[#2563EB]' },
                        { bg: 'bg-[#FFE8EE]', icon: 'text-[#E11D48]', badge: 'bg-[#E11D48]' },
                        { bg: 'bg-[#FEF3C7]', icon: 'text-[#D97706]', badge: 'bg-[#D97706]' }
                    ]
                    const theme = colors[index % colors.length]
                    const maskedNum = card.card_number ? `**** **** ${card.card_number.slice(-4)}` : '**** **** ****'

                    return (
                        <div key={card.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 border border-slate-100">
                            <div className="flex items-center gap-4 min-w-[150px]">
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${theme.bg}`}>
                                    <div className="relative flex items-center justify-center">
                                        <CreditCard className={`w-6 h-6 sm:w-7 sm:h-7 ${theme.icon}`} />
                                        <span className={`absolute -bottom-1 -right-1 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center text-white ${theme.badge}`}>
                                            $
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                        Card Type
                                    </span>
                                    <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal mt-0.5">
                                        {card.card_type || 'Debit'}
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
                                    {maskedNum}
                                </span>
                            </div>

                            <div className="flex flex-col min-w-[100px]">
                                <span className="text-[#232323] font-medium text-sm sm:text-base leading-tight">
                                    Balance
                                </span>
                                <span className="text-[#8BA3CB] text-xs sm:text-sm font-normal mt-0.5">
                                    ${card.balance}
                                </span>
                            </div>

                            <div className="flex items-center justify-end">
                                <button type="button" onClick={() => navigate(`/credit-cards/${card.id}`)} className="text-[#2563EB] font-medium text-sm sm:text-base hover:text-blue-700 hover:underline transition-all">
                                    View Details
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CardList
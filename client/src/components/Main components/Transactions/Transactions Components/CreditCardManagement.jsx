import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../../App"
import CreditCard from "../../Dashboard/Dashboard Components/CreditCards/CreditCard"
import api from "../../../../api/axios"

const CreditCardManagement = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchCards = useCallback(async () => {
        try {
            const { data } = await api.get('cards/')
            setCards(data)
        } catch (err) {
            console.error("Failed to fetch user cards", err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCards()
    }, [fetchCards])

    const fullName = useMemo(() => {
        return currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() : ''
    }, [currentUser])

    const handleAddCardClick = useCallback(() => {
        navigate('/credit-cards')
    }, [navigate])

    const cardsContent = useMemo(() => {
        if (loading) {
            return (
                <div className="w-full h-[235px] flex items-center justify-center bg-white rounded-[25px] border border-slate-100 shadow-sm text-sm text-[#718EBF] font-medium">
                    Loading cards...
                </div>
            )
        }

        if (cards.length === 0) {
            return (
                <div className="w-full h-[235px] flex flex-col items-center justify-center bg-white rounded-[25px] border border-slate-100 shadow-sm text-sm text-[#718EBF] font-medium gap-2">
                    <p>No cards available.</p>
                    <button 
                        type="button"
                        onClick={handleAddCardClick}
                        className="text-[#1814F3] hover:underline cursor-pointer"
                    >
                        Add your first card
                    </button>
                </div>
            )
        }

        return cards.slice(0, 2).map((card) => (
            <div key={card.id} className="w-full">
                <CreditCard 
                    creditCardBalance={card.balance}
                    creditCardHolder={fullName}
                    creditCardValidDate={card.valid_date}
                    creditCardPAN={card.card_number}
                    creditCardbank={card.bank}
                    creditCardID={card.id}
                />
            </div>
        ))
    }, [loading, cards, fullName, handleAddCardClick])

    return (
        <section className="flex flex-col gap-[15px] w-full">
            <div className="flex items-center w-full justify-between">
                <h3 className="font-semibold text-[22px] text-[#343C6A]">My Cards</h3>
                <button 
                    type="button" 
                    onClick={handleAddCardClick}
                    className="font-semibold text-[17px] text-[#343C6A] hover:text-[#1814F3] transition-colors cursor-pointer"
                >
                    + Add Card
                </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-[20px]">
                {cardsContent}
            </div>
        </section>
    )
}

export default CreditCardManagement
import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../../../App.jsx"
import CreditCard from "./CreditCard"
import api from "../../../../../api/axios.js"

const CreditCardManagement = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [cards, setCards] = useState([])

    const fetchCards = useCallback(async () => {
        try {
            const { data } = await api.get('cards/')
            setCards(data)
        } catch (err) {
            console.error("Failed to fetch user cards", err)
        }
    }, [])

    useEffect(() => {
        fetchCards()
    }, [fetchCards])

    const fullName = useMemo(() => {
        return currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() : ''
    }, [currentUser])

    return (
        <section className="flex flex-col gap-[15px] w-full">
            <div className="flex items-center w-full justify-between">
                <h3 className="font-semibold text-[22px] text-[#343C6A]">My Cards</h3>
                <button 
                    type="button" 
                    onClick={() => navigate('/credit-cards')}
                    className="font-semibold text-[17px] text-[#343C6A] hover:text-[#1814F3] transition-colors cursor-pointer"
                >
                    See All
                </button>
            </div>
            
            {/* Mobile: horizontal scroll with snap/flex. PC (sm+): grid layout showing all cards */}
            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 scrollbar-none">
                {cards.map((card) => (
                    <div key={card.id} className="min-w-[300px] sm:min-w-0 shrink-0 sm:shrink">
                        <CreditCard 
                            creditCardBalance={card.balance}
                            creditCardHolder={fullName}
                            creditCardValidDate={card.valid_date}
                            creditCardPAN={card.card_number}
                            creditCardbank={card.bank}
                            creditCardID={card.id}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CreditCardManagement
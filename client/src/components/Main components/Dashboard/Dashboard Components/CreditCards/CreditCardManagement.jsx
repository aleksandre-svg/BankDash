import CreditCard from "./CreditCard"
import api from "../../../../../api/axios.js"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../../../../../App.jsx"
import { useNavigate } from "react-router-dom"

const CreditCardManagement = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [cards, setCards] = useState([])

    const getCurrentUserCards = async () => {
        const response = await api.get('cards/')
        setCards(response.data)
    }

    useEffect(() => {
        getCurrentUserCards()
    }, [])

    return (
        <section className=" flex flex-col gap-[15px] w-full">
            <div className="flex items-center w-full justify-between">
                <h3 className="font-[600] text-[22px] text-[#343C6A]">My Cards</h3>
                <h4 className="font-[600] text-[17px] text-[#343C6A] cursor-pointer" onClick={() => navigate('/credit-cards')}>See All</h4>
            </div>
            <div className="flex gap-[15px] w-full">
                {
                    cards.map((card, card_index) => {
                        return <CreditCard 
                            creditCardBalance={card.balance}
                            creditCardHolder={currentUser?.first_name + ' ' + currentUser?.last_name}
                            creditCardValidDate={card.valid_date}
                            creditCardPAN={card.card_number}
                            creditCardbank={card.bank}
                            creditCardID={card.id}
                            key={card_index}
                            
                        />
                    })
                }
            </div>
        </section>
    )
}

export default CreditCardManagement
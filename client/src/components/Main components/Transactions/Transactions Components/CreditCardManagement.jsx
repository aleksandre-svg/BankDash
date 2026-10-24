import CreditCard from "../../Dashboard/Dashboard Components/CreditCards/CreditCard"
import api from "../../../../api/axios"
import { useState, useEffect } from "react"
import { UserContext } from "../../../../App"
import { useContext } from "react"

const CreditCardManagment = () => {
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
                <h4 className="font-[600] text-[17px] text-[#343C6A] cursor-pointer">+ Add Card</h4>
            </div>
            <div className="flex justify-between w-full gap-[15px]">
                {
                    cards.slice(0, 2).map((card, card_index) => {
                        return <CreditCard 
                            creditCardBalance={card.balance}
                            creditCardHolder={currentUser.first_name + ' ' + currentUser.last_name}
                            creditCardValidDate={card.valid_date}
                            creditCardPAN={card.card_number}
                            creditCardbank={card.bank}
                            key={card_index}
                        />
                    })
                }

                
            </div>
        </section>
    )
}

export default CreditCardManagment
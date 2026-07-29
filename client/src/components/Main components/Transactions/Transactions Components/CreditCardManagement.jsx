import CreditCard from "../../Dashboard/Dashboard Components/CreditCards/CreditCard"

const CreditCardManagment = () => {
    return (
        <section className=" flex flex-col gap-[15px] w-full">
            <div className="flex items-center w-full justify-between">
                <h3 className="font-[600] text-[22px] text-[#343C6A]">My Cards</h3>
                <h4 className="font-[600] text-[17px] text-[#343C6A] cursor-pointer">+ Add Card</h4>
            </div>
            <div className="flex justify-between w-full">
                <CreditCard 
                    creditCardColor="#4C49ED"
                    creditCardBalance={8245}
                    creditCardHolder="Aleksandre Dzukaevi"
                    creditCardValidDate="08/28"
                    creditCardPAN={4532123412345678}
                />

                <CreditCard 
                    creditCardColor="white"
                    creditCardBalance={3190}
                    creditCardHolder="Aleksandre Dzukaevi"
                    creditCardValidDate="11/27"
                    creditCardPAN={5214567890123456}
                    lightMode={true}
                />

                
            </div>
        </section>
    )
}

export default CreditCardManagment
import CreditCardManagement from "../Dashboard/Dashboard Components/CreditCards/CreditCardManagement"
import CardList from "./Credit Cards Component/CardList"
import CardSetting from "./Credit Cards Component/CardSetting"
import AddCardForm from "./Credit Cards Component/AddCardForm"

const CreditCardsMain = () => {
    return (
        <div className="px-[30px] py-[15px] w-full flex flex-col gap-[20px]">
            <section className="w-full">
                <CreditCardManagement />
            </section>
            
            <section className="flex flex-col xl:flex-row justify-between gap-[20px] w-full">
                <div className="w-full">
                    <h2 className="text-[#333B69] text-[22px] font-semibold py-[15px]">Card List</h2>
                    <CardList />
                </div>
                <div className="w-full">
                    <h2 className="text-[#333B69] text-[22px] font-semibold py-[15px]">Card Setting</h2>
                    <CardSetting />
                </div>
            </section>

            <section className="w-full">
                <h2 className="text-[#333B69] text-[22px] font-semibold py-[15px]">Add New Card</h2>
                <AddCardForm />
            </section>
        </div>
    )
}

export default CreditCardsMain
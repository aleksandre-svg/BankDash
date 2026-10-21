import CreditCardManagement from "../Dashboard/Dashboard Components/CreditCards/CreditCardManagement"
import ExpenseStatistics from "./Credit Cards Component/ExpenseStatistics"
import CardList from "./Credit Cards Component/CardList"
import CardSetting from "./Credit Cards Component/CardSetting"
import AddCardForm from "./Credit Cards Component/AddCardForm"

const CreditCardsMain = () => {
    return (
        <div className="px-[30px] py-[15px]">
            <section>
                <CreditCardManagement/>
            </section>
            <section className="flex justify-between gap-[20px]">
                <div>
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Card Expense Statistics</h2>
                    <ExpenseStatistics/>
                </div>
                <div>
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Card List</h2>
                    <CardList/>
                </div>
                <div>
                    <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Card Setting</h2>
                    <CardSetting/>
                </div>
            </section>
            <section>
                <h2 className='text-[#333B69] text-[22px] font-[600] py-[15px]'>Card Setting</h2>
                <AddCardForm/>
            </section>
        </div>
    )
}

export default CreditCardsMain
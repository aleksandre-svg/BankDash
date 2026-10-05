import CreditCardManagement from "./Transactions Components/CreditCardManagement"
import Expense from "./Transactions Components/Expense"
import TransactionsInfo from "./Transactions Components/Transactions Info/TransactionsInfo"

const expenseData = [
    { month: "Aug", expense: 9000 },
    { month: "Sep", expense: 14000 },
    { month: "Oct", expense: 9500 },
    { month: "Nov", expense: 4500 },
    { month: "Dec", expense: 12500 },
    { month: "Jan", expense: 8500 },
];

const transactions = [
    { id: '#12548796', description: 'Spotify Subscription', type: 'Shopping', card: '1234 ****', date: '28 Jan, 12.30 AM', amount: '-$2,500', isExpense: true },
    { id: '#12548796', description: 'Freepik Sales', type: 'Transfer', card: '1234 ****', date: '25 Jan, 10.40 PM', amount: '+$750', isExpense: false },
    { id: '#12548796', description: 'Mobile Service', type: 'Service', card: '1234 ****', date: '20 Jan, 10.40 PM', amount: '-$150', isExpense: true },
    { id: '#12548796', description: 'Wilson', type: 'Transfer', card: '1234 ****', date: '15 Jan, 03.29 PM', amount: '-$1050', isExpense: true },
    { id: '#12548796', description: 'Emilly', type: 'Transfer', card: '1234 ****', date: '14 Jan, 10.40 PM', amount: '+$840', isExpense: false },
    { id: '#12548797', description: 'Apple Store', type: 'Shopping', card: '1234 ****', date: '12 Jan, 04.15 PM', amount: '-$1,200', isExpense: true },
    { id: '#12548798', description: 'Upwork Payout', type: 'Transfer', card: '1234 ****', date: '10 Jan, 02.20 PM', amount: '+$1,500', isExpense: false },
    { id: '#12548799', description: 'Netflix Membership', type: 'Entertainment', card: '1234 ****', date: '08 Jan, 09.00 AM', amount: '-$20', isExpense: true },
    { id: '#12548800', description: 'Amazon Purchase', type: 'Shopping', card: '1234 ****', date: '07 Jan, 06.45 PM', amount: '-$340', isExpense: true },
    { id: '#12548801', description: 'Client Invoice', type: 'Transfer', card: '1234 ****', date: '05 Jan, 11.10 AM', amount: '+$2,100', isExpense: false },
    { id: '#12548802', description: 'Uber Ride', type: 'Service', card: '1234 ****', date: '04 Jan, 08.30 PM', amount: '-$45', isExpense: true },
    { id: '#12548803', description: 'Gym Membership', type: 'Service', card: '1234 ****', date: '02 Jan, 07.00 AM', amount: '-$60', isExpense: true },
    { id: '#12548804', description: 'Stripe Payment', type: 'Transfer', card: '1234 ****', date: '01 Jan, 01.15 PM', amount: '+$980', isExpense: false },
    { id: '#12548805', description: 'Steam Store', type: 'Entertainment', card: '1234 ****', date: '30 Dec, 10.00 PM', amount: '-$70', isExpense: true },
    { id: '#12548806', description: 'Groceries Store', type: 'Shopping', card: '1234 ****', date: '28 Dec, 05.20 PM', amount: '-$210', isExpense: true },
    { id: '#12548807', description: 'Salary Deposit', type: 'Transfer', card: '1234 ****', date: '25 Dec, 09.00 AM', amount: '+$4,500', isExpense: false },
    { id: '#12548808', description: 'Coffee Shop', type: 'Shopping', card: '1234 ****', date: '24 Dec, 11.45 AM', amount: '-$12', isExpense: true },
    { id: '#12548809', description: 'Fiverr Refund', type: 'Transfer', card: '1234 ****', date: '22 Dec, 03.10 PM', amount: '+$120', isExpense: false },
    { id: '#12548810', description: 'Electric Bill', type: 'Service', card: '1234 ****', date: '20 Dec, 02.00 PM', amount: '-$130', isExpense: true },
    { id: '#12548811', description: 'GitHub Sponsor', type: 'Transfer', card: '1234 ****', date: '18 Dec, 12.00 PM', amount: '+$50', isExpense: false }
]

const TransactionsMain = () => {
    return (
        <>
            <div className="px-[30px] py-[25px] w-full flex flex-col gap-[20px]">
                <div className="flex gap-[30px]">
                    <div className="w-full">
                        <CreditCardManagement/>
                    </div>

                    <div className="w-full flex flex-col gap-[15px]">
                        <Expense expenseData={expenseData}/>
                    </div>
                </div>
                <div>
                    <h2 className="text-[22px] font-[600] text-[#343C6A] pb-[20px]">Recent Transactions</h2>
                    <TransactionsInfo transactionsInfo={transactions}/>
                </div>
            </div>
        </>
    )
}

export default TransactionsMain
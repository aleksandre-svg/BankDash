import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
    House, 
    ArrowLeftRight, 
    UserRound,  
    ChartColumn, 
    CreditCard, 
    HandCoins, 
    Wrench, 
    BadgePercent, 
    Settings } from 'lucide-react'
import BankDashLogo from '../../assets/images/BankDashLogo.png'
import ActivePageIcon from '../../assets/images/active_page.png'

const NavBar = () => {
    const location = useLocation()


    const [path, setPath] = useState(location.pathname)


    const pages = [
        {
            icon: House,
            title: "Dashboard",
            route: "/",
        },
        {
            icon: ArrowLeftRight,
            title: "Transactions",
            route: "/transactions",
        },
        {
            icon: UserRound,
            title: "Accounts",
            route: "/accounts",
        },
        {
            icon: ChartColumn,
            title: "Investments",
            route: "/investments",
        },
        {
            icon: CreditCard,
            title: "Credit Cards",
            route: "/credit-cards",
        },
        {
            icon: HandCoins,
            title: "Loans",
            route: "/loans",
        },
        {
            icon: Wrench,
            title: "Services",
            route: "/services",
        },
        {
            icon: BadgePercent,
            title: "My Privileges",
            route: "/privileges",
        },
        {
            icon: Settings,
            title: "Settings",
            route: "/settings",
        }
    ]

    return (
        <nav className='fixed top-0 left-0 z-50 h-screen px-[30px] py-[30px] flex flex-col gap-[15px] border-r border-[#E6EFF5] bg-white'>
            <div className='flex items-center gap-[10px] mb-[40px]'>
                <img src={BankDashLogo} alt="bank dash logo" className='w-[36px]'/>
                <h1 className='text-[25px] font-[900] text-[#343C6A]'>BankDash.</h1>
            </div>

            <section className='flex flex-col h-full gap-[25px] w-full'>
                {
                    pages.map((pageInfo, pageIndex) => (
                        <Link to={pageInfo.route} key={pageInfo.title} onClick={() => setPath(pageInfo.route)}>
                            {
                                path === pageInfo.route ? <img src={ActivePageIcon} alt="active page" className='absolute left-0 -translate-y-[15px]' /> : null
                            }
                            <div className='flex items-center cursor-pointer gap-[20px] relative '>
                                <pageInfo.icon size="30px" color={path === pageInfo.route ? "#2D60FF" : "#B1B1B1"}/>
                                <h3 className={`${path === pageInfo.route ? 'text-[#2D60FF]' : 'text-[#B1B1B1]'} text-[18px] font-[500]`}>{pageInfo.title}</h3>
                            </div>
                        </Link>
                    ))
                }
            </section>
        </nav>
    )
}

export default NavBar
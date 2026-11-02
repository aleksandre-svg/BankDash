import { useMemo, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
    House, 
    ArrowLeftRight, 
    UserRound,  
    CreditCard, 
    Settings,
    X
} from 'lucide-react'
import BankDashLogo from '../../assets/images/BankDashLogo.png'
import ActivePageIcon from '../../assets/images/active_page.png'

const PAGES = [
    {
        icon: House,
        title: "Dashboard",
        route: "/dashboard",
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
        icon: CreditCard,
        title: "Credit Cards",
        route: "/credit-cards",
    },
    {
        icon: Settings,
        title: "Settings",
        route: "/settings",
    }
]

const NavBar = ({ isOpen, onClose }) => {
    const location = useLocation()
    const currentPath = location.pathname

    const handleLinkClick = useCallback(() => {
        if (onClose) {
            onClose()
        }
    }, [onClose])

    const navItems = useMemo(() => {
        return PAGES.map((pageInfo) => {
            const isActive = currentPath === pageInfo.route || (pageInfo.route !== '/' && currentPath.startsWith(pageInfo.route))
            const IconComponent = pageInfo.icon

            return (
                <Link 
                    to={pageInfo.route} 
                    key={pageInfo.title} 
                    onClick={handleLinkClick}
                    className="relative block"
                >
                    {isActive && (
                        <img 
                            src={ActivePageIcon} 
                            alt="active page indicator" 
                            className="absolute left-[-30px] top-1/2 -translate-y-1/2 h-12 w-1.5 object-cover" 
                        />
                    )}
                    <div className="flex items-center cursor-pointer gap-5 py-2 group">
                        <IconComponent 
                            size={26} 
                            color={isActive ? "#2D60FF" : "#B1B1B1"}
                            className="transition-colors group-hover:text-[#2D60FF] shrink-0"
                        />
                        <h3 className={`${isActive ? 'text-[#2D60FF] font-semibold' : 'text-[#B1B1B1] font-medium'} text-[18px] transition-colors group-hover:text-[#2D60FF]`}>
                            {pageInfo.title}
                        </h3>
                    </div>
                </Link>
            )
        })
    }, [currentPath, handleLinkClick])

    return (
        <>
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}
            <nav className={`fixed top-0 left-0 z-50 h-screen w-[250px] sm:w-[280px] px-[30px] py-[30px] flex flex-col gap-[15px] border-r border-[#E6EFF5] bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between mb-[40px]">
                    <div className="flex items-center gap-[10px]">
                        <img src={BankDashLogo} alt="bank dash logo" className="w-[36px] h-auto" />
                        <h1 className="text-[25px] font-black text-[#343C6A]">BankDash.</h1>
                    </div>
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="lg:hidden p-1 text-[#718EBF] hover:text-[#343C6A] rounded-lg cursor-pointer relative left-[15px] bottom-[15px]"
                        aria-label="Close sidebar"
                    >
                        <X size={24} />
                    </button>
                </div>

                <section className="flex flex-col h-full gap-[25px] w-full">
                    {navItems}
                </section>
            </nav>
        </>
    )
}

export default NavBar
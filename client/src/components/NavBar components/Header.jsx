import { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Settings, BellDot, Pencil, LogOut, Menu } from 'lucide-react'
import ProfilePlaceholder from '../../assets/images/profile_placeholder.png'
import { UserContext } from '../../App'
import api from '../../api/axios'

const Header = ({ pageTitle, onOpenSidebar }) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)

    const notificationRef = useRef(null)

    const toggleMenu = useCallback(() => {
        setShowMenu(prev => !prev)
        setShowNotifications(false)
    }, [])

    const toggleNotifications = useCallback(() => {
        setShowNotifications(prev => !prev)
        setShowMenu(false)
    }, [])

    const handleLogOut = useCallback(async () => {
        try {
            await api.post('logout/')
        } catch (err) {
            console.error("Logout failed", err)
        } finally {
            localStorage.removeItem('user')
            window.location.replace('/')
        }
    }, [])

    const fetchNotifications = useCallback(async () => {
        try {
            const response = await api.get('notifications/')
            const data = response.data
            setNotifications(data)
            setUnreadCount(data.filter(n => !n.is_read).length)
        } catch (err) {
            console.error("Failed to fetch notifications", err)
        }
    }, [])

    useEffect(() => {
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 10000)
        return () => clearInterval(interval)
    }, [fetchNotifications])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const markAsRead = useCallback(async (id) => {
        try {
            await api.patch(`notifications/${id}/`, { is_read: true })
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
            setUnreadCount(prev => Math.max(0, prev - 1))
        } catch (err) {
            console.error("Failed to mark notification as read", err)
        }
    }, [])

    const markAllAsRead = useCallback(async () => {
        try {
            await api.post('notifications/mark_all_read/')
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
            setUnreadCount(0)
        } catch (err) {
            notifications.filter(n => !n.is_read).forEach(n => markAsRead(n.id))
        }
    }, [notifications, markAsRead])

    const profilePic = currentUser?.profile_picture || ProfilePlaceholder

    return (
        <header className="flex items-center justify-between px-4 sm:px-[30px] py-[20px] border-b border-[#E6EFF5] sticky top-0 bg-white z-30 w-full">
            <div className="flex items-center gap-3">
                <button 
                    type="button"
                    onClick={onOpenSidebar}
                    className="lg:hidden w-10 h-10 bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors shrink-0"
                    aria-label="Open Sidebar Menu"
                >
                    <Menu color="#343C6A" size={22} />
                </button>
                <h2 className="font-bold text-[20px] sm:text-[28px] text-[#343C6A] capitalize truncate max-w-[200px] sm:max-w-none">{pageTitle}</h2>
            </div>

            <section className="flex items-center gap-3 sm:gap-[25px] relative">
                <div className="hidden md:flex w-[200px] lg:w-[255px] h-[50px] bg-[#F5F7FA] rounded-[40px] justify-center items-center gap-[15px] px-4">
                    <Search color="#718EBF" size={25} className="shrink-0" />
                    <input 
                        type="search" 
                        name="search_value" 
                        placeholder="Search for something" 
                        className="placeholder:text-[#8BA3CA] outline-none text-[#8BA4CB] bg-transparent text-sm w-full" 
                    />
                </div>

                <div 
                    className="hidden sm:flex w-[50px] h-[50px] bg-[#F5F7FA] rounded-full justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors shrink-0" 
                    onClick={() => navigate('/settings')}
                >
                    <Settings color="#718EBF" size={28} />
                </div>

                <div className="relative" ref={notificationRef}>
                    <div 
                        className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer relative hover:bg-slate-100 transition-colors shrink-0" 
                        onClick={toggleNotifications}
                    >
                        <BellDot color={unreadCount > 0 ? '#FE5C73' : '#718EBF'} size={24} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-3 h-3 bg-[#FE5C73] rounded-full border-2 border-white animate-pulse" />
                        )}
                    </div>

                    <div className={`w-[280px] sm:w-[360px] bg-white absolute shadow-xl rounded-[20px] top-[60px] sm:top-[65px] right-0 flex flex-col p-[20px] border border-[#E6EFF5] transition-all duration-200 origin-top-right z-50 ${
                        showNotifications 
                            ? 'opacity-100 scale-100 pointer-events-auto' 
                            : 'opacity-0 scale-95 pointer-events-none'
                    }`}>
                        <div className="flex items-center justify-between pb-3 border-b border-[#E6EFF5] mb-3">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-[16px] text-[#343C6A]">Notifications</h3>
                                {unreadCount > 0 && (
                                        <span className="bg-[#FFE8EE] text-[#FE5C73] text-[11px] font-bold px-2 py-0.5 rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button 
                                    type="button"
                                    onClick={markAllAsRead} 
                                    className="text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                            {notifications.length === 0 ? (
                                <p className="text-center text-sm text-[#718EBF] py-6">No notifications yet</p>
                            ) : (
                                notifications.map((n) => (
                                    <div 
                                        key={n.id} 
                                        onClick={() => !n.is_read && markAsRead(n.id)}
                                        className={`p-3 rounded-[12px] flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                                            n.is_read ? 'bg-white hover:bg-[#F5F7FA]' : 'bg-[#F0F5FF] hover:bg-[#E4EEFF]'
                                        }`}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className={`text-xs leading-relaxed ${n.is_read ? 'text-[#718EBF]' : 'text-[#343C6A] font-semibold'}`}>
                                                {n.message}
                                            </p>
                                            <span className="text-[10px] text-[#A3AED0]">
                                                {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        {!n.is_read && (
                                            <span className="w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-[44px] h-[44px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden cursor-pointer border border-slate-100 shadow-sm shrink-0" onClick={toggleMenu}>
                    <img src={profilePic} alt="profile picture" className="w-full h-full object-cover" />
                </div>

                <div className={`w-[280px] sm:w-[300px] bg-white absolute shadow-lg rounded-[15px] top-[60px] sm:top-[70px] right-0 flex flex-col items-center p-[15px] gap-[15px] border border-[#E6EFF5] transition-all duration-200 origin-top-right z-50 ${
                    showMenu 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                    <div className="flex flex-col items-center">
                        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
                            <img src={profilePic} alt="profile picture" className="w-full h-full object-cover" />
                        </div>
                        <h2 className="font-medium text-[20px] sm:text-[24px] text-[#343C6A] capitalize mt-2 text-center truncate max-w-[240px]">
                            {currentUser?.username?.replaceAll('_', ' ') || 'User'}
                        </h2>
                    </div>
                    
                    <div className="w-full flex justify-center flex-col items-center gap-[10px]">
                        <Link className="w-full" to="/settings" onClick={() => setShowMenu(false)}>
                            <button 
                                type="button"
                                className="w-full py-[8px] bg-[#E8EEFF] text-[#2563EB] rounded-[5px] flex items-center justify-center gap-[5px] hover:bg-[#DBE5FF] hover:text-[#1D4ED8] transition-colors duration-200 font-medium text-sm cursor-pointer"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit Profile
                            </button>
                        </Link>
                        <button 
                            type="button"
                            className="w-full py-[8px] bg-[#FFE8EE] text-[#E11D48] rounded-[5px] flex items-center justify-center gap-[5px] hover:bg-[#FFD1DC] transition-colors duration-200 font-medium text-sm cursor-pointer" 
                            onClick={handleLogOut}
                        >
                            <LogOut className="w-3.5 h-3.5"/>
                            Log out
                        </button>
                    </div>
                </div>
            </section>
        </header>
    )
}

export default Header
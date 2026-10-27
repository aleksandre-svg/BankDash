import { Search, Settings, BellDot, Check, X } from 'lucide-react';
import ProfilePLaceholder from '../../assets/images/profile_placeholder.png'
import { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from '../../App'
import { Pencil, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios';

const Header = ({pageTitle}) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)

    const notificationRef = useRef(null)

    const ToggleMenu = () => {
        setShowMenu(prev => !prev)
        setShowNotifications(false)
    }

    const ToggleNotifications = () => {
        setShowNotifications(prev => !prev)
        setShowMenu(false)
    }

    const handleLogOut = async () => {
        await api.post('logout/')
        location.replace('/')
    }

    const fetchNotifications = async () => {
        try {
            const response = await api.get('notifications/')
            const data = response.data
            setNotifications(data)
            setUnreadCount(data.filter(n => !n.is_read).length)
        } catch (err) {
            console.error("Failed to fetch notifications", err)
        }
    }

    useEffect(() => {
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 10000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const markAsRead = async (id) => {
        try {
            await api.patch(`notifications/${id}/`, { is_read: true })
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
            setUnreadCount(prev => Math.max(0, prev - 1))
        } catch (err) {
            console.error("Failed to mark notification as read", err)
        }
    }

    const markAllAsRead = async () => {
        try {
            await api.post('notifications/mark_all_read/')
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
            setUnreadCount(0)
        } catch (err) {
            // Fallback if bulk endpoint isn't set up yet
            notifications.filter(n => !n.is_read).forEach(n => markAsRead(n.id))
        }
    }

    return (
        <header className='flex items-center justify-between px-[30px] py-[20px] border-b border-[#E6EFF5] w-[80%] sticky top-0 bg-white z-50 w-full'>
            <div>
                <h2 className='font-[700] text-[28px] text-[#343C6A] capitalize'>{pageTitle}</h2>
            </div>

            <section className='flex items-center gap-[25px] relative'>
                <div className='flex w-[255px] h-[50px] bg-[#F5F7FA] rounded-[40px] justify-center items-center gap-[15px]'>
                    <Search color='#718EBF' size={'25px'}/>
                    <input type="search" name="search_value" placeholder='Search for something' className='placeholder:text-[#8BA3CA] outline-none text-[#8BA4CB]'/>
                </div>

                <div className='w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer' onClick={() => {
                    navigate('/settings')
                }}>
                    <Settings color='#718EBF' size={'28px'}/>
                </div>

                <div className='relative' ref={notificationRef}>
                    <div 
                        className='w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer relative' 
                        onClick={ToggleNotifications}
                    >
                        <BellDot color={unreadCount > 0 ? '#FE5C73' : '#718EBF'} size={'28px'}/>
                        {unreadCount > 0 && (
                            <span className='absolute top-2 right-2 w-3 h-3 bg-[#FE5C73] rounded-full border-2 border-white animate-pulse' />
                        )}
                    </div>

                    <div className={`w-[320px] sm:w-[360px] bg-white absolute shadow-xl rounded-[20px] top-[65px] right-0 flex flex-col p-[20px] border border-[#E6EFF5] transition-all duration-200 origin-top-right z-50 ${
                        showNotifications 
                            ? 'opacity-100 scale-100 pointer-events-auto' 
                            : 'opacity-0 scale-95 pointer-events-none'
                    }`}>
                        <div className='flex items-center justify-between pb-3 border-b border-[#E6EFF5] mb-3'>
                            <div className='flex items-center gap-2'>
                                <h3 className='font-bold text-[16px] text-[#343C6A]'>Notifications</h3>
                                {unreadCount > 0 && (
                                    <span className='bg-[#FFE8EE] text-[#FE5C73] text-[11px] font-bold px-2 py-0.5 rounded-full'>
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={markAllAsRead} 
                                    className='text-xs font-semibold text-[#2563EB] hover:underline'
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <div className='flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1'>
                            {notifications.length === 0 ? (
                                <p className='text-center text-sm text-[#718EBF] py-6'>No notifications yet</p>
                            ) : (
                                notifications.map((n) => (
                                    <div 
                                        key={n.id} 
                                        onClick={() => !n.is_read && markAsRead(n.id)}
                                        className={`p-3 rounded-[12px] flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                                            n.is_read ? 'bg-white hover:bg-[#F5F7FA]' : 'bg-[#F0F5FF] hover:bg-[#E4EEFF]'
                                        }`}
                                    >
                                        <div className='flex flex-col gap-1'>
                                            <p className={`text-xs leading-relaxed ${n.is_read ? 'text-[#718EBF]' : 'text-[#343C6A] font-semibold'}`}>
                                                {n.message}
                                            </p>
                                            <span className='text-[10px] text-[#A3AED0]'>
                                                {new Date(n.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        {!n.is_read && (
                                            <span className='w-2 h-2 rounded-full bg-[#2563EB] shrink-0 mt-1' />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className='w-[60px] h-[60px] rounded-full overflow-hidden cursor-pointer' onClick={ToggleMenu}>
                    <img src={currentUser?.profile_picture ? currentUser?.profile_picture : ProfilePLaceholder} alt="profile picture" />
                </div>

                <div className={`w-[300px] bg-white absolute shadow-lg rounded-[15px] top-[70px] right-0 flex flex-col items-center p-[15px] gap-[15px] border border-[#E6EFF5] transition-all duration-200 origin-top-right ${
                    showMenu 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none'
                }`}>
                    <div className='flex flex-col items-center'>
                        <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                            <img src={currentUser?.profile_picture ? currentUser?.profile_picture : ProfilePLaceholder} alt="profile picture" />
                        </div>
                        <h2 className='font-[500] text-[24px] text-[#343C6A] capitalize mt-2'>
                            {currentUser?.username?.replaceAll('_', ' ')}
                        </h2>
                    </div>
                    
                    <div className='w-full flex justify-center flex-col items-center gap-[10px]'>
                        <Link className='w-full' to='/settings'>
                            <button className='w-full py-[8px] bg-[#E8EEFF] text-[#2563EB] rounded-[5px] flex items-center justify-center gap-[5px] hover:bg-[#DBE5FF] hover:text-[#1D4ED8] transition-colors duration-200'>
                                <Pencil className="w-3.5 h-3.5" />
                                Edit Profile
                            </button>
                        </Link>
                        <button className='w-[100%] py-[8px] bg-[#FFE8EE] text-[#E11D48] rounded-[5px] flex items-center justify-center gap-[5px] hover:bg-[#FFD1DC] transition-colors duration-200' onClick={handleLogOut}>
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
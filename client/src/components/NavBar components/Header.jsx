import { Search, Settings, BellDot } from 'lucide-react';
import ProfilePLaceholder from '../../assets/images/profile_placeholder.png'
import { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Pencil, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/axios';

const Header = ({pageTitle}) => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [showMenu, setShowMenu] = useState(false)

    const ToggleMenu = () => setShowMenu(prev => !prev)
    const handleLogOut = async () => {
        const response = await api.post('logout/')
        location.replace('/')
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

                <div className='w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer'>
                    <BellDot color='#FE5C73' size={'28px'}/>
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
import { Search, Settings, BellDot } from 'lucide-react';
import ProfilePLaceholder from '../../assets/images/profile_placeholder.png'

const Header = ({pageTitle}) => {
    return (
        <header className='flex items-center justify-between px-[30px] py-[20px] border-b border-[#E6EFF5] w-full sticky top-0 w-[80%] bg-white z-50'>
            <div>
                <h2 className='font-[700] text-[28px] text-[#343C6A] capitalize'>{pageTitle}</h2>
            </div>

            <section className='flex items-center gap-[25px]'>
                <div className='flex w-[255px] h-[50px] bg-[#F5F7FA] rounded-[40px] justify-center items-center gap-[15px]'>
                    <Search color='#718EBF' size={'25px'}/>
                    <input type="search" name="search_value" placeholder='Search for something' className='placeholder:text-[#8BA3CA] outline-none text-[#8BA4CB]'/>
                </div>

                <div className='w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer'>
                    <Settings color='#718EBF' size={'28px'}/>
                </div>

                <div className='w-[50px] h-[50px] bg-[#F5F7FA] rounded-full flex justify-center items-center cursor-pointer'>
                    <BellDot color='#FE5C73' size={'28px'}/>
                </div>

                <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
                    <img src={ProfilePLaceholder} alt="profile picture" />
                </div>
            </section>
        </header>
    )
}

export default Header
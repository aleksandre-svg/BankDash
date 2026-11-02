import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import creditCardChip from '../../../../../assets/images/creditCardChip.png'
import DebitCardLogo from '../../../../../assets/images/DebitCardLogo.png'

const CREDIT_CARD_COLORS = {
    ABM: '#4C49ED',
    BRC: '#E11D48',
    DBL: '#D97706'
}

const CreditCard = ({ 
    creditCardBalance, 
    creditCardHolder = '', 
    creditCardValidDate, 
    creditCardPAN, 
    lightMode, 
    creditCardbank, 
    creditCardID 
}) => {
    const navigate = useNavigate()

    const creditCardStyle = useMemo(() => ({
        backgroundColor: CREDIT_CARD_COLORS[creditCardbank] || '#4C49ED',
        color: lightMode ? '#343C6A' : 'white'
    }), [creditCardbank, lightMode])

    const capitalizedHolder = useMemo(() => {
        if (typeof creditCardHolder !== 'string' || !creditCardHolder.trim()) return ''
        const parts = creditCardHolder.trim().split(/\s+/)
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ')
    }, [creditCardHolder])

    const maskedPAN = useMemo(() => {
        const panStr = String(creditCardPAN || '')
        if (panStr.length < 16) return panStr || '#### **** **** ####'
        return `${panStr.slice(0, 4)} **** **** ${panStr.slice(12)}`
    }, [creditCardPAN])

    const handleCardClick = useCallback(() => {
        if (creditCardID) {
            navigate(`/credit-cards/${creditCardID}`)
        }
    }, [navigate, creditCardID])

    const formattedBalance = useMemo(() => {
        const num = parseFloat(creditCardBalance)
        return isNaN(num) ? '0.00' : num.toLocaleString()
    }, [creditCardBalance])

    return (
        <div 
            onClick={handleCardClick}
            className="w-full max-w-[340px] sm:max-w-none h-[210px] sm:h-[235px] rounded-[25px] overflow-hidden text-white hover:shadow-md cursor-pointer hover:translate-y-[-3px] sm:hover:translate-y-[-5px] hover:scale-[1.02] sm:hover:scale-[1.05] transition-all duration-150 shrink-0 mx-auto" 
            style={creditCardStyle}
        >
            <div className="w-full h-[70%] flex flex-col p-4 sm:p-[25px] justify-between border-b border-white/20">
                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col translate-y-[3px]">
                        <h4 className="text-[11px] sm:text-[12px] font-[400] opacity-80 leading-[3px]">Balance</h4>
                        <p className="text-lg sm:text-[20px] font-[600]">${formattedBalance}</p>
                    </div>
                    <img 
                        src={creditCardChip} 
                        alt="credit card chip" 
                        className={`${lightMode ? 'invert' : ''} w-[30px] sm:w-[35px]`} 
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col translate-y-[3px] truncate pr-2">
                        <h4 className="text-[10px] sm:text-[12px] font-[400] opacity-80 leading-[10px]">CARD HOLDER</h4>
                        <p className="text-[13px] sm:text-[15px] font-[600] truncate max-w-[150px] sm:max-w-[200px]">{capitalizedHolder}</p>
                    </div>
                    <div className="flex flex-col translate-y-[3px] shrink-0">
                        <h4 className="text-[10px] sm:text-[12px] font-[400] opacity-80 leading-[10px]">VALID THRU</h4>
                        <p className="text-[13px] sm:text-[15px] font-[600]">{creditCardValidDate}</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[30%] flex justify-between items-center px-4 sm:px-[25px]">
                <h3 className="text-base sm:text-[22px] font-[600] tracking-wider">{maskedPAN}</h3>
                <img 
                    src={DebitCardLogo} 
                    alt="debit card logo" 
                    className={`${lightMode ? 'invert' : ''} h-5 sm:h-auto`} 
                />
            </div>
        </div>
    )
}

export default CreditCard
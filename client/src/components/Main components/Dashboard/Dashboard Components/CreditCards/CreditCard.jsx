import creditCardChip from '../../../../../assets/images/creditCardChip.png'
import DebitCardLogo from '../../../../../assets/images/DebitCardLogo.png'

const CreditCard = ({ creditCardBalance, creditCardHolder, creditCardValidDate, creditCardPAN, lightMode, creditCardbank}) => {
    const creditCardColor = {
        ABM: '#4C49ED',
        BRC: '#E11D48',
        DBL: '#D97706'
    }
    const creditCardStyle = {
        backgroundColor: creditCardColor[creditCardbank],
        color: lightMode ? '#343C6A' : 'white'
    }


    const creditCardHolderSplited = creditCardHolder.split(" ")

    const creditCardHolderCapitalized = creditCardHolderSplited[0][0].toUpperCase() + creditCardHolderSplited[0].slice(1) + ' ' + creditCardHolderSplited[1][0].toUpperCase() + creditCardHolderSplited[1].slice(1)

    const creditCardPANHidden = String(creditCardPAN).slice(0, 4) + ' **** **** ' + String(creditCardPAN).slice(12)

    return (
        <div className={`w-full h-[235px] rounded-[25px] overflow-hidden text-white hover:shadow-md cursor-pointer hover:translate-y-[-5px] hover:scale-[1.09] hover:z-1 hover:border hover:border-[3px] duration-100`} style={creditCardStyle}>
            <div className=" w-full h-[70%] flex flex-col p-[25px] justify-between border-b">
                <div className='flex justify-between items-center w-full'>
                    <div className='flex flex-col translate-y-[3px]'>
                        <h4 className='text-[12px] font-[400] leading-[3px]'>Balance</h4>
                        <p className='text-[20px] font-[600['>${creditCardBalance.toLocaleString()}</p>
                    </div>
                    <img src={creditCardChip} alt="credit cart chip" className={`${lightMode ? 'invert' : ''} w-[35px]`} />
                </div>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col translate-y-[3px]'>
                        <h4 className='text-[12px] font-[400] leading-[10px]'>CARD HOLDER</h4>
                        <p className='text-[15px] font-[600['>{creditCardHolderCapitalized}</p>
                    </div>
                    <div className='flex flex-col translate-y-[3px]'>
                        <h4 className='text-[12px] font-[400] leading-[10px]'>VALID THRU</h4>
                        <p className='text-[15px] font-[600['>{creditCardValidDate}</p>
                    </div>
                </div>
            </div>
            <div className=" w-full h-[30%] flex justify-between items-center px-[25px]">
                <h3 className='text-[22px] font-[600]'>{creditCardPANHidden}</h3>
                <img src={DebitCardLogo} alt="debit card logo" className={`${lightMode ? 'invert' : ''}`}/>
            </div>
        </div>
    )
}

export default CreditCard
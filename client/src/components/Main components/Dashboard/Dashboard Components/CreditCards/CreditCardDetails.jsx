import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../../../App"
import api from "../../../../../api/axios"

const CREDIT_CARD_COLORS = {
    ABM: '#4C49ED',
    BRC: '#E11D48',
    DBL: '#D97706'
}

const CreditCardDetails = () => {
    const { currentUser } = useContext(UserContext)
    const { cardId } = useParams()
    
    const [card, setCard] = useState(null)
    const [userCards, setUserCards] = useState([])
    const [loading, setLoading] = useState(true)
    
    const [recipientId, setRecipientId] = useState("")
    const [recipientCards, setRecipientCards] = useState([])
    const [selectedTargetCard, setSelectedTargetCard] = useState("")
    const [transferAmount, setTransferAmount] = useState("")
    const [transferDescription, setTransferDescription] = useState("")
    
    const [myTargetCard, setMyTargetCard] = useState("")
    const [ownTransferAmount, setOwnTransferAmount] = useState("")
    const [ownTransferDescription, setOwnTransferDescription] = useState("")
    
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [transferLoading, setTransferLoading] = useState(false)
    const [ownTransferLoading, setOwnTransferLoading] = useState(false)

    const fetchCardDetails = useCallback(async () => {
        if (!cardId) return
        try {
            const [cardRes, allCardsRes] = await Promise.all([
                api.get(`cards/${cardId}/`),
                api.get('cards/')
            ])
            
            setCard(cardRes.data)
            setUserCards(allCardsRes.data)
            
            const otherCards = allCardsRes.data.filter(c => c.id.toString() !== cardId)
            if (otherCards.length > 0) {
                setMyTargetCard(otherCards[0].id)
            } else if (allCardsRes.data.length > 0) {
                setMyTargetCard(allCardsRes.data[0].id)
            }
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Failed to load card details"))
        } finally {
            setLoading(false)
        }
    }, [cardId])

    useEffect(() => {
        fetchCardDetails()
    }, [fetchCardDetails])

    const handleFetchRecipientCards = async (e) => {
        e.preventDefault()
        if (recipientId === currentUser.id){
            setError("You can't transfer to your own account. use own transfer below")
            return
        }
        setSuccess('')
        setError('')
        setRecipientCards([])
        setSelectedTargetCard("")

        console.log(recipientId, currentUser.id)


        try {
            const { data } = await api.get(`users/${recipientId}/cards/`)
            setRecipientCards(data)
            if (data.length > 0) {
                setSelectedTargetCard(data[0].id)
            }
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Failed to fetch user cards"))
        }
    }

    const handleUserTransfer = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        if (transferAmount < 1){
            setError("Transfer amount should be at least 1$")
            return
        }

        if (parseFloat(transferAmount) > parseFloat(card.balance)) {
            setError("Transfer amount exceeds card balance")
            return
        }

        setTransferLoading(true)
        try {
            await api.post('transactions/', {
                source_card_id: cardId,
                card: selectedTargetCard,
                balance: transferAmount,
                description: transferDescription,
                transaction_type: "transfer",
                transation_result: false
            })
            setSuccess('Transfer to user successful!')
            setTransferAmount('')
            setTransferDescription('')
            await fetchCardDetails()
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Transfer failed"))
        } finally {
            setTransferLoading(false)
        }
    }

    const handleOwnTransfer = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        if (ownTransferAmount < 1){
            setError("Transfer amount should be at least 1$")
            return
        }

        if (parseFloat(ownTransferAmount) > parseFloat(card.balance)) {
            setError("Transfer amount exceeds card balance")
            return
        }

        setOwnTransferLoading(true)
        try {
            await api.post('transactions/', {
                source_card_id: cardId,
                card: myTargetCard,
                balance: ownTransferAmount,
                description: ownTransferDescription,
                transaction_type: "internal_transfer",
                transation_result: true
            })
            setSuccess('Internal card transfer successful!')
            setOwnTransferAmount('')
            setOwnTransferDescription('')
            await fetchCardDetails()
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Internal transfer failed"))
        } finally {
            setOwnTransferLoading(false)
        }
    }

    const fullName = useMemo(() => {
        return currentUser ? `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() : ''
    }, [currentUser])

    const filteredUserCards = useMemo(() => {
        return userCards.filter(c => c.id.toString() !== cardId)
    }, [userCards, cardId])

    if (loading) {
        return <div className="p-8 text-[#718EBF] text-sm font-medium">Loading card details...</div>
    }

    if (error && !card) {
        return <div className="p-8 text-rose-600 text-sm font-medium">{error}</div>
    }

    const cardBgColor = card ? (CREDIT_CARD_COLORS[card.bank] || '#4C49ED') : '#4C49ED'

    return (
        <div className="w-[95%] bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-slate-100/80 font-sans m-auto mt-[30px] space-y-10">
            <h1 className="text-xl font-bold text-[#232323]">Card Details & Transfers</h1>

            {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}
            {error && <p className="text-rose-600 text-sm font-medium">{error}</p>}

            {card && (
                <div className="p-6 rounded-2xl text-white shadow-md max-w-xl space-y-4" style={{ backgroundColor: cardBgColor }}>
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider opacity-80">{card.card_type || 'Debit Card'}</span>
                        <span className="text-xs font-mono opacity-80">Card ID: {card.id}</span>
                    </div>
                    <div className="text-lg font-mono tracking-widest py-2">
                        {card.card_number || card.number || '#### #### #### ####'}
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                        <div>
                            <span className="opacity-70 block text-[10px] uppercase">Expiry</span>
                            <span>{card.valid_date || card.expires || 'MM/YY'}</span>
                        </div>
                        <div>
                            <span className="opacity-70 block text-[10px] uppercase">CVC</span>
                            <span>{card.cvc || '***'}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                        <div>
                            <p className="text-[10px] uppercase opacity-70">Card Holder</p>
                            <p className="text-sm font-medium">{fullName || card.holder_name || 'Account Holder'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase opacity-70">Balance</p>
                            <p className="text-base font-bold">${card.balance || '0.00'}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="border border-slate-100 p-6 rounded-2xl space-y-6">
                <h2 className="text-base font-semibold text-[#232323]">Transfer to Another User Using This Card</h2>
                <form onSubmit={handleFetchRecipientCards} className="flex gap-4 items-end">
                    <div className="flex flex-col gap-2 flex-1">
                        <label className="text-[#232323] text-sm font-normal">Recipient User ID</label>
                        <input 
                            type="text" 
                            required
                            value={recipientId} 
                            onChange={(e) => setRecipientId(e.target.value)} 
                            placeholder="Enter user ID" 
                            className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="px-6 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95 shrink-0"
                    >
                        Find Cards
                    </button>
                </form>

                {recipientCards.length > 0 && (
                    <form onSubmit={handleUserTransfer} className="space-y-6 pt-4 border-t border-slate-100">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#232323] text-sm font-medium">Select Recipient Card</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {recipientCards.map((rcard) => (
                                    <div 
                                        key={rcard.id} 
                                        onClick={() => setSelectedTargetCard(rcard.id)} 
                                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedTargetCard === rcard.id ? 'border-[#1814F3] bg-blue-50/30 shadow-sm' : 'border-slate-200/80'}`}
                                    >
                                        <p className="text-xs text-[#718EBF]">Card ID: {rcard.id}</p>
                                        <p className="text-sm font-semibold text-[#343C6A] mt-2">**** **** **** {rcard.last_four || rcard.masked_number || '****'}</p>
                                        <p className="text-xs text-[#718EBF] mt-1">{rcard.card_type || 'Debit Card'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#232323] text-sm font-normal">Amount</label>
                                <input 
                                    type="number" 
                                    step="0.01" 
                                    required
                                    value={transferAmount} 
                                    onChange={(e) => setTransferAmount(e.target.value)} 
                                    placeholder="0.00" 
                                    className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#232323] text-sm font-normal">Description</label>
                                <input 
                                    type="text" 
                                    value={transferDescription} 
                                    onChange={(e) => setTransferDescription(e.target.value)} 
                                    placeholder="Reason for transfer" 
                                    className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button 
                                type="submit" 
                                disabled={transferLoading}
                                className="px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95"
                            >
                                {transferLoading ? 'Sending...' : 'Send Money'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="border border-slate-100 p-6 rounded-2xl space-y-6">
                <h2 className="text-base font-semibold text-[#232323]">Transfer From This Card to Your Other Cards</h2>
                <form onSubmit={handleOwnTransfer} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">To Your Card</label>
                        <select 
                            value={myTargetCard} 
                            onChange={(e) => setMyTargetCard(e.target.value)} 
                            className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white"
                        >
                            {filteredUserCards.map((c) => (
                                <option key={c.id} value={c.id}>
                                    ID: {c.id} - **** {c.last_four || '****'} (Balance: ${c.balance || '0.00'})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#232323] text-sm font-normal">Amount</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                required
                                value={ownTransferAmount} 
                                onChange={(e) => setOwnTransferAmount(e.target.value)} 
                                placeholder="0.00" 
                                className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#232323] text-sm font-normal">Description</label>
                            <input 
                                type="text" 
                                value={ownTransferDescription} 
                                onChange={(e) => setOwnTransferDescription(e.target.value)} 
                                placeholder="Reason for transfer" 
                                className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={ownTransferLoading}
                            className="px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95"
                        >
                            {ownTransferLoading ? 'Transferring...' : 'Transfer Between Cards'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreditCardDetails
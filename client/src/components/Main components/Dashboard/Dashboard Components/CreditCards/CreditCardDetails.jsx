import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../../../App"
import { useContext } from "react"
import api from "../../../../../api/axios"

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

    const creditCardColor = {
        ABM: '#4C49ED',
        BRC: '#E11D48',
        DBL: '#D97706'
    }

    useEffect(() => {
        const fetchCardAndUserCards = async () => {
            try {
                const cardRes = await api.get(`cards/${cardId}/`)
                setCard(cardRes.data)

                const allCardsRes = await api.get('cards/')
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
        }

        if (cardId) {
            fetchCardAndUserCards()
        }
    }, [cardId])

    const handleFetchRecipientCards = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')
        setRecipientCards([])
        setSelectedTargetCard("")

        try {
            const response = await api.get(`users/${recipientId}/cards/`)
            setRecipientCards(response.data)
            if (response.data.length > 0) {
                setSelectedTargetCard(response.data[0].id)
            }
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Failed to fetch user cards"))
        }
    }

    const handleUserTransfer = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        if (parseFloat(transferAmount) > parseFloat(card.balance)) {
            setError("Transfer amount exceeds card balance")
            return
        }

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
            const cardRes = await api.get(`cards/${cardId}/`)
            setCard(cardRes.data)
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Transfer failed"))
        }
    }

    const handleOwnTransfer = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        if (parseFloat(ownTransferAmount) > parseFloat(card.balance)) {
            setError("Transfer amount exceeds card balance")
            return
        }

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
            const cardRes = await api.get(`cards/${cardId}/`)
            setCard(cardRes.data)
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Internal transfer failed"))
        }
    }

    if (loading) {
        return <div className="p-8 text-[#718EBF] text-sm">Loading card details...</div>
    }

    if (error && !card) {
        return <div className="p-8 text-red-600 text-sm">{error}</div>
    }

    const cardBgColor = creditCardColor[card?.bank]

    console.log(cardBgColor)

    return (
        <div className="w-[95%] bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-slate-100/80 font-sans m-auto mt-[30px] space-y-10">
            <h1 className="text-xl font-bold text-[#232323]">Card Details & Transfers</h1>

            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {card && (
                <div className="p-6 rounded-2xl text-white shadow-md max-w-xl space-y-4" style={{
                    backgroundColor: cardBgColor
                }}>
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
                            <p className="text-sm font-medium">{currentUser.first_name + ' ' + currentUser.last_name || card.holder_name || 'Account Holder'}</p>
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
                        <input type="text" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} placeholder="Enter user ID" className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <button type="submit" className="px-6 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                        Find Cards
                    </button>
                </form>

                {recipientCards.length > 0 && (
                    <form onSubmit={handleUserTransfer} className="space-y-6 pt-4 border-t border-slate-100">
                        <div className="flex flex-col gap-3">
                            <span className="text-[#232323] text-sm font-medium">Select Recipient Card</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {recipientCards.map((rcard) => (
                                    <div key={rcard.id} onClick={() => setSelectedTargetCard(rcard.id)} className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedTargetCard === rcard.id ? 'border-[#1814F3] bg-blue-50/30 shadow-sm' : 'border-slate-200/80'}`}>
                                        <p className="text-xs text-[#718EBF]">Card ID: {rcard.id}</p>
                                        <p className="text-sm font-semibold text-[#232323] mt-2">**** **** **** {rcard.last_four || rcard.masked_number || '****'}</p>
                                        <p className="text-xs text-[#718EBF] mt-1">{rcard.card_type || 'Debit Card'}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#232323] text-sm font-normal">Amount</label>
                                <input type="number" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} placeholder="0.00" className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#232323] text-sm font-normal">Description</label>
                                <input type="text" value={transferDescription} onChange={(e) => setTransferDescription(e.target.value)} placeholder="Reason for transfer" className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                                Send Money
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
                        <select value={myTargetCard} onChange={(e) => setMyTargetCard(e.target.value)} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white">
                            {userCards.filter(c => c.id.toString() !== cardId).map((c) => (
                                <option key={c.id} value={c.id}>
                                    ID: {c.id} - **** {c.last_four || '****'} (Balance: ${c.balance || '0.00'})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#232323] text-sm font-normal">Amount</label>
                            <input type="number" value={ownTransferAmount} onChange={(e) => setOwnTransferAmount(e.target.value)} placeholder="0.00" className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[#232323] text-sm font-normal">Description</label>
                            <input type="text" value={ownTransferDescription} onChange={(e) => setOwnTransferDescription(e.target.value)} placeholder="Reason for transfer" className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                            Transfer Between Cards
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreditCardDetails
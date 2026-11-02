import { useState, useCallback, useMemo } from 'react'
import {
    CreditCard,
    Lock,
    Sliders,
    Radio,
    Snowflake,
    AlertTriangle,
    FileText,
    X,
    CheckCircle2,
    AlertCircle
} from "lucide-react"

const GoogleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"/>
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
        <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.2-1.3 0-5z"/>
        <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
    </svg>
)

const AppleIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#0D9488">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.1-.98.04-2.18.66-2.88 1.48-.62.72-1.16 1.88-.99 3.01 1.1.09 2.21-.57 2.88-1.39z" />
    </svg>
)

const SETTINGS_OPTIONS = [
    {
        id: 'block',
        title: "Block Card",
        subtitle: "Instantly block your card",
        bgColor: "bg-[#FFF6E5]",
        icon: (
            <div className="relative">
                <CreditCard className="w-6 h-6 text-[#F59E0B]" />
                <span className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px] font-bold">-</span>
            </div>
        ),
    },
    {
        id: 'pin',
        title: "Change Pin Code",
        subtitle: "Choose another 4-digit pin",
        bgColor: "bg-[#EBF3FF]",
        icon: <Lock className="w-6 h-6 text-[#3B82F6]" />,
    },
    {
        id: 'google-pay',
        title: "Add to Google Pay",
        subtitle: "Withdraw without any card",
        bgColor: "bg-[#FFEBF0]",
        icon: <GoogleIcon />,
    },
    {
        id: 'apple-pay',
        title: "Add to Apple Pay",
        subtitle: "Withdraw without any card",
        bgColor: "bg-[#E6F9F6]",
        icon: <AppleIcon />,
    },
    {
        id: 'limit',
        title: "Set Online Limit",
        subtitle: "Manage daily online spending",
        bgColor: "bg-[#F3E8FF]",
        icon: <Sliders className="w-6 h-6 text-[#A855F7]" />,
    },
    {
        id: 'nfc',
        title: "Contactless Payment",
        subtitle: "Enable or disable NFC tap",
        bgColor: "bg-[#CCFBF1]",
        icon: <Radio className="w-6 h-6 text-[#14B8A6]" />,
    },
    {
        id: 'freeze',
        title: "Freeze Card",
        subtitle: "Temporarily pause card activity",
        bgColor: "bg-[#E0F2FE]",
        icon: <Snowflake className="w-6 h-6 text-[#0284C7]" />,
    },
    {
        id: 'report',
        title: "Report Lost or Stolen",
        subtitle: "Instantly flag card security issue",
        bgColor: "bg-[#FFEDD5]",
        icon: <AlertTriangle className="w-6 h-6 text-[#F97316]" />,
    },
    {
        id: 'statement',
        title: "Card Statements",
        subtitle: "Download monthly PDFs",
        bgColor: "bg-[#E0E7FF]",
        icon: <FileText className="w-6 h-6 text-[#6366F1]" />,
    },
]

const CardSetting = ({ cardId }) => {
    const [activeModal, setActiveModal] = useState(null)
    const [inputVal, setInputVal] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOpenModal = useCallback((id) => {
        setError('')
        setSuccess('')
        setInputVal('')
        setActiveModal(id)
    }, [])

    const handleCloseModal = useCallback(() => {
        setActiveModal(null)
    }, [])

    const handleSubmitAction = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (activeModal === 'pin') {
            if (!/^\d{4}$/.test(inputVal)) {
                setError('PIN code must be exactly 4 digits.')
                return
            }
        } else if (activeModal === 'limit') {
            if (!inputVal || isNaN(inputVal) || Number(inputVal) <= 0) {
                setError('Please enter a valid positive limit amount.')
                return
            }
        }

        setLoading(true)
        try {
            setSuccess('Action executed successfully!')
            setTimeout(() => {
                setActiveModal(null)
                setSuccess('')
                window.location.reload()
            }, 1200)
        } catch (err) {
            setError(err.response?.data?.detail || 'Operation failed. Try again.')
            setLoading(false)
        }
    }

    const modalTitle = useMemo(() => {
        if (!activeModal) return ''
        return activeModal.replace('-', ' ')
    }, [activeModal])

    const isSimpleAction = useMemo(() => {
        return ['block', 'freeze', 'report', 'google-pay', 'apple-pay', 'nfc', 'statement'].includes(activeModal)
    }, [activeModal])

    return (
        <div className="bg-white rounded-[28px] p-6 border border-slate-100/80 shadow-sm relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                {SETTINGS_OPTIONS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleOpenModal(item.id)}
                        type="button"
                        className="flex items-center gap-4 text-left group hover:bg-slate-50/80 p-3 -m-3 rounded-2xl transition-all duration-200 w-full border border-transparent hover:border-slate-100 cursor-pointer"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.bgColor} transition-transform duration-200 group-hover:scale-105 shadow-sm`}>
                            {item.icon}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[#343C6A] font-semibold text-base leading-tight truncate group-hover:text-[#1814F3] transition-colors">
                                {item.title}
                            </span>
                            <span className="text-[#8BA3CB] text-xs font-normal mt-1 truncate">
                                {item.subtitle}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            {activeModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-[#343C6A] capitalize">
                                {modalTitle}
                            </h3>
                            <button 
                                type="button"
                                onClick={handleCloseModal}
                                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#718EBF] hover:bg-slate-200 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {success ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-3 text-emerald-600">
                                <CheckCircle2 className="w-12 h-12" />
                                <p className="font-semibold text-base">{success}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitAction} className="flex flex-col gap-5">
                                {activeModal === 'pin' && (
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-[#718EBF] uppercase tracking-wider">New 4-Digit PIN</label>
                                        <input 
                                            type="password"
                                            maxLength={4}
                                            placeholder="••••"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ''))}
                                            className="h-14 px-4 rounded-2xl bg-[#F5F7FA] border border-slate-200 text-center text-2xl font-bold tracking-[0.5em] text-[#343C6A] outline-none focus:border-[#1814F3]"
                                        />
                                    </div>
                                )}

                                {activeModal === 'limit' && (
                                    <div className="flex flex-col gap-2">
                                        <label className="text-xs font-semibold text-[#718EBF] uppercase tracking-wider">Daily Spending Limit ($)</label>
                                        <input 
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 1500"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            className="h-14 px-4 rounded-2xl bg-[#F5F7FA] border border-slate-200 text-lg font-semibold text-[#343C6A] outline-none focus:border-[#1814F3]"
                                        />
                                    </div>
                                )}

                                {isSimpleAction && (
                                    <p className="text-sm text-[#718EBF]">
                                        Are you sure you want to proceed with <span className="font-semibold text-[#343C6A] capitalize">{modalTitle}</span> for this card?
                                    </p>
                                )}

                                {error && (
                                    <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-[#FE5C73] text-xs rounded-xl font-medium">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 h-12 bg-slate-100 hover:bg-slate-200 text-[#718EBF] font-medium rounded-2xl transition-colors text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium rounded-2xl transition-colors shadow-sm text-sm disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? 'Processing...' : 'Confirm'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CardSetting  
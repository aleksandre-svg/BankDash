import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../api/axios'

const Verification = () => {
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSendCode = async () => {
        setError('')
        setMessage('')
        try {
            await api.post('auth/send-verification/')
            setMessage('Verification code sent to your email!')
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to send verification code.')
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setLoading(true)

        try {
            await api.post('auth/verify-2fa/', { code })
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.detail || 'Invalid verification code. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#F5F7FA] flex items-center justify-center p-6">
            <div className="bg-white rounded-[25px] p-8 md:p-10 max-w-[480px] w-full shadow-sm border border-[#E6EFF5] flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[26px] font-bold text-[#343C6A]">Two-Factor Verification</h2>
                    <p className="text-sm text-[#718EBF]">
                        Your account has 2FA enabled. Please verify your identity to proceed to your dashboard.
                    </p>
                </div>

                {message && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs rounded-xl font-medium">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-[#FE5C73] text-xs rounded-xl font-medium">
                        {error}
                    </div>
                )}

                <button 
                    type="button"
                    onClick={handleSendCode}
                    className="w-full h-[50px] bg-[#E8EEFF] text-[#2563EB] hover:bg-[#DBE5FF] transition-colors rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                    Send 6-digit code to my email
                </button>

                <form onSubmit={handleVerify} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold text-[#343C6A] uppercase tracking-wider">
                            Verification Code
                        </label>
                        <input 
                            type="text" 
                            maxLength="6"
                            placeholder="------"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="h-[55px] px-4 rounded-2xl bg-[#F5F7FA] border border-[#E6EFF5] text-center text-2xl font-bold tracking-[0.5em] text-[#343C6A] outline-none focus:border-[#2563EB] transition-colors placeholder:text-slate-300"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={loading || code.length < 6}
                        className="w-full h-[55px] bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-2xl transition-all shadow-sm active:scale-95 flex items-center justify-center text-base"
                    >
                        {loading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                </form>

                <div className="flex justify-center pt-2">
                    <button 
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-xs text-[#718EBF] hover:text-[#343C6A] font-medium transition-colors"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Verification
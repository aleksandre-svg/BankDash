import { useState, useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, User, Calendar, MapPin, Building, Globe, Hash, AlertCircle } from "lucide-react"
import { UserContext } from "../../../App"
import api from "../../../api/axios"

const LoginTab = () => {
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(UserContext) 
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('login/', loginData);
            const foundUser = response.data;

            console.log(foundUser)

            localStorage.setItem('user', JSON.stringify(foundUser))
            if (foundUser.csrf_token) {
                localStorage.setItem('csrftoken', foundUser.csrf_token)
            }

            setCurrentUser(foundUser);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid email or password.');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-[#FE5C73] text-xs rounded-xl font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-normal">Email</label>
                <div className="relative">
                    <input 
                        type="email" 
                        name="email" 
                        value={loginData.email} 
                        onChange={handleChange} 
                        required
                        placeholder="johndoe@example.com" 
                        className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" 
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-normal">Password</label>
                <div className="relative">
                    <input 
                        type="password" 
                        name="password" 
                        value={loginData.password} 
                        onChange={handleChange} 
                        required
                        placeholder="**********" 
                        className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" 
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95 cursor-pointer"
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </div>
        </form>
    )
}

const RegisterTab = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        permanent_address: "",
        city: "",
        country: "",
        postal_code: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setRegisterData(prev => ({ ...prev, [name]: value }))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await api.post('users/', registerData)
            window.location.reload()
        } catch (err) {
            const errData = err.response?.data
            if (typeof errData === 'object' && errData !== null) {
                const firstKey = Object.keys(errData)[0]
                const firstMsg = Array.isArray(errData[firstKey]) ? errData[firstKey][0] : errData[firstKey]
                setError(`${firstKey}: ${firstMsg}`)
            } else {
                setError('Registration failed. Please check your inputs.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            {error && (
                <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-[#FE5C73] text-xs rounded-xl font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Username</label>
                    <div className="relative">
                        <input type="text" name="username" value={registerData.username} onChange={handleChange} required placeholder="johndoe" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Email</label>
                    <div className="relative">
                        <input type="email" name="email" value={registerData.email} onChange={handleChange} required placeholder="johndoe@example.com" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">First Name</label>
                    <div className="relative">
                        <input type="text" name="first_name" value={registerData.first_name} onChange={handleChange} required placeholder="John" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Last Name</label>
                    <div className="relative">
                        <input type="text" name="last_name" value={registerData.last_name} onChange={handleChange} required placeholder="Doe" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Date of Birth</label>
                    <div className="relative">
                        <input type="date" name="date_of_birth" value={registerData.date_of_birth} onChange={handleChange} required className="w-full h-12 pl-11 pr-10 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white cursor-pointer" />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Address</label>
                    <div className="relative">
                        <input type="text" name="permanent_address" value={registerData.permanent_address} onChange={handleChange} required placeholder="123 Main Street" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">City</label>
                    <div className="relative">
                        <input type="text" name="city" value={registerData.city} onChange={handleChange} required placeholder="New York" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Country</label>
                    <div className="relative">
                        <input type="text" name="country" value={registerData.country} onChange={handleChange} required placeholder="United States" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Postal Code</label>
                    <div className="relative">
                        <input type="text" name="postal_code" value={registerData.postal_code} onChange={handleChange} required placeholder="10001" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Password</label>
                    <div className="relative">
                        <input type="password" name="password" value={registerData.password} onChange={handleChange} required placeholder="**********" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white" />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95 cursor-pointer"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </div>
        </form>
    )
}

const Authentication = () => {
    const [activeTab, setActiveTab] = useState("Login")
    const tabs = ["Login", "Register"]

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab)
    }, [])

    return (
        <div className="min-h-screen w-full flex justify-center items-center p-4 sm:p-6 bg-[#F5F7FA]">
            <div className={`w-full ${activeTab === "Login" ? "max-w-md" : "max-w-2xl"} bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-slate-100/80 font-sans transition-all duration-300`}>
                <div className="border-b border-slate-100 mb-6">
                    <div className="flex gap-8 justify-center">
                        {tabs.map((tab) => (
                            <button 
                                key={tab} 
                                type="button" 
                                onClick={() => handleTabChange(tab)} 
                                className={`pb-3 text-sm sm:text-base font-medium transition-all relative cursor-pointer ${activeTab === tab ? 'text-[#1814F3]' : 'text-[#718EBF] hover:text-[#232323]'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1814F3] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    {activeTab === "Login" && <LoginTab />}
                    {activeTab === "Register" && <RegisterTab />}
                </div>
            </div>
        </div>
    )
}

export default Authentication
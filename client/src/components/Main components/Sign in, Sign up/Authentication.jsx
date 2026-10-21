import { useState } from "react"
import { ChevronDown, Mail, Lock, User, Calendar, MapPin, Building, Globe, Hash } from "lucide-react"
import api from "../../../api/axios"

const LoginTab = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.post('login/', loginData)
            location.replace('/dashboard')
        } catch (e){
            console.log(e || "failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-normal">Email</label>
                <div className="relative">
                    <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="johndoe@example.com" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-[#232323] text-sm font-normal">Password</label>
                <div className="relative">
                    <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="**********" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <button type="submit" className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                    Sign In
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('users/', registerData);
            console.log('Created user:', response.data);
            location.reload()
        } catch (err) {
            setError(JSON.stringify(err.response?.data || 'Registration failed'));
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Username</label>
                    <div className="relative">
                        <input type="text" name="username" value={registerData.username} onChange={handleChange} placeholder="johndoe" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Email</label>
                    <div className="relative">
                        <input type="email" name="email" value={registerData.email} onChange={handleChange} placeholder="johndoe@example.com" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">First Name</label>
                    <div className="relative">
                        <input type="text" name="first_name" value={registerData.first_name} onChange={handleChange} placeholder="John" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Last Name</label>
                    <div className="relative">
                        <input type="text" name="last_name" value={registerData.last_name} onChange={handleChange} placeholder="Doe" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Date of Birth</label>
                    <div className="relative">
                        <input type="text" name="date_of_birth" value={registerData.date_of_birth} onChange={handleChange} placeholder="1995-08-15" className="w-full h-12 pl-11 pr-10 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white cursor-pointer" />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF] pointer-events-none" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Address</label>
                    <div className="relative">
                        <input type="text" name="permanent_address" value={registerData.address} onChange={handleChange} placeholder="123 Main Street, Apt 4B" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">City</label>
                    <div className="relative">
                        <input type="text" name="city" value={registerData.city} onChange={handleChange} placeholder="New York" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Country</label>
                    <div className="relative">
                        <input type="text" name="country" value={registerData.country} onChange={handleChange} placeholder="United States" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Postal Code</label>
                    <div className="relative">
                        <input type="text" name="postal_code" value={registerData.postal_code} onChange={handleChange} placeholder="10001" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Password</label>
                    <div className="relative">
                        <input type="password" name="password" value={registerData.password} onChange={handleChange} placeholder="**********" className="w-full h-12 pl-11 pr-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#718EBF]" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <button type="submit" className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                    Register
                </button>
            </div>
        </form>
    )
}

const Authentication = () => {
    const [activeTab, setActiveTab] = useState("Login")

    const tabs = ["Login", "Register"]

    return (
        <div className="w-full h-screen flex justify-center items-center p-4 sm:p-6">
            <div className={`w-full ${activeTab === "Login" ? "max-w-md" : "max-w-2xl"} bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-slate-100/80 font-sans transition-all duration-300`}>
                <div className="border-b border-slate-100 mb-6">
                    <div className="flex gap-8 justify-center">
                        {tabs.map((tab) => (
                            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`pb-3 text-sm sm:text-base font-medium transition-all relative ${activeTab === tab ? 'text-[#1814F3]' : 'text-[#718EBF] hover:text-[#232323]'}`}>
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
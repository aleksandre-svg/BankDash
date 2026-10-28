import { useState, useEffect } from "react"
import { Pencil, User } from "lucide-react"
import profilePlaceHolder from "../../../assets/images/profile_placeholder.png"
import { UserContext } from "../../../App.jsx"
import { useContext } from "react"
import api from '../../../api/axios.js'

const EditProfileTab = () => {
    const { currentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)

    useEffect(() => {
        if (currentUser) {
            setFormData(currentUser)
        }
    }, [currentUser])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleProfilePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(e.target.files[0])
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        const data = new FormData()

        Object.keys(formData).forEach(key => {
            if (key !== 'profile_picture' && formData[key] !== null && formData[key] !== undefined) {
                data.append(key, formData[key])
            }
        })

        if (profilePicture instanceof File) {
            data.append('profile_picture', profilePicture)
        }

        try {
            const response = await api.patch('users/me/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setFormData(response.data)
            setSuccess('Profile updated successfully!')
            setProfilePicture(null)
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Update failed"))
        }
    }

    return (
        <form className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12" onSubmit={handleSubmit}>
            <div className="flex justify-center w-full lg:w-auto shrink-0 pt-2">
                <div className="relative">
                    <img 
                        src={profilePicture ? URL.createObjectURL(profilePicture) : (formData?.profile_picture || profilePlaceHolder)}
                        alt="Profile avatar" 
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white shadow-sm" 
                    />
                    <label aria-label="Edit Profile Picture" className="absolute bottom-1 right-1 w-8 h-8 bg-[#1814F3] hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer">
                        <Pencil className="w-3.5 h-3.5" />
                        <input type="file" accept="image/*" className="hidden" name="profile_picture" onChange={handleProfilePictureChange} />
                    </label>
                </div>
            </div>

            <div className="flex-1 w-full space-y-6">
                {success && <p className="text-green-600 text-sm">{success}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">First Name</label>
                        <input type="text" name="first_name" value={formData?.first_name || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Last Name</label>
                        <input type="text" name="last_name" value={formData?.last_name || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">User Name</label>
                        <input type="text" name="username" value={formData?.username || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Email</label>
                        <input type="email" name="email" value={formData?.email || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Date of Birth</label>
                        <div className="relative">
                            <input type="text" name="date_of_birth" value={formData?.date_of_birth || ""} onChange={handleChange} className="w-full h-12 px-4 pr-10 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors bg-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Present Address</label>
                        <input type="text" name="present_address" value={formData?.present_address || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Permanent Address</label>
                        <input type="text" name="permanent_address" value={formData?.permanent_address || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">City</label>
                        <input type="text" name="city" value={formData?.city || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Postal Code</label>
                        <input type="text" name="postal_code" value={formData?.postal_code || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[#232323] text-sm font-normal">Country</label>
                        <input type="text" name="country" value={formData?.country || ""} onChange={handleChange} className="w-full h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                    </div>
                    <div className="flex justify-end md:col-span-2 pt-4">
                        <button type="submit" className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const SecurityTab = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [securityData, setSecurityData] = useState({
        twoFactorAuth: currentUser?.two_factor_authentication || false,
        currentPassword: "",
        newPassword: ""
    })
    
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (currentUser) {
            setSecurityData(prev => ({
                ...prev,
                twoFactorAuth: currentUser.two_factor_authentication || false
            }))
        }
    }, [currentUser])

    const toggleTwoFactor = () => {
        setSecurityData(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSecurityData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        try {
            const response = await api.patch('users/me/', {
                two_factor_authentication: securityData.twoFactorAuth
            })

            setCurrentUser(response.data)

            if (securityData.currentPassword && securityData.newPassword) {
                await api.post('/change-password/', {
                    current_password: securityData.currentPassword,
                    new_password: securityData.newPassword
                })
            }
            
            setSecurityData(prev => ({ ...prev, currentPassword: '', newPassword: '' }))
            setSuccess('Security settings updated successfully!')
        } catch (err) {
            setError(JSON.stringify(err.response?.data || "Security update failed"))
        }
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {success && <p className="text-green-600 text-sm">{success}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className="flex flex-col gap-3">
                <span className="text-[#232323] text-base font-medium">Two-factor Authentication</span>
                <label className="flex items-center gap-4 cursor-pointer select-none">
                    <div onClick={toggleTwoFactor} className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${securityData.twoFactorAuth ? 'bg-[#1814F3]' : 'bg-slate-300'}`}>
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${securityData.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-[#718EBF] text-sm font-normal">Enable or disable two factor authentication</span>
                </label>
            </div>

            <div className="flex flex-col gap-6">
                <span className="text-[#232323] text-base font-medium">Change Password</span>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Current Password</label>
                    <input type="password" name="currentPassword" value={securityData.currentPassword} onChange={handleChange} placeholder="**********" className="w-full max-w-xl h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">New Password</label>
                    <input type="password" name="newPassword" value={securityData.newPassword} onChange={handleChange} placeholder="**********" className="w-full max-w-xl h-12 px-4 rounded-2xl border border-slate-200/80 text-[#718EBF] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95">
                    Save
                </button>
            </div>
        </form>
    )
}


const UserSettingsContainer = () => {
    const [activeTab, setActiveTab] = useState("Edit Profile")


    const tabs = ["Edit Profile", "Security"]

    return (
        <div className="w-[95%] bg-white rounded-[28px] p-6 sm:p-8 shadow-sm border border-slate-100/80 font-sans m-auto mt-[30px]">
            <div className="border-b border-slate-100 mb-8">
                <div className="flex gap-8 sm:gap-12">
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

            <div className="mb-8">
                {activeTab === "Edit Profile" && <EditProfileTab />}
                {activeTab === "Security" && <SecurityTab />}
            </div>
        </div>
    )
}

export default UserSettingsContainer
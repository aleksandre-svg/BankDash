import { useState, useEffect, useContext } from 'react'
import { Pencil } from 'lucide-react'
import { UserContext } from '../../../App.jsx'
import profilePlaceHolder from '../../../assets/images/profile_placeholder.png'
import api from '../../../api/axios.js'

const EditProfileTab = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({})
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [loading, setLoading] = useState(false)

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
        if (e.target.files?.[0]) {
            setProfilePicture(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess('')
        setError('')
        setLoading(true)

        const data = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'profile_picture' && value != null) {
                data.append(key, value)
            }
        })

        if (profilePicture instanceof File) {
            data.append('profile_picture', profilePicture)
        }

        try {
            const { data: updatedUser } = await api.patch(
                'users/me/',
                data
            )
            
            setFormData(updatedUser)
            setCurrentUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))

            setSuccess('Profile updated successfully!')
            setProfilePicture(null)
        } catch (err) {
            setError(JSON.stringify(err.response?.data || 'Update failed'))
        } finally {
            setLoading(false)
        }
    }

    const renderInput = (label, name, type = 'text') => (
        <div className="flex flex-col gap-2">
            <label className="text-[#232323] text-sm font-normal">{label}</label>
            <input 
                type={type} 
                name={name} 
                value={formData?.[name] || ""} 
                onChange={handleChange} 
                className="w-full h-12 px-4 rounded-2xl border border-slate-200/85 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
            />
        </div>
    )

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
                {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}
                {error && <p className="text-rose-600 text-sm font-medium">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    {renderInput("First Name", "first_name")}
                    {renderInput("Last Name", "last_name")}
                    {renderInput("User Name", "username")}
                    {renderInput("Email", "email", "email")}
                    {renderInput("Date of Birth", "date_of_birth", "date")}
                    {renderInput("Present Address", "present_address")}
                    {renderInput("Permanent Address", "permanent_address")}
                    {renderInput("City", "city")}
                    {renderInput("Postal Code", "postal_code")}
                    {renderInput("Country", "country")}

                    <div className="flex justify-end md:col-span-2 pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95"
                        >
                            {loading ? 'Saving...' : 'Save'}
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
        twoFactorAuth: false,
        currentPassword: "",
        newPassword: ""
    })
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
        setLoading(true)

        try {
            const { data: updatedUser } = await api.patch('users/me/', {
                two_factor_authentication: securityData.twoFactorAuth
            })
            setCurrentUser(updatedUser)

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
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {success && <p className="text-emerald-600 text-sm font-medium">{success}</p>}
            {error && <p className="text-rose-600 text-sm font-medium">{error}</p>}
            
            <div className="flex flex-col gap-3">
                <span className="text-[#232323] text-base font-medium">Two-factor Authentication</span>
                <label className="flex items-center gap-4 cursor-pointer select-none">
                    <div 
                        role="button"
                        tabIndex={0}
                        onClick={toggleTwoFactor} 
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${securityData.twoFactorAuth ? 'bg-[#1814F3]' : 'bg-slate-300'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${securityData.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-[#718EBF] text-sm font-normal">Enable or disable two factor authentication</span>
                </label>
            </div>

            <div className="flex flex-col gap-6">
                <span className="text-[#232323] text-base font-medium">Change Password</span>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">Current Password</label>
                    <input 
                        type="password" 
                        name="currentPassword" 
                        value={securityData.currentPassword} 
                        onChange={handleChange} 
                        placeholder="**********" 
                        className="w-full max-w-xl h-12 px-4 rounded-2xl border border-slate-200/85 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[#232323] text-sm font-normal">New Password</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={securityData.newPassword} 
                        onChange={handleChange} 
                        placeholder="**********" 
                        className="w-full max-w-xl h-12 px-4 rounded-2xl border border-slate-200/85 text-[#343C6A] text-sm focus:outline-none focus:border-[#1814F3] transition-colors" 
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-12 h-12 bg-[#1814F3] hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-2xl transition-colors duration-150 shadow-sm active:scale-95"
                >
                    {loading ? 'Saving...' : 'Save'}
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
                        <button 
                            key={tab} 
                            type="button" 
                            onClick={() => setActiveTab(tab)} 
                            className={`pb-3 text-sm sm:text-base font-medium transition-all relative ${activeTab === tab ? 'text-[#1814F3]' : 'text-[#718EBF] hover:text-[#232323]'}`}
                        >
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
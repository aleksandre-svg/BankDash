import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/NavBar components/Header"
import NavBar from "./components/NavBar components/NavBar"
import DashboardMain from "./components/Main components/Dashboard/DashboardMain"
import TransactionsMain from "./components/Main components/Transactions/TransactionsMain"
import AccountsMain from "./components/Main components/Accounts/AccountsMain"
import CreditCardsMain from "./components/Main components/Credit Cards/CreditCardsMain"
import SettingsMain from "./components/Main components/Settings/SettingsMain"
import Authentication from "./components/Main components/Sign in, Sign up/Authentication"
import CreditCardDetails from "./components/Main components/Dashboard/Dashboard Components/CreditCards/CreditCardDetails"
import Verification from "./components/Main components/Sign in, Sign up/Verification"
import api from "./api/axios"
import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const App = () => {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const getCurrentUser = async () => {
      if (location.pathname === '/') {
        setAuthLoading(false)
        return
      }
      try {
        const response = await api.get('users/me/')
        setCurrentUser(response.data)
      } catch (err) {
        console.error("Failed to fetch user context", err)
      } finally {
        setAuthLoading(false)
      }
    }

    getCurrentUser()
  }, [location.pathname])

  const formatTitle = (path) => {
    const rawPath = path.split('/')[1] || 'Dashboard'
    return rawPath.replaceAll('-', ' ')
  }

  if (authLoading && location.pathname !== '/') {
    return (
      <div className="w-full h-screen bg-[#F5F7FA] flex items-center justify-center">
        <p className="text-[#718EBF] font-medium">Loading session...</p>
      </div>
    )
  }

  console.log(location.pathname)

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <main className={`w-full min-h-screen bg-[#F5F7FA] ${location.pathname === '/' ? '' : "pl-[240px]"}`}>
        {Location.pathname !== '/' && location.pathname !== '/verification' ? (
          <>
            <Header pageTitle={formatTitle(location.pathname)} />
            <NavBar />
          </>
        ) : null}
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/transactions" element={<TransactionsMain />} />
          <Route path="/accounts" element={<AccountsMain />} />
          <Route path="/credit-cards" element={<CreditCardsMain />} />
          <Route path="/settings" element={<SettingsMain />} />
          <Route path="/credit-cards/:cardId" element={<CreditCardDetails />} />
          <Route path="/verification" element={currentUser && !currentUser.is_email_verified && (
              <Verification onVerified={() => setCurrentUser(prev => ({ ...prev, is_email_verified: true }))} />
          )}/>
        </Routes>
      </main>
    </UserContext.Provider>
  )
}

export default App
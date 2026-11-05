import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import api from "./api/axios"

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
import ProtectedRoute from "./components/ProtectedRoute"

export const UserContext = createContext()

const PUBLIC_ROUTES = ['/', '/verification']

const App = () => {
  const { pathname } = useLocation()
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [authLoading, setAuthLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    api.get('get-csrf/')
      .then(res => {
        if (res.data.csrfToken) {
          localStorage.setItem('csrftoken', res.data.csrfToken);
        }
      })
      .catch(err => console.error("Failed to fetch CSRF token", err));
  }, [])

  const isPublicRoute = useMemo(() => PUBLIC_ROUTES.includes(pathname), [pathname])

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true)
  }, [])

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  useEffect(() => {
    let isMounted = true

    const getCurrentUser = async () => {
      if (isPublicRoute) {
        if (isMounted) setAuthLoading(false)
        return
      }
      try {
        const { data } = await api.get('users/me/')
        if (isMounted) setCurrentUser(data)
      } catch (err) {
        console.error("Failed to fetch user context", err)
      } finally {
        if (isMounted) setAuthLoading(false)
      }
    }

    getCurrentUser()
    return () => { isMounted = false }
  }, [pathname, isPublicRoute])

  const formatTitle = useCallback((path) => {
    const rawPath = path.split('/')[1] || 'Dashboard'
    return rawPath.replace(/-/g, ' ')
  }, [])

  const userContextValue = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser])

  if (authLoading && !isPublicRoute) {
    return (
      <div className="w-full h-screen bg-[#F5F7FA] flex items-center justify-center">
        <p className="text-[#718EBF] font-medium">Loading session...</p>
      </div>
    )
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <div className="w-full min-h-screen bg-[#F5F7FA] font-sans flex">
        {!isPublicRoute && (
          <NavBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        )}
        
        <div className={`flex-1 flex flex-col w-full min-w-0 transition-all ${
          !isPublicRoute ? 'lg:ml-[280px]' : ''
        }`}>
          {!isPublicRoute &&  (
            <Header 
              pageTitle={formatTitle(pathname)} 
              onOpenSidebar={handleOpenSidebar} 
            />
          )}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardMain /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><TransactionsMain /></ProtectedRoute>} />
              <Route path="/accounts" element={<ProtectedRoute><AccountsMain /></ProtectedRoute>} />
              <Route path="/credit-cards" element={<ProtectedRoute><CreditCardsMain /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsMain /></ProtectedRoute>} />
              <Route path="/credit-cards/:cardId" element={<ProtectedRoute><CreditCardDetails /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
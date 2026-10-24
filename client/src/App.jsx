import { Routes, Route } from "react-router-dom"
import Header from "./components/NavBar components/Header"
import NavBar from "./components/NavBar components/NavBar"
import DashboardMain from "./components/Main components/Dashboard/DashboardMain"
import TransactionsMain from "./components/Main components/Transactions/TransactionsMain"
import AccountsMain from "./components/Main components/Accounts/AccountsMain"
import CreditCardsMain from "./components/Main components/Credit Cards/CreditCardsMain"
import SettingsMain from "./components/Main components/Settings/SettingsMain"
import Authentication from "./components/Main components/Sign in, Sign up/Authentication"
import { useLocation } from "react-router-dom"
import api from "./api/axios"
import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

const App = () => {
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState()

  const getCurrentUser = async () => {
    const response = await api.get('users/me/')

    setCurrentUser(response.data)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])


  return (
    <>
        <main className={`w-full min-h-screen bg-[#F5F7FA] ${location.pathname === '/' ? '' : "ml-[240px]"}`}>
            <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {
              location.pathname === '/' ? null : <>
                <Header pageTitle={location.pathname.slice(1).replaceAll('-', ' ')}/>
                <NavBar/>
              </>
            }
            <Routes>
              <Route path="/" element={<Authentication/>}/>
              <Route path="/dashboard" element={<DashboardMain/>}/>
              <Route path="/transactions" element={<TransactionsMain/>}/>
              <Route path="/accounts" element={<AccountsMain/>}/>
              <Route path="/credit-cards" element={<CreditCardsMain/>}/>
              <Route path="/settings" element={<SettingsMain/>}/>
            </Routes> 
          </UserContext.Provider>
        </main>
    </>
  )
}

export default App
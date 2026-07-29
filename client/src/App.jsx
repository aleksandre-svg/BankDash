import { Routes, Route } from "react-router-dom"
import Header from "./components/NavBar components/Header"
import NavBar from "./components/NavBar components/NavBar"
import DashboardMain from "./components/Main components/Dashboard/DashboardMain"
import TransactionsMain from "./components/Main components/Transactions/TransactionsMain"

const App = () => {
  const routes = [
        {
            title: "Accounts",
            route: "/accounts"
        },
        {
            title: "Investments",
            route: "/investments",
        },
        {
            title: "Credit Cards",
            route: "/credit-cards",
        },
        {
            title: "Loans",
            route: "/loans",
        },
        {
            title: "Services",
            route: "/services",
        },
        {
            title: "My Privileges",
            route: "/privileges",
        },
        {
            title: "Settings",
            route: "/settings",
        }
    ]

  return (
    <>
        <NavBar/>
        <main className="w-full h-full bg-[#F5F7FA] ml-[280px]">
          <Header pageTitle={'overview'}/>
          <Routes>
            <Route path="/" element={<DashboardMain/>}/>
            <Route path="/transactions" element={<TransactionsMain/>}/>
            {
              routes.map((routeInfo) => (
                <Route path={routeInfo.route} element={
                  <h1>{routeInfo.title}</h1>
                } />
              ))
            }
          </Routes> 
        </main>
    </>
  )
}

export default App
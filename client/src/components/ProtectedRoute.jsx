import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../App'

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext)

    if (!currentUser) {
        return <Navigate to="/" replace />
    }

    if (currentUser.two_factor_authentication && !currentUser.is_email_verified){
        return <Navigate to="/verification" replace />
    }

    return children
}

export default ProtectedRoute
import { useContext } from 'react'
import { AuthContext, AuthContextDataProps } from '../contexts/Auth'


function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext)
    return context
}
export default useAuth;
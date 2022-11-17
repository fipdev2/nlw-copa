import { createContext, ReactNode, useReducer } from "react";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { api } from "../services/api";


WebBrowser.maybeCompleteAuthSession();

interface userProps {
    name: string
    avatarUrl: string
    sub: string
}

export interface AuthContextDataProps {
    user: userProps
    signIn: () => Promise<void>
    isUserLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}
export const AuthContext = createContext({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = React.useState({} as userProps)
    const [isUserLoading, setIsUserLoading] = React.useState(false)

    const [request, response, prompAsync] = Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']

    })
    async function signIn() {
        try {
            setIsUserLoading(true);
            await prompAsync();
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            setIsUserLoading(false);
        }
    }
    async function signInWithGoogle(accessToken: string) {
        try {
            setIsUserLoading(true);
            const tokenResponse = await api.post('/users', { accessToken })
            console.log(accessToken)
            api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`
            const userInfoResponse = await api.get('/me');
            setUser(userInfoResponse.data.user)

        }
        catch (e) {
            console.log(e);
            throw e;
        }
        finally {
            setIsUserLoading(false);
        }

    }
    React.useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication?.accessToken)
        }
    }, [response])
    return (
        <AuthContext.Provider value={
            {
                isUserLoading,
                signIn,
                user
            }}>
            {children}
        </AuthContext.Provider >
    );
}

export default AuthContextProvider;
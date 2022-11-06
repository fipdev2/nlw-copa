import { createContext, ReactNode, useReducer } from "react";
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';


interface userProps {
    name: string
    avatarUrl: string
}

export interface AuthContextDataProps {
    user: userProps
    signIn: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}
export const AuthContext = createContext({} as AuthContextDataProps);

function AuthContextProvider({ children }: AuthProviderProps) {
    const [isUserLoading, setIsUserLoading] = React.useState(false)

    const [request, response, prompAsync] = Google.useAuthRequest({
        clientId: '392230282637-plosekbnecm7h1qe5ci7hrkrdfhbcoib.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'user']

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
        console.log('token', accessToken)
    }
    React.useEffect(() => {
        if (response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication?.accessToken)
        }
    }, [])
    return (
        <AuthContext.Provider value={
            {
                signIn,
                user: {
                    name: 'Blabla',
                    avatarUrl: ''
                }
            }}>
            {children}
        </AuthContext.Provider >
    );
}

export default AuthContextProvider;
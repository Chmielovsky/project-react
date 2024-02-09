// src/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const logIn = () => setIsLoggedIn(true);
    const logOut = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
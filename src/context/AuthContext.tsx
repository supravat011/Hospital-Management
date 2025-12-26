import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email?: string;
    patientId?: string;
    doctorId?: string;
    mobileNumber?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    userRole: 'patient' | 'doctor' | null;
    login: (token: string, user: User, role: 'patient' | 'doctor') => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);

    useEffect(() => {
        // Load from localStorage on mount
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('userRole');

        if (storedToken && storedUser && storedRole) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setUserRole(storedRole as 'patient' | 'doctor');
        }
    }, []);

    const login = (newToken: string, newUser: User, role: 'patient' | 'doctor') => {
        setToken(newToken);
        setUser(newUser);
        setUserRole(role);

        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setUserRole(null);

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
    };

    const value = {
        user,
        token,
        userRole,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

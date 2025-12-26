import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'doctor' | 'patient' | 'staff' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospitalId?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User> = {
  'doctor@hospital.com': {
    id: 'd1',
    name: 'Dr. Rajesh Kumar',
    email: 'doctor@hospital.com',
    role: 'doctor',
    hospitalId: '1',
  },
  'patient@email.com': {
    id: 'p1',
    name: 'Priya Sharma',
    email: 'patient@email.com',
    role: 'patient',
    hospitalId: '1',
  },
  'staff@hospital.com': {
    id: 's1',
    name: 'Anitha Devi',
    email: 'staff@hospital.com',
    role: 'staff',
    hospitalId: '1',
  },
  'admin@system.com': {
    id: 'a1',
    name: 'System Admin',
    email: 'admin@system.com',
    role: 'admin',
  },
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, accept any email/password with correct format
    if (email && password.length >= 4) {
      const mockUser = mockUsers[email] || {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email,
        role,
      };
      mockUser.role = role;
      setUser(mockUser);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

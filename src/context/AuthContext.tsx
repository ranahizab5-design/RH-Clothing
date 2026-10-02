import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  demoLogin: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const DEMO_USER: UserProfile = {
  id: 'usr_rh_982',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 349-8201',
  tier: 'RH Circle Gold',
  points: 1450,
  defaultAddress: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 349-8201',
    country: 'US',
    address: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'OR',
    postalCode: '97477',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('rh_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEMO_USER; // Default to active session for preview convenience
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rh_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rh_user');
      }
    } catch {
      // ignore
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    const loggedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      email,
      tier: 'RH Circle Silver',
      points: 250,
    };
    setUser(loggedUser);
    return true;
  };

  const register = async (name: string, email: string): Promise<boolean> => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      tier: 'RH Circle Silver',
      points: 500, // welcome bonus points
    };
    setUser(newUser);
    return true;
  };

  const demoLogin = () => {
    setUser(DEMO_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        demoLogin,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

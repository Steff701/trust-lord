import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as AppUser } from 'types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUser({createdAt: new Date(), email: "", phone: "", id: 'mock-tenant-id', role: 'tenant' }); // Hardcode tenant for now
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
  {children}
  </AuthContext.Provider>
);
}

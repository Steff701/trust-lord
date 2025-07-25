import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as AppUser } from 'types';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (role: 'tenant' | 'landlord', profileData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
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
    // Initially, no user is signed in
    setLoading(false);
  }, []);

  const signIn = async (role: 'tenant' | 'landlord', profileData: any) => {
    setLoading(true);
    // Simulate sign-in process
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser: AppUser = {
      uid: `mock-${role}-id-${Date.now()}`,
      email: profileData.email || '',
      phoneNumber: profileData.phoneNumber,
      displayName: `${profileData.firstName} ${profileData.lastName}`,
      photoURL: '',
      emailVerified: false,
      phoneVerified: true,
      identityVerified: role === 'landlord' && !!profileData.idNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      roles: [role],
      preferences: {
        language: 'en',
        currency: 'UGX',
        notifications: {},
        preferredPaymentMethods: [],
        timezone: 'Africa/Kampala',
        theme: 'light',
      },
      contactMethods: [],
      profile: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        idNumber: profileData.idNumber || undefined,
        idType: profileData.idType || undefined,
      },
    };

    setUser(newUser);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

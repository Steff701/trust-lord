import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User as AppUser, UserProfile, UserRole } from 'types/user';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (role: UserRole, profileData: Partial<UserProfile> & { phoneNumber: string; email?: string }) => Promise<void>;
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

  const signIn = async (role: UserRole, profileData: Partial<UserProfile> & { phoneNumber: string; email?: string }) => {
    setLoading(true);
    // Simulate sign-in process
    await new Promise(resolve => setTimeout(resolve, 500));

    const userProfile: UserProfile = {
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      email: profileData.email || undefined,
      idNumber: profileData.idNumber || undefined,
      idType: profileData.idType || undefined,
    };

    const newUser: AppUser = {
      uid: `mock-${role}-id-${Date.now()}`,
      email: profileData.email || undefined,
      phoneNumber: profileData.phoneNumber,
      displayName: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
      photoURL: undefined,
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
        notifications: {
          email: true,
          sms: true,
          push: true,
          whatsapp: true,
          paymentReminders: true,
          leaseUpdates: true,
          propertyUpdates: true,
          marketing: false,
        },
        preferredPaymentMethods: [],
        timezone: 'Africa/Kampala',
        theme: 'light',
      },
      contactMethods: [
        { type: 'phone', value: profileData.phoneNumber, isPrimary: true, isVerified: true, country: 'UG' },
        ...(profileData.email ? [{ type: 'email', value: profileData.email, isPrimary: false, isVerified: false, country: 'UG' }] : []),
      ],
      profile: userProfile,
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

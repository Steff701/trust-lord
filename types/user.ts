export interface User {
  uid: string;
  email?: string;
  phoneNumber: string;
  displayName?: string;
  photoURL?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
  isActive: boolean;
  roles: UserRole[];
  preferences: UserPreferences;
  contactMethods: ContactMethod[];
  profile: UserProfile;
}

export interface Landlord extends User {
  landlordId: string;
  businessName?: string;
  businessRegistration?: string;
  taxId?: string;
  bankDetails?: BankDetails;
  properties: string[]; // Property IDs
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  rating: number;
  reviewCount: number;
  isVerifiedLandlord: boolean;
  landlordSince: Timestamp;
}

export interface Tenant extends User {
  tenantId: string;
  emergencyContact: EmergencyContact;
  employmentInfo?: EmploymentInfo;
  previousAddresses: Address[];
  currentLeases: string[]; // Lease IDs
  leaseHistory: string[]; // Past lease IDs
  paymentScore: number;
  references: Reference[];
  tenantSince: Timestamp;
}

export type UserRole = 'tenant' | 'landlord' | 'admin';

export interface UserPreferences {
  language: 'en' | 'sw';
  currency: 'UGX' | 'KES' | 'RWF';
  notifications: NotificationPreferences;
  preferredPaymentMethods: PaymentMethodType[];
  timezone: string;
  theme: 'light' | 'dark' | 'system';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  whatsapp: boolean;
  paymentReminders: boolean;
  leaseUpdates: boolean;
  propertyUpdates: boolean;
  marketing: boolean;
}

export interface ContactMethod {
  type: 'phone' | 'email' | 'whatsapp';
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
  country: CountryCode;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  dateOfBirth?: Timestamp;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationality?: string;
  idNumber?: string;
  idType?: 'national_id' | 'passport' | 'driving_license';
  address?: Address;
  occupation?: string;
  company?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  swiftCode?: string;
  branchCode?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  address: Address;
}

export interface EmploymentInfo {
  employer: string;
  position: string;
  monthlyIncome: number;
  startDate: Timestamp;
  contactPerson?: string;
  contactPhone?: string;
  address: Address;
}

export interface Reference {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  yearsKnown: number;
}

export type CountryCode = 'UG' | 'KE' | 'RW' | 'TZ';

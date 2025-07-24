export interface User {
  id: string;
  email: string;
  phone: string;
  role: 'tenant' | 'landlord';
  createdAt: Date;
}

export interface Property {
  id: string;
  landlordId: string;
  name: string;
  address: string;
  rentAmount: number;
  currency: 'UGX';
  createdAt: Date;
}

export interface Lease {
  id: string;
  property: Property; // Nested Property object
  tenantId: string;
  landlordId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  status: 'active' | 'expired' | 'terminated';
  qrCode?: string;
  ipfsHash?: string;
  blockchainTxHash?: string;
}

export interface Payment {
  id: string;
  leaseId: string;
  amount: number;
  paymentDate: Date;
  method: 'mobile_money' | 'crypto' | 'cash';
  status: 'pending' | 'confirmed' | 'failed';
  receiptUrl?: string;
  ipfsHash?: string;
  blockchainTxHash?: string;
}
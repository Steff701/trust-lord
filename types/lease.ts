export interface Lease {
  leaseId: string;
  propertyId: string;
  unitId: string;
  landlordId: string;
  tenants: string[]; // Tenant IDs
  terms: LeaseTerms;
  status: LeaseStatus;
  signatures: DigitalSignature[];
  documents: LeaseDocument[];
  payments: LeasePaymentSchedule;
  renewals: LeaseRenewal[];
  violations: LeaseViolation[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  signedAt?: Timestamp;
  activatedAt?: Timestamp;
  terminatedAt?: Timestamp;
  blockchainHash?: string;
  ipfsHash?: string;
}

/**
 * Lease terms and conditions
 */
export interface LeaseTerms {
  startDate: Timestamp;
  endDate: Timestamp;
  duration: number; // in months
  rentAmount: number;
  currency: Currency;
  paymentFrequency: PaymentFrequency;
  paymentDueDate: number; // day of month (1-31)
  securityDeposit: number;
  gracePeriod: number; // days
  lateFee: number;
  lateFeeType: 'fixed' | 'percentage';
  renewalNotice: number; // days before lease end
  terminationNotice: number; // days notice required
  autoRenewal: boolean;
  renewalTerms?: RenewalTerms;
  utilityResponsibility: UtilityResponsibility[];
  maintenanceResponsibility: MaintenanceResponsibility[];
  restrictions: LeaseRestriction[];
  specialClauses: SpecialClause[];
}

export interface DigitalSignature {
  signatureId: string;
  signerId: string;
  signerRole: 'landlord' | 'tenant' | 'witness' | 'guarantor';
  signerName: string;
  signatureData: string; // Base64 encoded signature
  ipAddress?: string;
  deviceInfo?: string;
  signedAt: Timestamp;
  isValid: boolean;
  blockchainTxHash?: string;
}

export interface LeaseDocument {
  documentId: string;
  leaseId: string;
  type: LeaseDocumentType;
  name: string;
  url: string;
  ipfsHash?: string;
  version: number;
  size: number;
  mimeType: string;
  isRequired: boolean;
  isSigned: boolean;
  uploadedBy: string;
  uploadedAt: Timestamp;
  approvedBy?: string;
  approvedAt?: Timestamp;
}

export interface LeasePaymentSchedule {
  scheduleId: string;
  leaseId: string;
  installments: PaymentInstallment[];
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  nextPaymentDue: Timestamp;
  isUpToDate: boolean;
  daysOverdue: number;
}

export interface PaymentInstallment {
  installmentId: string;
  dueDate: Timestamp;
  amount: number;
  type: 'rent' | 'deposit' | 'utilities' | 'fees' | 'penalty';
  description: string;
  isPaid: boolean;
  paidAt?: Timestamp;
  paymentId?: string;
  lateFee?: number;
}

export interface LeaseRenewal {
  renewalId: string;
  leaseId: string;
  proposedBy: string; // User ID
  proposedAt: Timestamp;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  newTerms: Partial<LeaseTerms>;
  reason?: string;
  respondedAt?: Timestamp;
  respondedBy?: string;
  effectiveDate: Timestamp;
}

export interface LeaseViolation {
  violationId: string;
  leaseId: string;
  violationType: ViolationType;
  description: string;
  reportedBy: string;
  reportedAt: Timestamp;
  evidence: ViolationEvidence[];
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  resolution?: string;
  resolvedAt?: Timestamp;
  penalty?: ViolationPenalty;
}

export interface ViolationEvidence {
  evidenceId: string;
  type: 'photo' | 'video' | 'document' | 'witness_statement';
  url: string;
  ipfsHash?: string;
  description: string;
  uploadedAt: Timestamp;
}

export interface ViolationPenalty {
  type: 'warning' | 'fine' | 'termination' | 'deposit_deduction';
  amount?: number;
  description: string;
  dueDate?: Timestamp;
  isPaid?: boolean;
}

export interface RenewalTerms {
  rentIncrease?: number;
  rentIncreaseType: 'fixed' | 'percentage';
  newDuration?: number;
  modifiedClauses?: string[];
}

export interface UtilityResponsibility {
  utility: UtilityType;
  responsibleParty: 'landlord' | 'tenant' | 'shared';
  splitPercentage?: number;
  notes?: string;
}

export interface MaintenanceResponsibility {
  category: MaintenanceCategory;
  responsibleParty: 'landlord' | 'tenant' | 'shared';
  costLimit?: number;
  approvalRequired: boolean;
  responseTime?: number; // hours
}

export interface LeaseRestriction {
  type: RestrictionType;
  description: string;
  penalty?: string;
  isEnforced: boolean;
}

export interface SpecialClause {
  clauseId: string;
  title: string;
  content: string;
  category: 'financial' | 'behavioral' | 'maintenance' | 'termination' | 'other';
  isNegotiable: boolean;
}

export type LeaseStatus =
  | 'draft'
  | 'pending_signatures'
  | 'active'
  | 'expired'
  | 'terminated'
  | 'cancelled'
  | 'breached';

export type PaymentFrequency =
  | 'monthly'
  | 'quarterly'
  | 'semi_annually'
  | 'annually'
  | 'custom';

export type Currency = 'UGX' | 'KES' | 'RWF' | 'USD' | 'EUR';

export type LeaseDocumentType =
  | 'lease_agreement'
  | 'addendum'
  | 'inventory_checklist'
  | 'condition_report'
  | 'guarantor_form'
  | 'insurance_policy'
  | 'receipt'
  | 'notice'
  | 'other';

export type ViolationType =
  | 'late_payment'
  | 'property_damage'
  | 'noise_complaint'
  | 'unauthorized_occupant'
  | 'pets_violation'
  | 'subletting'
  | 'maintenance_neglect'
  | 'lease_breach'
  | 'other';

export type MaintenanceCategory =
  | 'plumbing'
  | 'electrical'
  | 'appliances'
  | 'hvac'
  | 'structural'
  | 'cosmetic'
  | 'exterior'
  | 'emergency';

export type RestrictionType =
  | 'no_pets'
  | 'no_smoking'
  | 'no_subletting'
  | 'guest_limitations'
  | 'noise_restrictions'
  | 'parking_restrictions'
  | 'modification_restrictions';

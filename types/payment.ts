export interface Payment {
  paymentId: string;
  leaseId: string;
  payerId: string; // Tenant ID
  recipientId: string; // Landlord ID
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  reference: string;
  description: string;
  dueDate?: Timestamp;
  initiatedAt: Timestamp;
  completedAt?: Timestamp;
  failedAt?: Timestamp;
  receipt?: PaymentReceipt;
  refund?: PaymentRefund;
  fees: PaymentFee[];
  metadata: PaymentMetadata;
  blockchainTxHash?: string;
  providerTransactionId?: string;
}

/**
 * Payment receipt with blockchain backing
 */
export interface PaymentReceipt {
  receiptId: string;
  paymentId: string;
  receiptNumber: string;
  issuer: ReceiptIssuer;
  recipient: ReceiptRecipient;
  items: ReceiptItem[];
  subtotal: number;
  taxes: Tax[];
  fees: PaymentFee[];
  total: number;
  currency: Currency;
  issuedAt: Timestamp;
  dueDate?: Timestamp;
  paidAt?: Timestamp;
  template: ReceiptTemplate;
  digitalSignature?: string;
  blockchainHash: string;
  ipfsHash: string;
  qrCode: string;
  isImmutable: boolean;
}

export interface PaymentMethod {
  methodId: string;
  type: PaymentMethodType;
  provider: PaymentProvider;
  details: PaymentMethodDetails;
  isDefault: boolean;
  isVerified: boolean;
  isActive: boolean;
  addedAt: Timestamp;
  lastUsedAt?: Timestamp;
  expiryDate?: Timestamp;
  fees: PaymentMethodFee[];
}

export interface MobileMoneyDetails {
  phoneNumber: string;
  accountName: string;
  provider: MobileMoneyProvider;
  country: CountryCode;
  isVerified: boolean;
}

export interface CryptoDetails {
  walletAddress: string;
  currency: CryptoCurrency;
  network: BlockchainNetwork;
  provider: 'bitnob' | 'other';
  isVerified: boolean;
}

export interface BankAccountDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  swiftCode?: string;
  country: CountryCode;
  isVerified: boolean;
}

export interface CashDetails {
  collectionPoint?: string;
  collectorName?: string;
  verificationRequired: boolean;
}

export interface PaymentRefund {
  refundId: string;
  paymentId: string;
  amount: number;
  reason: RefundReason;
  status: RefundStatus;
  requestedBy: string;
  requestedAt: Timestamp;
  processedBy?: string;
  processedAt?: Timestamp;
  refundMethod: PaymentMethodType;
  providerRefundId?: string;
  fees: PaymentFee[];
}

export interface PaymentFee {
  feeId: string;
  type: PaymentFeeType;
  description: string;
  amount: number;
  percentage?: number;
  paidBy: 'payer' | 'recipient' | 'shared';
  provider: string;
}

export interface PaymentMetadata {
  installmentIds?: string[];
  propertyId: string;
  unitId: string;
  paymentPeriod?: {
    startDate: Timestamp;
    endDate: Timestamp;
  };
  exchangeRate?: ExchangeRate;
  geolocation?: GeoCoordinates;
  deviceInfo?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  source: string;
  timestamp: Timestamp;
}

export interface ReceiptIssuer {
  name: string;
  address: Address;
  phoneNumber: string;
  email: string;
  taxId?: string;
  registrationNumber?: string;
  logo?: string;
}

export interface ReceiptRecipient {
  name: string;
  phoneNumber: string;
  email?: string;
  address?: Address;
  tenantId: string;
}

export interface ReceiptItem {
  itemId: string;
  description: string;
  period?: string;
  quantity: number;
  unitPrice: number;
  total: number;
  taxable: boolean;
  category: 'rent' | 'deposit' | 'utilities' | 'fees' | 'penalty' | 'other';
}

export interface Tax {
  type: TaxType;
  name: string;
  rate: number;
  amount: number;
  isInclusive: boolean;
}

export interface ReceiptTemplate {
  templateId: string;
  name: string;
  layout: 'standard' | 'detailed' | 'minimal';
  includeQR: boolean;
  includeLogo: boolean;
  customFields: CustomField[];
  footerText?: string;
}

export interface CustomField {
  fieldId: string;
  label: string;
  value: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  isRequired: boolean;
}

export interface PaymentMethodFee {
  type: PaymentFeeType;
  amount?: number;
  percentage?: number;
  minimum?: number;
  maximum?: number;
  description: string;
}

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export type PaymentMethodType =
  | 'mobile_money'
  | 'crypto'
  | 'bank_transfer'
  | 'cash'
  | 'card';

export type PaymentProvider =
  | 'mtn_momo'
  | 'airtel_money'
  | 'vodacom_mpesa'
  | 'tigo_pesa'
  | 'bitnob'
  | 'binance'
  | 'equity_bank'
  | 'stanbic_bank'
  | 'dfcu_bank'
  | 'cash'
  | 'other';

export type MobileMoneyProvider =
  | 'mtn_momo'
  | 'airtel_money'
  | 'vodacom_mpesa'
  | 'tigo_pesa'
  | 'orange_money';

export type CryptoCurrency =
  | 'BTC'
  | 'USDT'
  | 'USDC'
  | 'ETH'
  | 'BNB';

export type BlockchainNetwork =
  | 'bitcoin'
  | 'ethereum'
  | 'bsc'
  | 'polygon'
  | 'tron';

export type PaymentMethodDetails =
  | MobileMoneyDetails
  | CryptoDetails
  | BankAccountDetails
  | CashDetails;

export type RefundReason =
  | 'duplicate_payment'
  | 'overpayment'
  | 'cancelled_lease'
  | 'early_termination'
  | 'dispute_resolution'
  | 'technical_error'
  | 'other';

export type RefundStatus =
  | 'requested'
  | 'approved'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'rejected';

export type PaymentFeeType =
  | 'transaction_fee'
  | 'processing_fee'
  | 'currency_conversion'
  | 'withdrawal_fee'
  | 'platform_fee'
  | 'late_fee'
  | 'service_charge';

export type TaxType =
  | 'vat'
  | 'withholding_tax'
  | 'service_tax'
  | 'other';

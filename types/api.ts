export interface FirestoreResponse<T> {
  success: boolean;
  data?: T;
  error?: FirestoreError;
  metadata?: FirestoreMetadata;
}

export interface FirestoreError {
  code: FirestoreErrorCode;
  message: string;
  details?: any;
}

export interface FirestoreMetadata {
  hasPendingWrites: boolean;
  fromCache: boolean;
  timestamp: Timestamp;
}

/**
 * Bitnob API types for crypto payments
 */
export interface BitnobPaymentRequest {
  amount: number;
  currency: 'UGX' | 'NGN' | 'KES';
  cryptoCurrency: CryptoCurrency;
  customerEmail: string;
  customerPhone: string;
  reference: string;
  description: string;
  webhookUrl?: string;
  redirectUrl?: string;
}

export interface BitnobPaymentResponse {
  success: boolean;
  data?: BitnobPaymentData;
  error?: BitnobError;
}

export interface BitnobPaymentData {
  paymentId: string;
  reference: string;
  amount: number;
  cryptoAmount: number;
  currency: string;
  cryptoCurrency: CryptoCurrency;
  exchangeRate: number;
  status: BitnobPaymentStatus;
  walletAddress: string;
  qrCode: string;
  paymentUrl: string;
  expiresAt: string;
  createdAt: string;
}

export interface BitnobWebhookPayload {
  event: BitnobEventType;
  data: BitnobPaymentData;
  signature: string;
  timestamp: string;
}

export interface BitnobError {
  code: string;
  message: string;
  field?: string;
}

/**
 * Mobile Money API types
 */
export interface MobileMoneyPaymentRequest {
  provider: MobileMoneyProvider;
  phoneNumber: string;
  amount: number;
  currency: Currency;
  reference: string;
  description: string;
  callbackUrl?: string;
}

export interface MobileMoneyPaymentResponse {
  success: boolean;
  data?: MobileMoneyPaymentData;
  error?: MobileMoneyError;
}

export interface MobileMoneyPaymentData {
  transactionId: string;
  reference: string;
  amount: number;
  currency: Currency;
  phoneNumber: string;
  status: MobileMoneyStatus;
  providerReference?: string;
  fees: number;
  createdAt: string;
  completedAt?: string;
}

export interface MobileMoneyError {
  code: MobileMoneyErrorCode;
  message: string;
  providerCode?: string;
  providerMessage?: string;
}

/**
 * IPFS API types
 */
export interface IPFSUploadRequest {
  file: File | Buffer;
  filename: string;
  metadata?: Record<string, any>;
  pin?: boolean;
}

export interface IPFSUploadResponse {
  success: boolean;
  data?: IPFSUploadData;
  error?: IPFSError;
}

export interface IPFSUploadData {
  hash: string;
  size: number;
  name: string;
  gateway: string;
  pinned: boolean;
  duplicateHash?: string;
}

export interface IPFSError {
  code: string;
  message: string;
  details?: any;
}

/**
 * SMS/Communication API types
 */
export interface SMSRequest {
  to: string;
  message: string;
  sender?: string;
  templateId?: string;
  variables?: Record<string, string>;
}

export interface SMSResponse {
  success: boolean;
  data?: SMSData;
  error?: SMSError;
}

export interface SMSData {
  messageId: string;
  to: string;
  status: SMSStatus;
  cost: number;
  currency: string;
  sentAt: string;
}

export interface SMSError {
  code: string;
  message: string;
}

/**
 * Push notification types
 */
export interface PushNotificationRequest {
  tokens: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
  image?: string;
  sound?: string;
  badge?: number;
  priority?: 'high' | 'normal';
}

export interface PushNotificationResponse {
  success: boolean;
  data?: PushNotificationData;
  error?: PushNotificationError;
}

export interface PushNotificationData {
  successCount: number;
  failureCount: number;
  results: PushNotificationResult[];
}

export interface PushNotificationResult {
  token: string;
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface PushNotificationError {
  code: string;
  message: string;
}

export type FirestoreErrorCode =
  | 'permission-denied'
  | 'not-found'
  | 'already-exists'
  | 'resource-exhausted'
  | 'failed-precondition'
  | 'aborted'
  | 'out-of-range'
  | 'unimplemented'
  | 'internal'
  | 'unavailable'
  | 'data-loss'
  | 'unauthenticated';

export type BitnobPaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'expired'
  | 'cancelled';

export type BitnobEventType =
  | 'payment.created'
  | 'payment.processing'
  | 'payment.completed'
  | 'payment.failed'
  | 'payment.expired';

export type MobileMoneyStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'timeout'
  | 'cancelled';

export type MobileMoneyErrorCode =
  | 'insufficient_funds'
  | 'invalid_phone_number'
  | 'transaction_limit_exceeded'
  | 'provider_error'
  | 'network_error'
  | 'timeout'
  | 'cancelled_by_user';

export type SMSStatus =
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'expired';

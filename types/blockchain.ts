export interface SmartContractLease {
  contractAddress: string;
  leaseId: string;
  landlordAddress: string;
  tenantAddresses: string[];
  propertyHash: string;
  termsHash: string;
  signatureHashes: string[];
  createdBlock: number;
  createdTxHash: string;
  status: ContractStatus;
  gasUsed: number;
  gasPrice: string;
  networkFee: number;
  isActive: boolean;
  lastUpdatedBlock?: number;
  lastUpdatedTxHash?: string;
}

/**
 * Smart contract payment receipt
 */
export interface SmartContractReceipt {
  contractAddress: string;
  receiptId: string;
  paymentId: string;
  leaseId: string;
  amount: string; // Wei format for precision
  currency: string;
  payerAddress: string;
  recipientAddress: string;
  receiptHash: string;
  timestamp: number; // Unix timestamp
  blockNumber: number;
  transactionHash: string;
  gasUsed: number;
  gasPrice: string;
  isConfirmed: boolean;
  confirmations: number;
}

/**
 * IPFS document metadata
 */
export interface IPFSDocument {
  ipfsHash: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  uploadedBy: string;
  uploadedAt: Timestamp;
  pinned: boolean;
  gateway: string;
  encryption?: EncryptionInfo;
  accessControl: AccessControl;
  version: number;
  parentHash?: string; // For document versioning
  metadata: IPFSMetadata;
}

export interface BlockchainHash {
  algorithm: HashAlgorithm;
  hash: string;
  data: string; // Original data that was hashed
  salt?: string;
  timestamp: Timestamp;
  verifiable: boolean;
}

export interface DocumentMetadata {
  documentId: string;
  type: DocumentType;
  category: DocumentCategory;
  title: string;
  description?: string;
  tags: string[];
  owner: string;
  permissions: DocumentPermission[];
  blockchain: BlockchainRecord;
  ipfs: IPFSRecord;
  versions: DocumentVersion[];
  signatures: DocumentSignature[];
  audit: AuditTrail[];
}

export interface BlockchainTransaction {
  txHash: string;
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  gasUsed: number;
  cumulativeGasUsed: number;
  status: TransactionStatus;
  timestamp: number;
  confirmations: number;
  network: BlockchainNetwork;
  nonce: number;
  data?: string;
  logs: TransactionLog[];
}

export interface SmartContractEvent {
  eventId: string;
  contractAddress: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  parameters: EventParameter[];
  timestamp: number;
  isProcessed: boolean;
  relatedRecords: string[]; // Related document/lease IDs
}

export interface EncryptionInfo {
  algorithm: EncryptionAlgorithm;
  keyId: string;
  encryptedBy: string;
  encryptedAt: Timestamp;
  accessKeys: EncryptedAccessKey[];
}

export interface AccessControl {
  owner: string;
  isPublic: boolean;
  allowedUsers: string[];
  allowedRoles: UserRole[];
  permissions: AccessPermission[];
  expiryDate?: Timestamp;
}

export interface IPFSMetadata {
  originalFilename: string;
  uploadSource: 'app' | 'web' | 'api';
  compressionRatio?: number;
  checksum: string;
  duplicateOf?: string; // IPFS hash of duplicate
  linkedDocuments: string[]; // Related document IDs
  externalReferences: ExternalReference[];
}

export interface BlockchainRecord {
  network: BlockchainNetwork;
  contractAddress?: string;
  transactionHash?: string;
  blockNumber?: number;
  hash: string;
  timestamp: Timestamp;
  gasUsed?: number;
  gasPrice?: string;
  isConfirmed: boolean;
}

export interface IPFSRecord {
  hash: string;
  gateway: string;
  pinned: boolean;
  pinnedAt?: Timestamp;
  size: number;
  links: IPFSLink[];
  providers: IPFSProvider[];
}

export interface DocumentVersion {
  version: number;
  ipfsHash: string;
  blockchainHash?: string;
  changes: string[];
  createdBy: string;
  createdAt: Timestamp;
  isActive: boolean;
  parentVersion?: number;
}

export interface DocumentSignature {
  signatureId: string;
  signerId: string;
  signerRole: UserRole;
  signatureData: string;
  algorithm: SignatureAlgorithm;
  timestamp: Timestamp;
  blockchainTxHash?: string;
  isValid: boolean;
  publicKey?: string;
}

export interface DocumentPermission {
  userId: string;
  role: UserRole;
  permissions: PermissionType[];
  grantedBy: string;
  grantedAt: Timestamp;
  expiresAt?: Timestamp;
}

export interface AuditTrail {
  auditId: string;
  action: AuditAction;
  performedBy: string;
  performedAt: Timestamp;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  beforeState?: any;
  afterState?: any;
}

export interface TransactionLog {
  logIndex: number;
  address: string;
  topics: string[];
  data: string;
  blockNumber: number;
  transactionHash: string;
  removed: boolean;
}

export interface EventParameter {
  name: string;
  type: string;
  value: any;
  indexed: boolean;
}

export interface EncryptedAccessKey {
  userId: string;
  encryptedKey: string;
  algorithm: EncryptionAlgorithm;
  createdAt: Timestamp;
}

export interface AccessPermission {
  type: PermissionType;
  granted: boolean;
  conditions?: string[];
}

export interface ExternalReference {
  type: 'url' | 'api' | 'database' | 'file_system';
  reference: string;
  description?: string;
  lastVerified?: Timestamp;
}

export interface IPFSLink {
  name: string;
  hash: string;
  size: number;
  type: 'file' | 'directory';
}

export interface IPFSProvider {
  peerId: string;
  multiaddr: string;
  lastSeen: Timestamp;
  isReliable: boolean;
}

export type ContractStatus =
  | 'deployed'
  | 'active'
  | 'paused'
  | 'terminated'
  | 'error';

export type TransactionStatus =
  | 'pending'
  | 'confirmed'
  | 'failed'
  | 'dropped';

export type HashAlgorithm =
  | 'sha256'
  | 'sha3-256'
  | 'keccak256'
  | 'blake2b';

export type EncryptionAlgorithm =
  | 'aes-256-gcm'
  | 'chacha20-poly1305'
  | 'rsa-oaep';

export type SignatureAlgorithm =
  | 'ecdsa'
  | 'rsa-pss'
  | 'ed25519';

export type DocumentType =
  | 'lease_agreement'
  | 'payment_receipt'
  | 'property_document'
  | 'identity_document'
  | 'financial_document'
  | 'legal_document'
  | 'image'
  | 'other';

export type DocumentCategory =
  | 'legal'
  | 'financial'
  | 'property'
  | 'identity'
  | 'communication'
  | 'system';

export type PermissionType =
  | 'read'
  | 'write'
  | 'delete'
  | 'share'
  | 'sign'
  | 'encrypt'
  | 'decrypt';

export type AuditAction =
  | 'created'
  | 'updated'
  | 'deleted'
  | 'accessed'
  | 'signed'
  | 'encrypted'
  | 'shared'
  | 'downloaded';

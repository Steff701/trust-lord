export interface Property {
  propertyId: string;
  landlordId: string;
  name: string;
  description: string;
  propertyType: PropertyType;
  location: Location;
  units: PropertyUnit[];
  amenities: Amenity[];
  images: PropertyImage[];
  documents: PropertyDocument[];
  rules: PropertyRule[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
  isVerified: boolean;
  totalUnits: number;
  availableUnits: number;
  averageRent: number;
  rating: number;
  reviewCount: number;
}

/**
 * Individual property unit
 */
export interface PropertyUnit {
  unitId: string;
  propertyId: string;
  unitNumber: string;
  unitType: UnitType;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  rent: number;
  deposit: number;
  utilities: UtilityInfo[];
  amenities: Amenity[];
  images: PropertyImage[];
  isAvailable: boolean;
  currentLeaseId?: string;
  nextAvailableDate?: Timestamp;
  floor?: number;
  facing?: 'north' | 'south' | 'east' | 'west';
  furnished: boolean;
  petAllowed: boolean;
}

export interface Location {
  address: Address;
  coordinates: GeoCoordinates;
  neighborhood: string;
  city: string;
  region: string;
  country: CountryCode;
  postalCode?: string;
  landmarks: string[];
  accessibilityNotes?: string;
  transportLinks: TransportLink[];
}

export interface Address {
  street: string;
  building?: string;
  apartment?: string;
  city: string;
  region: string;
  country: CountryCode;
  postalCode?: string;
  formatted: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface TransportLink {
  type: 'bus' | 'taxi' | 'boda' | 'train' | 'matatu';
  name: string;
  distance: number; // in meters
  walkingTime: number; // in minutes
}

export interface PropertyImage {
  imageId: string;
  url: string;
  ipfsHash?: string;
  caption?: string;
  type: 'exterior' | 'interior' | 'amenity' | 'unit' | 'document';
  order: number;
  isMain: boolean;
  uploadedAt: Timestamp;
}

export interface PropertyDocument {
  documentId: string;
  type: PropertyDocumentType;
  name: string;
  url: string;
  ipfsHash?: string;
  size: number;
  mimeType: string;
  isRequired: boolean;
  expiryDate?: Timestamp;
  uploadedAt: Timestamp;
}

export interface Amenity {
  amenityId: string;
  name: string;
  category: AmenityCategory;
  description?: string;
  isIncluded: boolean;
  additionalCost?: number;
  icon?: string;
}

export interface UtilityInfo {
  type: UtilityType;
  isIncluded: boolean;
  cost?: number;
  billingCycle?: 'monthly' | 'quarterly' | 'yearly';
  provider?: string;
}

export interface PropertyRule {
  ruleId: string;
  title: string;
  description: string;
  category: 'pets' | 'smoking' | 'guests' | 'noise' | 'maintenance' | 'general';
  isEnforced: boolean;
  penalty?: string;
}

export type PropertyType =
  | 'apartment'
  | 'house'
  | 'townhouse'
  | 'villa'
  | 'studio'
  | 'room'
  | 'commercial'
  | 'office'
  | 'shop'
  | 'warehouse';

export type UnitType =
  | 'studio'
  | 'one_bedroom'
  | 'two_bedroom'
  | 'three_bedroom'
  | 'four_bedroom'
  | 'five_plus_bedroom'
  | 'bedsitter'
  | 'single_room'
  | 'double_room';

export type PropertyDocumentType =
  | 'title_deed'
  | 'building_permit'
  | 'occupancy_certificate'
  | 'tax_clearance'
  | 'environmental_clearance'
  | 'insurance_policy'
  | 'other';

export type AmenityCategory =
  | 'security'
  | 'parking'
  | 'utilities'
  | 'recreation'
  | 'convenience'
  | 'accessibility'
  | 'outdoor';

export type UtilityType =
  | 'electricity'
  | 'water'
  | 'gas'
  | 'internet'
  | 'cable_tv'
  | 'waste_management'
  | 'security';

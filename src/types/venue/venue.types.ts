// src/types/venue/venue.types.ts
export interface CreateVenueDTO {
  name: string;
  description: string;
  location: string;
  address: string;
  capacity: number;
  price: number;
  images: string[];
  amenities: string[];
  features: string[];
  squareFootage?: number;
  parkingSpaces?: number;
  hasIndoorSpace: boolean;
  hasOutdoorSpace: boolean;
  indoorCapacity?: number;
  outdoorCapacity?: number;
  minimumHours: number;
  setupTime: number;
  cleanupTime: number;
  availableDays: string[];
  depositRequired: number;
  cancellationPolicy: string;
  insuranceRequired: boolean;
  noiseRestrictions?: string;
  allowsExternalCatering: boolean;
  preferredVendors: string[];
  providesSeating: boolean;
  seatingCapacity?: number;
  providesCatering: boolean;
  providesDecor: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// Add this type for updates
export type UpdateVenueDTO = Partial<CreateVenueDTO>;

export interface VenueSearchParams {
  location?: string;
  minCapacity?: number;
  maxPrice?: number;
  hasIndoorSpace?: boolean;
  hasOutdoorSpace?: boolean;
  date?: string;
}

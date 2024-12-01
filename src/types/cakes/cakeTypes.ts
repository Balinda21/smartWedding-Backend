// src/types/cake/cake.types.ts
export interface CreateCakeDTO {
  name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  specialties: string[];
  portfolio: string[];
  priceRange: {
    min: number;
    max: number;
  };
  servingSizes: Record<string, number>;
  flavors: string[];
  fillings: string[];
  designs: string[];
  dietaryOptions: string[];
  leadTime: number;
  available?: boolean;
  tastingPrice?: number;
  deliveryFee?: number;
}

export type UpdateCakeDTO = Partial<CreateCakeDTO>;

// src/types/dj/dj.types.ts
export interface CreateDJDTO {
  name: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  experience: number;
  portfolio: string[];
  price: number;
  packages: {
    name: string;
    price: number;
    hours: number;
    description: string;
    includes: string[];
  }[];
  musicGenres: string[];
  equipment: string[];
  eventTypes: string[];
  setupTime: number;
  performanceTime: number;
  available?: boolean;
}

export type UpdateDJDTO = Partial<CreateDJDTO>;

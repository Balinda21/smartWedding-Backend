export interface Package {
  name: string;
  description: string;
  price: number;
  features: string[];
}

export interface CreatePhotographerDTO {
  name: string;
  email: string;
  phone: string;
  location: string;
  specialties: string[];
  portfolio: string[];
  price: number;
  packages: Package[];
  experience: number;
  bio: string;
}

export type UpdatePhotographerDTO = Partial<CreatePhotographerDTO>;

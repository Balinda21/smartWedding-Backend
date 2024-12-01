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

// src/types/gift/giftTypes.ts
export interface CreateGiftDTO {
  name: string;
  description: string;
  price: number;
  images: string[];
  categories: string[];
  brand?: string;
  stockQuantity: number;
  sku: string;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  isCustomizable?: boolean;
  customization?: {
    options: Array<{
      name: string;
      values: string[];
      priceModifier?: number;
    }>;
  };
  occasion: string[];
  style: string[];
  tags: string[];
  featured?: boolean;
  reviews?: {
    featured: Array<{
      author: string;
      rating: number;
      text: string;
    }>;
  };
}

export type UpdateGiftDTO = Partial<CreateGiftDTO>;

export interface GiftSearchParams {
  minPrice?: string | number;
  maxPrice?: string | number;
  categories?: string | string[];
  occasion?: string | string[];
  style?: string | string[];
  inStock?: string | boolean;
}

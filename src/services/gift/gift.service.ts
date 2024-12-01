// src/services/gift/gift.service.ts
import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import {
  CreateGiftDTO,
  UpdateGiftDTO,
  GiftSearchParams,
} from "../../types/gift/giftTypes";

export class GiftService {
  async createGift(data: CreateGiftDTO) {
    try {
      const gift = await prisma.gift.create({
        data: {
          ...data,
          dimensions: data.dimensions
            ? JSON.stringify(data.dimensions)
            : Prisma.JsonNull,
          customization: data.customization
            ? JSON.stringify(data.customization)
            : Prisma.JsonNull,
          reviews: data.reviews
            ? JSON.stringify(data.reviews)
            : Prisma.JsonNull,
        },
      });

      return {
        status: true,
        message: "Gift created successfully",
        data: {
          ...gift,
          dimensions: gift.dimensions
            ? JSON.parse(gift.dimensions as string)
            : null,
          customization: gift.customization
            ? JSON.parse(gift.customization as string)
            : null,
          reviews: gift.reviews ? JSON.parse(gift.reviews as string) : null,
        },
      };
    } catch (error) {
      console.error("Gift creation error:", error);
      return {
        status: false,
        message: "Failed to create gift",
        data: null,
      };
    }
  }

  async getGifts(searchParams?: GiftSearchParams) {
    try {
      const where: any = {};

      if (searchParams?.minPrice) {
        where.price = {
          ...where.price,
          gte: parseFloat(searchParams.minPrice as string),
        };
      }

      if (searchParams?.maxPrice) {
        where.price = {
          ...where.price,
          lte: parseFloat(searchParams.maxPrice as string),
        };
      }

      if (searchParams?.categories?.length) {
        where.categories = {
          hasEvery: Array.isArray(searchParams.categories)
            ? searchParams.categories
            : [searchParams.categories],
        };
      }

      if (searchParams?.occasion?.length) {
        where.occasion = {
          hasEvery: Array.isArray(searchParams.occasion)
            ? searchParams.occasion
            : [searchParams.occasion],
        };
      }

      if (searchParams?.style?.length) {
        where.style = {
          hasEvery: Array.isArray(searchParams.style)
            ? searchParams.style
            : [searchParams.style],
        };
      }

      if (searchParams?.inStock !== undefined) {
        where.inStock = searchParams.inStock === "true";
      }

      const gifts = await prisma.gift.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });

      return {
        status: true,
        message: "Gifts retrieved successfully",
        data: gifts.map((gift) => ({
          ...gift,
          dimensions: gift.dimensions
            ? JSON.parse(gift.dimensions as string)
            : null,
          customization: gift.customization
            ? JSON.parse(gift.customization as string)
            : null,
          reviews: gift.reviews ? JSON.parse(gift.reviews as string) : null,
        })),
      };
    } catch (error) {
      console.error("Get gifts error:", error);
      return {
        status: false,
        message: "Failed to retrieve gifts",
        data: null,
      };
    }
  }

  async getGiftById(id: number) {
    try {
      const gift = await prisma.gift.findUnique({
        where: { id },
      });

      if (!gift) {
        return {
          status: false,
          message: "Gift not found",
          data: null,
        };
      }

      return {
        status: true,
        message: "Gift retrieved successfully",
        data: {
          ...gift,
          dimensions: gift.dimensions
            ? JSON.parse(gift.dimensions as string)
            : null,
          customization: gift.customization
            ? JSON.parse(gift.customization as string)
            : null,
          reviews: gift.reviews ? JSON.parse(gift.reviews as string) : null,
        },
      };
    } catch (error) {
      console.error("Get gift error:", error);
      return {
        status: false,
        message: "Failed to retrieve gift",
        data: null,
      };
    }
  }

  async updateGift(id: number, data: UpdateGiftDTO) {
    try {
      const existingGift = await prisma.gift.findUnique({
        where: { id },
      });

      if (!existingGift) {
        return {
          status: false,
          message: "Gift not found",
          data: null,
        };
      }

      const updatedData = {
        ...data,
        dimensions: data.dimensions
          ? JSON.stringify(data.dimensions)
          : undefined,
        customization: data.customization
          ? JSON.stringify(data.customization)
          : undefined,
        reviews: data.reviews ? JSON.stringify(data.reviews) : undefined,
      };

      const gift = await prisma.gift.update({
        where: { id },
        data: updatedData as any, // Using type assertion here
      });

      return {
        status: true,
        message: "Gift updated successfully",
        data: {
          ...gift,
          dimensions: gift.dimensions
            ? JSON.parse(gift.dimensions as string)
            : null,
          customization: gift.customization
            ? JSON.parse(gift.customization as string)
            : null,
          reviews: gift.reviews ? JSON.parse(gift.reviews as string) : null,
        },
      };
    } catch (error) {
      console.error("Gift update error:", error);
      return {
        status: false,
        message: "Failed to update gift",
        data: null,
      };
    }
  }

  async deleteGift(id: number) {
    try {
      const existingGift = await prisma.gift.findUnique({
        where: { id },
      });

      if (!existingGift) {
        return {
          status: false,
          message: "Gift not found",
          data: null,
        };
      }

      await prisma.gift.delete({
        where: { id },
      });

      return {
        status: true,
        message: "Gift deleted successfully",
        data: null,
      };
    } catch (error) {
      console.error("Gift deletion error:", error);
      return {
        status: false,
        message: "Failed to delete gift",
        data: null,
      };
    }
  }
}

// src/services/cake/cake.service.ts
import { prisma } from "../../lib/prisma";
import { CreateCakeDTO, UpdateCakeDTO } from "../../types/cakes/cakeTypes";

export class CakeService {
  async createCake(data: CreateCakeDTO) {
    try {
      const cake = await (prisma as any).cake.create({
        data: {
          ...data,
          priceRange: JSON.stringify(data.priceRange),
          servingSizes: JSON.stringify(data.servingSizes),
        },
      });

      return {
        status: true,
        message: "Cake vendor created successfully",
        data: {
          ...cake,
          priceRange: JSON.parse(cake.priceRange as string),
          servingSizes: JSON.parse(cake.servingSizes as string),
        },
      };
    } catch (error) {
      console.error("Cake creation error:", error);
      return {
        status: false,
        message: "Failed to create cake vendor",
        data: null,
      };
    }
  }

  async getAllCakes() {
    try {
      const cakes = await prisma.cake.findMany({
        orderBy: { createdAt: "desc" },
      });
      return {
        status: true,
        message: "Cake vendors retrieved successfully",
        data: cakes.map((cake) => ({
          ...cake,
          priceRange: JSON.parse(cake.priceRange as string),
          servingSizes: JSON.parse(cake.servingSizes as string),
        })),
      };
    } catch (error) {
      console.error("Get cakes error:", error);
      return {
        status: false,
        message: "Failed to retrieve cake vendors",
        data: null,
      };
    }
  }

  async getCakeById(id: number) {
    try {
      const cake = await prisma.cake.findUnique({ where: { id } });

      if (!cake) {
        return {
          status: false,
          message: "Cake vendor not found",
          data: null,
        };
      }

      return {
        status: true,
        message: "Cake vendor retrieved successfully",
        data: {
          ...cake,
          priceRange: JSON.parse(cake.priceRange as string),
          servingSizes: JSON.parse(cake.servingSizes as string),
        },
      };
    } catch (error) {
      console.error("Get cake error:", error);
      return {
        status: false,
        message: "Failed to retrieve cake vendor",
        data: null,
      };
    }
  }

  async updateCake(id: number, data: UpdateCakeDTO) {
    try {
      const existingCake = await prisma.cake.findUnique({ where: { id } });

      if (!existingCake) {
        return {
          status: false,
          message: "Cake vendor not found",
          data: null,
        };
      }

      const updatedData = {
        ...data,
        priceRange: data.priceRange
          ? JSON.stringify(data.priceRange)
          : undefined,
        servingSizes: data.servingSizes
          ? JSON.stringify(data.servingSizes)
          : undefined,
      };

      const cake = await prisma.cake.update({
        where: { id },
        data: updatedData,
      });

      return {
        status: true,
        message: "Cake vendor updated successfully",
        data: {
          ...cake,
          priceRange: JSON.parse(cake.priceRange as string),
          servingSizes: JSON.parse(cake.servingSizes as string),
        },
      };
    } catch (error) {
      console.error("Cake update error:", error);
      return {
        status: false,
        message: "Failed to update cake vendor",
        data: null,
      };
    }
  }

  async deleteCake(id: number) {
    try {
      const existingCake = await prisma.cake.findUnique({ where: { id } });

      if (!existingCake) {
        return {
          status: false,
          message: "Cake vendor not found",
          data: null,
        };
      }

      await prisma.cake.delete({ where: { id } });

      return {
        status: true,
        message: "Cake vendor deleted successfully",
        data: null,
      };
    } catch (error) {
      console.error("Cake deletion error:", error);
      return {
        status: false,
        message: "Failed to delete cake vendor",
        data: null,
      };
    }
  }
}

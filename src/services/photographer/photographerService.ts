// src/services/photographer/photographerService.ts
import { PrismaClient } from "@prisma/client";
import { CreatePhotographerDTO } from "../../types/photographer/photographerTypes";

const prisma = new PrismaClient();

export class PhotographerService {
  async createPhotographer(data: CreatePhotographerDTO) {
    try {
      // @ts-ignore
      const photographer = await prisma.photographer.create({
        data: {
          ...data,
          packages: JSON.stringify(data.packages), // Convert packages array to string
        },
      });

      return {
        status: true,
        message: "Photographer created successfully",
        data: {
          ...photographer,
          packages: JSON.parse(photographer.packages as string), // Parse back to array when returning
        },
      };
    } catch (error) {
      console.error("Photographer creation error:", error);
      return {
        status: false,
        message: "Failed to create photographer",
        data: null,
      };
    }
  }

  async getPhotographers() {
    try {
      // @ts-ignore

      const photographers = await prisma.photographer.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: true,
        message: "Photographers retrieved successfully",
        data: photographers,
      };
    } catch (error) {
      console.error("Get photographers error:", error);
      return {
        status: false,
        message: "Failed to retrieve photographers",
        data: null,
      };
    }
  }

  async getPhotographerById(id: number) {
    try {
      // @ts-ignore

      const photographer = await prisma.photographer.findUnique({
        where: { id },
      });

      if (!photographer) {
        return {
          status: false,
          message: "Photographer not found",
          data: null,
        };
      }

      return {
        status: true,
        message: "Photographer retrieved successfully",
        data: photographer,
      };
    } catch (error) {
      console.error("Get photographer error:", error);
      return {
        status: false,
        message: "Failed to retrieve photographer",
        data: null,
      };
    }
  }
}

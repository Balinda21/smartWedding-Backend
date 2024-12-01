// src/services/photographer/photographerService.ts
import { prisma } from "../../lib/prisma";
import { CreatePhotographerDTO } from "../../types/photographer/photographerTypes";

export class PhotographerService {
  async createPhotographer(data: CreatePhotographerDTO) {
    try {
      const photographer = await prisma.photographer.create({
        data: {
          ...data,
          packages: JSON.stringify(data.packages),
        },
      });

      return {
        status: true,
        message: "Photographer created successfully",
        data: {
          ...photographer,
          packages: JSON.parse(photographer.packages as string),
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
      const photographers = await prisma.photographer.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: true,
        message: "Photographers retrieved successfully",
        data: photographers.map((photographer) => ({
          ...photographer,
          packages: JSON.parse(photographer.packages as string),
        })),
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
        data: {
          ...photographer,
          packages: JSON.parse(photographer.packages as string),
        },
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

  async updatePhotographer(id: number, data: Partial<CreatePhotographerDTO>) {
    try {
      const existingPhotographer = await prisma.photographer.findUnique({
        where: { id },
      });

      if (!existingPhotographer) {
        return {
          status: false,
          message: "Photographer not found",
          data: null,
        };
      }

      const updatedData = {
        ...data,
        packages: data.packages ? JSON.stringify(data.packages) : undefined,
      };

      const photographer = await prisma.photographer.update({
        where: { id },
        data: updatedData,
      });

      return {
        status: true,
        message: "Photographer updated successfully",
        data: {
          ...photographer,
          packages: JSON.parse(photographer.packages as string),
        },
      };
    } catch (error) {
      console.error("Photographer update error:", error);
      return {
        status: false,
        message: "Failed to update photographer",
        data: null,
      };
    }
  }

  async deletePhotographer(id: number) {
    try {
      const existingPhotographer = await prisma.photographer.findUnique({
        where: { id },
      });

      if (!existingPhotographer) {
        return {
          status: false,
          message: "Photographer not found",
          data: null,
        };
      }

      await prisma.photographer.delete({
        where: { id },
      });

      return {
        status: true,
        message: "Photographer deleted successfully",
        data: null,
      };
    } catch (error) {
      console.error("Photographer deletion error:", error);
      return {
        status: false,
        message: "Failed to delete photographer",
        data: null,
      };
    }
  }
}

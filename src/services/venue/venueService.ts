// src/services/venue.service.ts
import { PrismaClient } from "@prisma/client";
import { CreateVenueDTO } from "../../types/venue/venue.types";

const prisma = new PrismaClient();

export class VenueService {
  async createVenue(data: CreateVenueDTO) {
    try {
      // @ts-ignore
      const venue = await prisma.venue.create({
        data,
      });

      return {
        status: true,
        message: "Venue created successfully",
        data: venue,
      };
    } catch (error) {
      console.error("Venue creation error:", error);
      return {
        status: false,
        message: "Failed to create venue",
        data: null,
      };
    }
  }

  async getAllVenues() {
    try {
      // @ts-ignore

      const venues = await prisma.venue.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: true,
        message: "Venues retrieved successfully",
        data: venues,
      };
    } catch (error) {
      console.error("Get all venues error:", error);
      return {
        status: false,
        message: "Failed to retrieve venues",
        data: null,
      };
    }
  }

  async getVenueById(id: number) {
    try {
      // @ts-ignore

      const venue = await prisma.venue.findUnique({
        where: { id },
      });

      if (!venue) {
        return {
          status: false,
          message: "Venue not found",
          data: null,
        };
      }

      return {
        status: true,
        message: "Venue retrieved successfully",
        data: venue,
      };
    } catch (error) {
      console.error("Get venue by ID error:", error);
      return {
        status: false,
        message: "Failed to retrieve venue",
        data: null,
      };
    }
  }
  // @ts-expect-error
  async updateVenue(id: number, data: UpdateVenueDTO) {
    try {
      // @ts-expect-error

      const existingVenue = await prisma.venue.findUnique({
        where: { id },
      });

      if (!existingVenue) {
        return {
          status: false,
          message: "Venue not found",
          data: null,
        };
      }
      // @ts-ignore
      const venue = await prisma.venue.update({
        where: { id },
        data,
      });

      return {
        status: true,
        message: "Venue updated successfully",
        data: venue,
      };
    } catch (error) {
      console.error("Venue update error:", error);
      return {
        status: false,
        message: "Failed to update venue",
        data: null,
      };
    }
  }

  async deleteVenue(id: number) {
    try {
      // @ts-ignore
      const existingVenue = await prisma.venue.findUnique({
        where: { id },
      });

      if (!existingVenue) {
        return {
          status: false,
          message: "Venue not found",
          data: null,
        };
      }
      // @ts-ignore

      await prisma.venue.delete({
        where: { id },
      });

      return {
        status: true,
        message: "Venue deleted successfully",
        data: null,
      };
    } catch (error) {
      console.error("Venue deletion error:", error);
      return {
        status: false,
        message: "Failed to delete venue",
        data: null,
      };
    }
  }
}

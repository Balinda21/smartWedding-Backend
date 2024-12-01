// src/services/venue.service.ts
import { CreateVenueDTO, UpdateVenueDTO } from "../../types/venue/venue.types";
import { prisma } from "../../lib/prisma";

export class VenueService {
  async createVenue(data: CreateVenueDTO) {
    try {
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

  async updateVenue(id: number, data: UpdateVenueDTO) {
    try {
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

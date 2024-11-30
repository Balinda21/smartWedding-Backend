"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class VenueService {
    async createVenue(data) {
        try {
            const venue = await prisma.venue.create({
                data,
            });
            return {
                status: true,
                message: "Venue created successfully",
                data: venue,
            };
        }
        catch (error) {
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
        }
        catch (error) {
            console.error("Get all venues error:", error);
            return {
                status: false,
                message: "Failed to retrieve venues",
                data: null,
            };
        }
    }
    async getVenueById(id) {
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
        }
        catch (error) {
            console.error("Get venue by ID error:", error);
            return {
                status: false,
                message: "Failed to retrieve venue",
                data: null,
            };
        }
    }
    async updateVenue(id, data) {
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
        }
        catch (error) {
            console.error("Venue update error:", error);
            return {
                status: false,
                message: "Failed to update venue",
                data: null,
            };
        }
    }
    async deleteVenue(id) {
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
        }
        catch (error) {
            console.error("Venue deletion error:", error);
            return {
                status: false,
                message: "Failed to delete venue",
                data: null,
            };
        }
    }
}
exports.VenueService = VenueService;
//# sourceMappingURL=venueService.js.map
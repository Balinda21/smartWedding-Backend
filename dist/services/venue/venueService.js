"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueService = void 0;
// src/services/venue.service.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class VenueService {
    createVenue(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const venue = yield prisma.venue.create({
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
        });
    }
    getAllVenues() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const venues = yield prisma.venue.findMany({
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
        });
    }
    getVenueById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const venue = yield prisma.venue.findUnique({
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
        });
    }
    // @ts-ignore
    updateVenue(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const existingVenue = yield prisma.venue.findUnique({
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
                const venue = yield prisma.venue.update({
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
        });
    }
    deleteVenue(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const existingVenue = yield prisma.venue.findUnique({
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
                yield prisma.venue.delete({
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
        });
    }
}
exports.VenueService = VenueService;

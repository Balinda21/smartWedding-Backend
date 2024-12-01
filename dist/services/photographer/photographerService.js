"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotographerService = void 0;
const prisma_1 = require("../../lib/prisma");
class PhotographerService {
    async createPhotographer(data) {
        try {
            const photographer = await prisma_1.prisma.photographer.create({
                data: Object.assign(Object.assign({}, data), { packages: JSON.stringify(data.packages) }),
            });
            return {
                status: true,
                message: "Photographer created successfully",
                data: Object.assign(Object.assign({}, photographer), { packages: JSON.parse(photographer.packages) }),
            };
        }
        catch (error) {
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
            const photographers = await prisma_1.prisma.photographer.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            return {
                status: true,
                message: "Photographers retrieved successfully",
                data: photographers.map((photographer) => (Object.assign(Object.assign({}, photographer), { packages: JSON.parse(photographer.packages) }))),
            };
        }
        catch (error) {
            console.error("Get photographers error:", error);
            return {
                status: false,
                message: "Failed to retrieve photographers",
                data: null,
            };
        }
    }
    async getPhotographerById(id) {
        try {
            const photographer = await prisma_1.prisma.photographer.findUnique({
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
                data: Object.assign(Object.assign({}, photographer), { packages: JSON.parse(photographer.packages) }),
            };
        }
        catch (error) {
            console.error("Get photographer error:", error);
            return {
                status: false,
                message: "Failed to retrieve photographer",
                data: null,
            };
        }
    }
    async updatePhotographer(id, data) {
        try {
            const existingPhotographer = await prisma_1.prisma.photographer.findUnique({
                where: { id },
            });
            if (!existingPhotographer) {
                return {
                    status: false,
                    message: "Photographer not found",
                    data: null,
                };
            }
            const updatedData = Object.assign(Object.assign({}, data), { packages: data.packages ? JSON.stringify(data.packages) : undefined });
            const photographer = await prisma_1.prisma.photographer.update({
                where: { id },
                data: updatedData,
            });
            return {
                status: true,
                message: "Photographer updated successfully",
                data: Object.assign(Object.assign({}, photographer), { packages: JSON.parse(photographer.packages) }),
            };
        }
        catch (error) {
            console.error("Photographer update error:", error);
            return {
                status: false,
                message: "Failed to update photographer",
                data: null,
            };
        }
    }
    async deletePhotographer(id) {
        try {
            const existingPhotographer = await prisma_1.prisma.photographer.findUnique({
                where: { id },
            });
            if (!existingPhotographer) {
                return {
                    status: false,
                    message: "Photographer not found",
                    data: null,
                };
            }
            await prisma_1.prisma.photographer.delete({
                where: { id },
            });
            return {
                status: true,
                message: "Photographer deleted successfully",
                data: null,
            };
        }
        catch (error) {
            console.error("Photographer deletion error:", error);
            return {
                status: false,
                message: "Failed to delete photographer",
                data: null,
            };
        }
    }
}
exports.PhotographerService = PhotographerService;

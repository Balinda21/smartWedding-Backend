"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CakeService = void 0;
// src/services/cake/cake.service.ts
const prisma_1 = require("../../lib/prisma");
class CakeService {
    async createCake(data) {
        try {
            const cake = await prisma_1.prisma.cake.create({
                data: Object.assign(Object.assign({}, data), { priceRange: JSON.stringify(data.priceRange), servingSizes: JSON.stringify(data.servingSizes) }),
            });
            return {
                status: true,
                message: "Cake vendor created successfully",
                data: Object.assign(Object.assign({}, cake), { priceRange: JSON.parse(cake.priceRange), servingSizes: JSON.parse(cake.servingSizes) }),
            };
        }
        catch (error) {
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
            const cakes = await prisma_1.prisma.cake.findMany({
                orderBy: { createdAt: "desc" },
            });
            return {
                status: true,
                message: "Cake vendors retrieved successfully",
                data: cakes.map((cake) => (Object.assign(Object.assign({}, cake), { priceRange: JSON.parse(cake.priceRange), servingSizes: JSON.parse(cake.servingSizes) }))),
            };
        }
        catch (error) {
            console.error("Get cakes error:", error);
            return {
                status: false,
                message: "Failed to retrieve cake vendors",
                data: null,
            };
        }
    }
    async getCakeById(id) {
        try {
            const cake = await prisma_1.prisma.cake.findUnique({ where: { id } });
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
                data: Object.assign(Object.assign({}, cake), { priceRange: JSON.parse(cake.priceRange), servingSizes: JSON.parse(cake.servingSizes) }),
            };
        }
        catch (error) {
            console.error("Get cake error:", error);
            return {
                status: false,
                message: "Failed to retrieve cake vendor",
                data: null,
            };
        }
    }
    async updateCake(id, data) {
        try {
            const existingCake = await prisma_1.prisma.cake.findUnique({ where: { id } });
            if (!existingCake) {
                return {
                    status: false,
                    message: "Cake vendor not found",
                    data: null,
                };
            }
            const updatedData = Object.assign(Object.assign({}, data), { priceRange: data.priceRange
                    ? JSON.stringify(data.priceRange)
                    : undefined, servingSizes: data.servingSizes
                    ? JSON.stringify(data.servingSizes)
                    : undefined });
            const cake = await prisma_1.prisma.cake.update({
                where: { id },
                data: updatedData,
            });
            return {
                status: true,
                message: "Cake vendor updated successfully",
                data: Object.assign(Object.assign({}, cake), { priceRange: JSON.parse(cake.priceRange), servingSizes: JSON.parse(cake.servingSizes) }),
            };
        }
        catch (error) {
            console.error("Cake update error:", error);
            return {
                status: false,
                message: "Failed to update cake vendor",
                data: null,
            };
        }
    }
    async deleteCake(id) {
        try {
            const existingCake = await prisma_1.prisma.cake.findUnique({ where: { id } });
            if (!existingCake) {
                return {
                    status: false,
                    message: "Cake vendor not found",
                    data: null,
                };
            }
            await prisma_1.prisma.cake.delete({ where: { id } });
            return {
                status: true,
                message: "Cake vendor deleted successfully",
                data: null,
            };
        }
        catch (error) {
            console.error("Cake deletion error:", error);
            return {
                status: false,
                message: "Failed to delete cake vendor",
                data: null,
            };
        }
    }
}
exports.CakeService = CakeService;

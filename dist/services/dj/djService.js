"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJService = void 0;
const prisma_1 = require("../../lib/prisma");
class DJService {
    async createDJ(data) {
        try {
            const dj = await prisma_1.prisma.dJ.create({ data });
            return {
                status: true,
                message: "DJ created successfully",
                data: dj,
            };
        }
        catch (error) {
            console.error("DJ creation error:", error);
            return {
                status: false,
                message: "Failed to create DJ",
                data: null,
            };
        }
    }
    async getAllDJs() {
        try {
            const djs = await prisma_1.prisma.dJ.findMany({
                orderBy: { createdAt: "desc" },
            });
            return {
                status: true,
                message: "DJs retrieved successfully",
                data: djs,
            };
        }
        catch (error) {
            console.error("Get DJs error:", error);
            return {
                status: false,
                message: "Failed to retrieve DJs",
                data: null,
            };
        }
    }
    // Add to src/services/dj/dj.service.ts
    async getDJById(id) {
        try {
            const dj = await prisma_1.prisma.dJ.findUnique({ where: { id } });
            if (!dj) {
                return {
                    status: false,
                    message: "DJ not found",
                    data: null,
                };
            }
            return {
                status: true,
                message: "DJ retrieved successfully",
                data: dj,
            };
        }
        catch (error) {
            console.error("Get DJ error:", error);
            return {
                status: false,
                message: "Failed to retrieve DJ",
                data: null,
            };
        }
    }
    async updateDJ(id, data) {
        try {
            const existingDJ = await prisma_1.prisma.dJ.findUnique({ where: { id } });
            if (!existingDJ) {
                return {
                    status: false,
                    message: "DJ not found",
                    data: null,
                };
            }
            const dj = await prisma_1.prisma.dJ.update({
                where: { id },
                data,
            });
            return {
                status: true,
                message: "DJ updated successfully",
                data: dj,
            };
        }
        catch (error) {
            console.error("DJ update error:", error);
            return {
                status: false,
                message: "Failed to update DJ",
                data: null,
            };
        }
    }
    async deleteDJ(id) {
        try {
            const existingDJ = await prisma_1.prisma.dJ.findUnique({ where: { id } });
            if (!existingDJ) {
                return {
                    status: false,
                    message: "DJ not found",
                    data: null,
                };
            }
            await prisma_1.prisma.dJ.delete({ where: { id } });
            return {
                status: true,
                message: "DJ deleted successfully",
                data: null,
            };
        }
        catch (error) {
            console.error("DJ deletion error:", error);
            return {
                status: false,
                message: "Failed to delete DJ",
                data: null,
            };
        }
    }
}
exports.DJService = DJService;

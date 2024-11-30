"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotographerService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PhotographerService {
    async createPhotographer(data) {
        try {
            const photographer = await prisma.photographer.create({
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
}
exports.PhotographerService = PhotographerService;
//# sourceMappingURL=photographerService.js.map
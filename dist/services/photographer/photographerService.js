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
exports.PhotographerService = void 0;
// src/services/photographer/photographerService.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PhotographerService {
    createPhotographer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const photographer = yield prisma.photographer.create({
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
        });
    }
    getPhotographers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const photographers = yield prisma.photographer.findMany({
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
        });
    }
    getPhotographerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const photographer = yield prisma.photographer.findUnique({
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
        });
    }
}
exports.PhotographerService = PhotographerService;

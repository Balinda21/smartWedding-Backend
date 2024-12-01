"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftService = void 0;
// src/services/gift/gift.service.ts
const prisma_1 = require("../../lib/prisma");
const client_1 = require("@prisma/client");
class GiftService {
    async createGift(data) {
        try {
            const gift = await prisma_1.prisma.gift.create({
                data: Object.assign(Object.assign({}, data), { dimensions: data.dimensions
                        ? JSON.stringify(data.dimensions)
                        : client_1.Prisma.JsonNull, customization: data.customization
                        ? JSON.stringify(data.customization)
                        : client_1.Prisma.JsonNull, reviews: data.reviews
                        ? JSON.stringify(data.reviews)
                        : client_1.Prisma.JsonNull }),
            });
            return {
                status: true,
                message: "Gift created successfully",
                data: Object.assign(Object.assign({}, gift), { dimensions: gift.dimensions
                        ? JSON.parse(gift.dimensions)
                        : null, customization: gift.customization
                        ? JSON.parse(gift.customization)
                        : null, reviews: gift.reviews ? JSON.parse(gift.reviews) : null }),
            };
        }
        catch (error) {
            console.error("Gift creation error:", error);
            return {
                status: false,
                message: "Failed to create gift",
                data: null,
            };
        }
    }
    async getGifts(searchParams) {
        var _a, _b, _c;
        try {
            const where = {};
            if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.minPrice) {
                where.price = Object.assign(Object.assign({}, where.price), { gte: parseFloat(searchParams.minPrice) });
            }
            if (searchParams === null || searchParams === void 0 ? void 0 : searchParams.maxPrice) {
                where.price = Object.assign(Object.assign({}, where.price), { lte: parseFloat(searchParams.maxPrice) });
            }
            if ((_a = searchParams === null || searchParams === void 0 ? void 0 : searchParams.categories) === null || _a === void 0 ? void 0 : _a.length) {
                where.categories = {
                    hasEvery: Array.isArray(searchParams.categories)
                        ? searchParams.categories
                        : [searchParams.categories],
                };
            }
            if ((_b = searchParams === null || searchParams === void 0 ? void 0 : searchParams.occasion) === null || _b === void 0 ? void 0 : _b.length) {
                where.occasion = {
                    hasEvery: Array.isArray(searchParams.occasion)
                        ? searchParams.occasion
                        : [searchParams.occasion],
                };
            }
            if ((_c = searchParams === null || searchParams === void 0 ? void 0 : searchParams.style) === null || _c === void 0 ? void 0 : _c.length) {
                where.style = {
                    hasEvery: Array.isArray(searchParams.style)
                        ? searchParams.style
                        : [searchParams.style],
                };
            }
            if ((searchParams === null || searchParams === void 0 ? void 0 : searchParams.inStock) !== undefined) {
                where.inStock = searchParams.inStock === "true";
            }
            const gifts = await prisma_1.prisma.gift.findMany({
                where,
                orderBy: { createdAt: "desc" },
            });
            return {
                status: true,
                message: "Gifts retrieved successfully",
                data: gifts.map((gift) => (Object.assign(Object.assign({}, gift), { dimensions: gift.dimensions
                        ? JSON.parse(gift.dimensions)
                        : null, customization: gift.customization
                        ? JSON.parse(gift.customization)
                        : null, reviews: gift.reviews ? JSON.parse(gift.reviews) : null }))),
            };
        }
        catch (error) {
            console.error("Get gifts error:", error);
            return {
                status: false,
                message: "Failed to retrieve gifts",
                data: null,
            };
        }
    }
    async getGiftById(id) {
        try {
            const gift = await prisma_1.prisma.gift.findUnique({
                where: { id },
            });
            if (!gift) {
                return {
                    status: false,
                    message: "Gift not found",
                    data: null,
                };
            }
            return {
                status: true,
                message: "Gift retrieved successfully",
                data: Object.assign(Object.assign({}, gift), { dimensions: gift.dimensions
                        ? JSON.parse(gift.dimensions)
                        : null, customization: gift.customization
                        ? JSON.parse(gift.customization)
                        : null, reviews: gift.reviews ? JSON.parse(gift.reviews) : null }),
            };
        }
        catch (error) {
            console.error("Get gift error:", error);
            return {
                status: false,
                message: "Failed to retrieve gift",
                data: null,
            };
        }
    }
    async updateGift(id, data) {
        try {
            const existingGift = await prisma_1.prisma.gift.findUnique({
                where: { id },
            });
            if (!existingGift) {
                return {
                    status: false,
                    message: "Gift not found",
                    data: null,
                };
            }
            const updatedData = Object.assign(Object.assign({}, data), { dimensions: data.dimensions
                    ? JSON.stringify(data.dimensions)
                    : undefined, customization: data.customization
                    ? JSON.stringify(data.customization)
                    : undefined, reviews: data.reviews ? JSON.stringify(data.reviews) : undefined });
            const gift = await prisma_1.prisma.gift.update({
                where: { id },
                data: updatedData, // Using type assertion here
            });
            return {
                status: true,
                message: "Gift updated successfully",
                data: Object.assign(Object.assign({}, gift), { dimensions: gift.dimensions
                        ? JSON.parse(gift.dimensions)
                        : null, customization: gift.customization
                        ? JSON.parse(gift.customization)
                        : null, reviews: gift.reviews ? JSON.parse(gift.reviews) : null }),
            };
        }
        catch (error) {
            console.error("Gift update error:", error);
            return {
                status: false,
                message: "Failed to update gift",
                data: null,
            };
        }
    }
    async deleteGift(id) {
        try {
            const existingGift = await prisma_1.prisma.gift.findUnique({
                where: { id },
            });
            if (!existingGift) {
                return {
                    status: false,
                    message: "Gift not found",
                    data: null,
                };
            }
            await prisma_1.prisma.gift.delete({
                where: { id },
            });
            return {
                status: true,
                message: "Gift deleted successfully",
                data: null,
            };
        }
        catch (error) {
            console.error("Gift deletion error:", error);
            return {
                status: false,
                message: "Failed to delete gift",
                data: null,
            };
        }
    }
}
exports.GiftService = GiftService;

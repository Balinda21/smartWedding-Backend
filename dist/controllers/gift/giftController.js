"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftController = void 0;
const gift_service_1 = require("../../services/gift/gift.service"); // Note the file name
class GiftController {
    constructor() {
        this.giftService = new gift_service_1.GiftService();
    }
    async createGift(req, res) {
        const result = await this.giftService.createGift(req.body);
        return res.status(result.status ? 201 : 400).json(result);
    }
    async getGifts(req, res) {
        const result = await this.giftService.getGifts(req.query);
        return res.status(result.status ? 200 : 500).json(result);
    }
    async getGiftById(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.giftService.getGiftById(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async updateGift(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.giftService.updateGift(id, req.body);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async deleteGift(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.giftService.deleteGift(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
}
exports.GiftController = GiftController;

// src/controllers/gift/giftController.ts
import { Request, Response } from "express";
import { GiftService } from "../../services/gift/gift.service"; // Note the file name

export class GiftController {
  private giftService: GiftService;

  constructor() {
    this.giftService = new GiftService();
  }

  async createGift(req: Request, res: Response) {
    const result = await this.giftService.createGift(req.body);
    return res.status(result.status ? 201 : 400).json(result);
  }

  async getGifts(req: Request, res: Response) {
    const result = await this.giftService.getGifts(req.query);
    return res.status(result.status ? 200 : 500).json(result);
  }

  async getGiftById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.giftService.getGiftById(id);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async updateGift(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.giftService.updateGift(id, req.body);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async deleteGift(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.giftService.deleteGift(id);
    return res.status(result.status ? 200 : 404).json(result);
  }
}

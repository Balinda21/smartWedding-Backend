// src/controllers/photographer/photographerController.ts
import { Request, Response, NextFunction } from "express";
import { PhotographerService } from "../../services/photographer/photographerService";

export class PhotographerController {
  private photographerService: PhotographerService;

  constructor() {
    this.photographerService = new PhotographerService();
  }

  async createPhotographer(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.photographerService.createPhotographer(
        req.body
      );
      return res.status(result.status ? 201 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPhotographers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.photographerService.getPhotographers();
      return res.status(result.status ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getPhotographerById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "Invalid photographer ID",
          data: null,
        });
      }

      const result = await this.photographerService.getPhotographerById(id);
      return res.status(result.status ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  }
}

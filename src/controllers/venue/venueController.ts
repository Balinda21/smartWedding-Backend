// src/controllers/venue/venueController.ts
import { Request, Response, NextFunction } from "express";
import { VenueService } from "../../services/venue/venueService";

export class VenueController {
  private venueService: VenueService;

  constructor() {
    this.venueService = new VenueService();
  }

  async createVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.venueService.createVenue(req.body);
      res.status(result.status ? 201 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
  // @ts-ignore
  async getAllVenues(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.venueService.getAllVenues();
      res.status(result.status ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  }
  // @ts-ignore
  async getVenueById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "Invalid venue ID",
          data: null,
        });
      }

      const result = await this.venueService.getVenueById(id);
      return res.status(result.status ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "Invalid venue ID",
          data: null,
        });
      }

      const result = await this.venueService.updateVenue(id, req.body);
      return res.status(result.status ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          status: false,
          message: "Invalid venue ID",
          data: null,
        });
      }

      const result = await this.venueService.deleteVenue(id);
      return res.status(result.status ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  }
}

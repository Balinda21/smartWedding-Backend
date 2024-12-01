import { Request, Response } from "express";
import { DJService } from "../../services/dj/djService";

export class DJController {
  private djService: DJService;

  constructor() {
    this.djService = new DJService();
  }

  async createDJ(req: Request, res: Response) {
    const result = await this.djService.createDJ(req.body);
    return res.status(result.status ? 201 : 400).json(result);
  }

  async getAllDJs(req: Request, res: Response) {
    const result = await this.djService.getAllDJs();
    return res.status(result.status ? 200 : 500).json(result);
  }

  async getDJById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.djService.getDJById(id);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async updateDJ(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.djService.updateDJ(id, req.body);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async deleteDJ(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.djService.deleteDJ(id);
    return res.status(result.status ? 200 : 404).json(result);
  }
}

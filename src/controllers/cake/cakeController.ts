import { Request, Response } from "express";
import { CakeService } from "../../services/cake/cakeService";

export class CakeController {
  private cakeService: CakeService;

  constructor() {
    this.cakeService = new CakeService();
  }

  async createCake(req: Request, res: Response) {
    const result = await this.cakeService.createCake(req.body);
    return res.status(result.status ? 201 : 400).json(result);
  }

  async getAllCakes(req: Request, res: Response) {
    const result = await this.cakeService.getAllCakes();
    return res.status(result.status ? 200 : 500).json(result);
  }

  async getCakeById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.cakeService.getCakeById(id);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async updateCake(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.cakeService.updateCake(id, req.body);
    return res.status(result.status ? 200 : 404).json(result);
  }

  async deleteCake(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const result = await this.cakeService.deleteCake(id);
    return res.status(result.status ? 200 : 404).json(result);
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CakeController = void 0;
const cakeService_1 = require("../../services/cake/cakeService");
class CakeController {
    constructor() {
        this.cakeService = new cakeService_1.CakeService();
    }
    async createCake(req, res) {
        const result = await this.cakeService.createCake(req.body);
        return res.status(result.status ? 201 : 400).json(result);
    }
    async getAllCakes(req, res) {
        const result = await this.cakeService.getAllCakes();
        return res.status(result.status ? 200 : 500).json(result);
    }
    async getCakeById(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.cakeService.getCakeById(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async updateCake(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.cakeService.updateCake(id, req.body);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async deleteCake(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.cakeService.deleteCake(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
}
exports.CakeController = CakeController;

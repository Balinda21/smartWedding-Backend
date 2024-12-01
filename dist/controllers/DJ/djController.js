"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJController = void 0;
const djService_1 = require("../../services/dj/djService");
class DJController {
    constructor() {
        this.djService = new djService_1.DJService();
    }
    async createDJ(req, res) {
        const result = await this.djService.createDJ(req.body);
        return res.status(result.status ? 201 : 400).json(result);
    }
    async getAllDJs(req, res) {
        const result = await this.djService.getAllDJs();
        return res.status(result.status ? 200 : 500).json(result);
    }
    async getDJById(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.djService.getDJById(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async updateDJ(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.djService.updateDJ(id, req.body);
        return res.status(result.status ? 200 : 404).json(result);
    }
    async deleteDJ(req, res) {
        const id = parseInt(req.params.id);
        const result = await this.djService.deleteDJ(id);
        return res.status(result.status ? 200 : 404).json(result);
    }
}
exports.DJController = DJController;

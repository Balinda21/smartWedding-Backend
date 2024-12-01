"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotographerController = void 0;
const photographerService_1 = require("../../services/photographer/photographerService");
class PhotographerController {
    constructor() {
        this.photographerService = new photographerService_1.PhotographerService();
    }
    async createPhotographer(req, res, next) {
        try {
            const result = await this.photographerService.createPhotographer(req.body);
            return res.status(result.status ? 201 : 400).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getPhotographers(req, res, next) {
        try {
            const result = await this.photographerService.getPhotographers();
            return res.status(result.status ? 200 : 400).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getPhotographerById(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PhotographerController = PhotographerController;

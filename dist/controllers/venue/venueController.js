"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const venueService_1 = require("../../services/venue/venueService");
class VenueController {
    constructor() {
        this.venueService = new venueService_1.VenueService();
    }
    async createVenue(req, res, next) {
        try {
            const result = await this.venueService.createVenue(req.body);
            res.status(result.status ? 201 : 400).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getAllVenues(req, res, next) {
        try {
            const result = await this.venueService.getAllVenues();
            res.status(result.status ? 200 : 400).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getVenueById(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async updateVenue(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
    async deleteVenue(req, res, next) {
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VenueController = VenueController;

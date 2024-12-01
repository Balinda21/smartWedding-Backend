"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueController = void 0;
const venueService_1 = require("../../services/venue/venueService");
class VenueController {
    constructor() {
        this.venueService = new venueService_1.VenueService();
    }
    createVenue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.venueService.createVenue(req.body);
                res.status(result.status ? 201 : 400).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    getAllVenues(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.venueService.getAllVenues();
                res.status(result.status ? 200 : 400).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    getVenueById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid venue ID",
                        data: null,
                    });
                }
                const result = yield this.venueService.getVenueById(id);
                return res.status(result.status ? 200 : 404).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    updateVenue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid venue ID",
                        data: null,
                    });
                }
                const result = yield this.venueService.updateVenue(id, req.body);
                return res.status(result.status ? 200 : 404).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    deleteVenue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid venue ID",
                        data: null,
                    });
                }
                const result = yield this.venueService.deleteVenue(id);
                return res.status(result.status ? 200 : 404).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.VenueController = VenueController;

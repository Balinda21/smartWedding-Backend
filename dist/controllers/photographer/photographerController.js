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
exports.PhotographerController = void 0;
const photographerService_1 = require("../../services/photographer/photographerService");
class PhotographerController {
    constructor() {
        this.photographerService = new photographerService_1.PhotographerService();
    }
    // @ts-ignore
    createPhotographer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.photographerService.createPhotographer(req.body);
                return res.status(result.status ? 201 : 400).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    getPhotographers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.photographerService.getPhotographers();
                return res.status(result.status ? 200 : 400).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @ts-ignore
    getPhotographerById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    return res.status(400).json({
                        status: false,
                        message: "Invalid photographer ID",
                        data: null,
                    });
                }
                const result = yield this.photographerService.getPhotographerById(id);
                return res.status(result.status ? 200 : 404).json(result);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PhotographerController = PhotographerController;

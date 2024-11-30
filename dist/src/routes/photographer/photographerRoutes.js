"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photographerController_1 = require("../../controllers/photographer/photographerController");
const router = (0, express_1.Router)();
const photographerController = new photographerController_1.PhotographerController();
router.post('/', photographerController.createPhotographer.bind(photographerController));
router.get('/', photographerController.getPhotographers.bind(photographerController));
router.get('/:id', photographerController.getPhotographerById.bind(photographerController));
exports.default = router;
//# sourceMappingURL=photographerRoutes.js.map
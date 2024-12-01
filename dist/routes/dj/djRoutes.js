"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dj/djRoutes.ts
const express_1 = require("express");
const djController_1 = require("../../controllers/DJ/djController");
const router = (0, express_1.Router)();
const djController = new djController_1.DJController();
router.post("/", djController.createDJ.bind(djController));
router.get("/", djController.getAllDJs.bind(djController));
router.get("/:id", djController.getDJById.bind(djController));
router.put("/:id", djController.updateDJ.bind(djController));
router.delete("/:id", djController.deleteDJ.bind(djController));
exports.default = router;

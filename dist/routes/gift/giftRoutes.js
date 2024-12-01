"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/gift/giftRoutes.ts
const express_1 = require("express");
const giftController_1 = require("../../controllers/gift/giftController");
const router = (0, express_1.Router)();
const giftController = new giftController_1.GiftController();
router.post("/", giftController.createGift.bind(giftController));
router.get("/", giftController.getGifts.bind(giftController));
router.get("/:id", giftController.getGiftById.bind(giftController));
router.put("/:id", giftController.updateGift.bind(giftController));
router.delete("/:id", giftController.deleteGift.bind(giftController));
exports.default = router;

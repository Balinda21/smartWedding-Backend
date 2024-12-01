// src/routes/gift/giftRoutes.ts
import { Router } from "express";
import { GiftController } from "../../controllers/gift/giftController"; 

const router = Router();
const giftController = new GiftController();

router.post("/", giftController.createGift.bind(giftController));
router.get("/", giftController.getGifts.bind(giftController));
router.get("/:id", giftController.getGiftById.bind(giftController));
router.put("/:id", giftController.updateGift.bind(giftController));
router.delete("/:id", giftController.deleteGift.bind(giftController));

export default router;

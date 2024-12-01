// src/routes/dj/djRoutes.ts
import { Router } from "express";
import { DJController } from "../../controllers/DJ/djController";

const router = Router();
const djController = new DJController();

router.post("/", djController.createDJ.bind(djController));
router.get("/", djController.getAllDJs.bind(djController));
router.get("/:id", djController.getDJById.bind(djController));
router.put("/:id", djController.updateDJ.bind(djController));
router.delete("/:id", djController.deleteDJ.bind(djController));

export default router;

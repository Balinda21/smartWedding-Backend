import { Router } from "express";
import { CakeController } from "../../controllers/cake/cakeController";

const router = Router();
const cakeController = new CakeController();

router.post("/", cakeController.createCake.bind(cakeController));
router.get("/", cakeController.getAllCakes.bind(cakeController));
router.get("/:id", cakeController.getCakeById.bind(cakeController));
router.put("/:id", cakeController.updateCake.bind(cakeController));
router.delete("/:id", cakeController.deleteCake.bind(cakeController));

export default router;

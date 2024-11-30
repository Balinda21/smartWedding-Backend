// src/routes/photographer/photographerRoutes.ts
import { Router } from 'express';
import { PhotographerController } from '../../controllers/photographer/photographerController';

const router = Router();
const photographerController = new PhotographerController();

router.post('/', photographerController.createPhotographer.bind(photographerController));
router.get('/', photographerController.getPhotographers.bind(photographerController));
router.get('/:id', photographerController.getPhotographerById.bind(photographerController));

export default router;
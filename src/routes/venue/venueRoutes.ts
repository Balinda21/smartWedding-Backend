// src/routes/venue/venueRoutes.ts
import { Router } from "express";
import { VenueController } from "../../controllers/venue/venueController";

const router = Router();
const venueController = new VenueController();

// Note the order of routes - get all venues comes before get by id
router.get("/", venueController.getAllVenues.bind(venueController)); // Get all venues
router.get("/:id", venueController.getVenueById.bind(venueController));
router.post("/", venueController.createVenue.bind(venueController));
router.put("/:id", venueController.updateVenue.bind(venueController));
router.delete("/:id", venueController.deleteVenue.bind(venueController));

export default router;

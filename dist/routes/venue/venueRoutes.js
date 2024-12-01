"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/venue/venueRoutes.ts
const express_1 = require("express");
const venueController_1 = require("../../controllers/venue/venueController");
const router = (0, express_1.Router)();
const venueController = new venueController_1.VenueController();
// Note the order of routes - get all venues comes before get by id
router.get("/", venueController.getAllVenues.bind(venueController)); // Get all venues
router.get("/:id", venueController.getVenueById.bind(venueController));
router.post("/", venueController.createVenue.bind(venueController));
router.put("/:id", venueController.updateVenue.bind(venueController));
router.delete("/:id", venueController.deleteVenue.bind(venueController));
exports.default = router;

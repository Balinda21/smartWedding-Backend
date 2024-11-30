"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const venueController_1 = require("../../controllers/venue/venueController");
const router = (0, express_1.Router)();
const venueController = new venueController_1.VenueController();
router.get("/", venueController.getAllVenues.bind(venueController));
router.get("/:id", venueController.getVenueById.bind(venueController));
router.post("/", venueController.createVenue.bind(venueController));
router.put("/:id", venueController.updateVenue.bind(venueController));
router.delete("/:id", venueController.deleteVenue.bind(venueController));
exports.default = router;
//# sourceMappingURL=venueRoutes.js.map
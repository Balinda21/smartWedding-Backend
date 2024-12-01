"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const venueRoutes_1 = __importDefault(require("./venue/venueRoutes"));
const photographerRoutes_1 = __importDefault(require("./photographer/photographerRoutes")); // Add this import
const registerRoutes = (app) => {
    // Auth routes
    app.use("/api/auth", authRoutes_1.default);
    // Venue routes
    app.use("/api/venues", venueRoutes_1.default);
    // Photographer routes - Add this
    app.use("/api/photographers", photographerRoutes_1.default);
    // Health check
    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "OK", message: "Server is running" });
    });
};
exports.default = registerRoutes;

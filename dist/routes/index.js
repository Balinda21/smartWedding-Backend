"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const venueRoutes_1 = __importDefault(require("./venue/venueRoutes"));
const photographerRoutes_1 = __importDefault(require("./photographer/photographerRoutes"));
const cakeRoutes_1 = __importDefault(require("./cake/cakeRoutes"));
const djRoutes_1 = __importDefault(require("./dj/djRoutes"));
const giftRoutes_1 = __importDefault(require("./gift/giftRoutes")); // Make sure this path is correct
const registerRoutes = (app) => {
    app.use("/api/gifts", giftRoutes_1.default); // Move this up
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/venues", venueRoutes_1.default);
    app.use("/api/photographers", photographerRoutes_1.default);
    app.use("/api/cakes", cakeRoutes_1.default);
    app.use("/api/djs", djRoutes_1.default); // Move this down
    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "OK", message: "Server is running" });
    });
};
exports.default = registerRoutes;

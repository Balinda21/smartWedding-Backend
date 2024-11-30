"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoutes_1 = __importDefault(require("./auth/authRoutes"));
const venueRoutes_1 = __importDefault(require("./venue/venueRoutes"));
const registerRoutes = (app) => {
    app.use("/api/auth", authRoutes_1.default);
    app.use("/api/venues", venueRoutes_1.default);
    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "OK", message: "Server is running" });
    });
};
exports.default = registerRoutes;
//# sourceMappingURL=index.js.map
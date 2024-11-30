"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    jwt: {
        secret: process.env.JWT_SECRET || "your-secret-key",
        expiresIn: "1d",
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:3000",
        credentials: true,
    },
};
//# sourceMappingURL=config.js.map
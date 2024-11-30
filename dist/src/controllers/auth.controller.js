"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        try {
            const result = await authService.register(req.body);
            if (result.status === "error") {
                return res.status(400).json(result);
            }
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }
    async login(req, res) {
        try {
            const result = await authService.login(req.body);
            if (result.status === "error") {
                return res.status(401).json(result);
            }
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message || "Internal server error",
                data: null,
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
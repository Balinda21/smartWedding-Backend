"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(req, res) {
        try {
            const userData = req.body;
            const result = await this.authService.register(userData);
            return res.status(result.status ? 201 : 400).json(result);
        }
        catch (error) {
            console.error("Registration controller error:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null,
            });
        }
    }
    async login(req, res) {
        var _a;
        try {
            const loginData = req.body;
            const result = await this.authService.login(loginData);
            if (result.status) {
                res.cookie("token", (_a = result.data) === null || _a === void 0 ? void 0 : _a.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 24 * 60 * 60 * 1000,
                });
            }
            return res.status(result.status ? 200 : 401).json(result);
        }
        catch (error) {
            console.error("Login controller error:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                data: null,
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map
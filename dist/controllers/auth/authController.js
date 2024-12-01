"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = req.body;
                const result = yield this.authService.register(userData);
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
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const loginData = req.body;
                const result = yield this.authService.login(loginData);
                if (result.status) {
                    res.cookie("token", (_a = result.data) === null || _a === void 0 ? void 0 : _a.token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 24 * 60 * 60 * 1000, // 24 hours
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
        });
    }
}
exports.AuthController = AuthController;

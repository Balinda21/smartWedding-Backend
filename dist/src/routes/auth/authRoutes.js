"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/auth/authController");
const authService_1 = require("../../services/auth/authService");
const router = (0, express_1.Router)();
const authService = new authService_1.AuthService();
const authController = new authController_1.AuthController(authService);
router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
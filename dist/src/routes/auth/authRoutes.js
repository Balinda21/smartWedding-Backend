"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/authController");
const auth_service_1 = require("../../services/auth.service");
const router = (0, express_1.Router)();
const authService = new auth_service_1.AuthService();
const authController = new authController_1.AuthController(authService);
router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map
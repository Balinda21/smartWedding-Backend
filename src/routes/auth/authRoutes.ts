// src/routes/auth.routes.ts
import { Router } from "express";
import { AuthController } from "../../controllers/auth/authController";
import { AuthService } from "../../services/auth/authService";

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

export default router;

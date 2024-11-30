// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { AuthService } from "../../services/auth/authService";
import { UserRegisterRequest, LoginRequest } from "../../types/auth/user.types";

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const userData: UserRegisterRequest = req.body;
      const result = await this.authService.register(userData);

      return res.status(result.status ? 201 : 400).json(result);
    } catch (error) {
      console.error("Registration controller error:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        data: null,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginRequest = req.body;
      const result = await this.authService.login(loginData);

      if (result.status) {
        res.cookie("token", result.data?.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
      }

      return res.status(result.status ? 200 : 401).json(result);
    } catch (error) {
      console.error("Login controller error:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        data: null,
      });
    }
  }
}

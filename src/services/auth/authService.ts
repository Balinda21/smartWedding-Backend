// src/services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { prisma } from "../../lib/prisma";
import {
  UserRegisterRequest,
  AuthResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/auth/user.types";

export class AuthService {
  async register(data: UserRegisterRequest): Promise<AuthResponse> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return {
          status: false,
          message: "Email already registered",
          data: null,
        };
      }

      const user = await prisma.user.create({
        data: {
          email: data.email,

          password: await bcrypt.hash(data.password, 10),
          name: data.name || null,
        },
      });

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,

          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      const { password: _, ...userWithoutPassword } = user;

      return {
        status: true,
        message: "Registration successful",
        data: {
          user: userWithoutPassword,
          token,
        },
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        status: false,
        message: error instanceof Error ? error.message : "Registration failed",
        data: null,
      };
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        return {
          status: false,
          message: "Invalid credentials",
          reason: "Username",
          data: null,
        };
      }

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) {
        return {
          status: false,
          message: "Invalid credentials",
          reason: "Password",
          data: null,
        };
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,

          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );

      const { password: _, ...userWithoutPassword } = user;

      return {
        status: true,
        message: "Login successful",
        data: {
          user: userWithoutPassword,
          token,
        },
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        status: false,
        message: "Login failed",
        reason: "Error",
        data: null,
      };
    }
  }
}

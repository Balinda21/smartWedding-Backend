// src/services/auth.service.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import {
  UserRegisterRequest,
  AuthResponse,
  LoginRequest,
  LoginResponse,
} from "../../types/auth/user.types";

const prisma = new PrismaClient();

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
          // @ts-ignore

          password: await bcrypt.hash(data.password, 10),
          name: data.name || null,
        },
      });

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          // @ts-ignore

          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
      // @ts-ignore

      const { password: _, ...userWithoutPassword } = user;

      return {
        status: true,
        message: "Registration successful",
        data: {
          // @ts-ignore

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
      // @ts-ignore

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
          // @ts-ignore

          role: user.role,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
      // @ts-ignore

      const { password: _, ...userWithoutPassword } = user;

      return {
        status: true,
        message: "Login successful",
        data: {
          // @ts-ignore

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

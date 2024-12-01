"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/services/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const prisma_1 = require("../../lib/prisma");
class AuthService {
    async register(data) {
        try {
            const existingUser = await prisma_1.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                return {
                    status: false,
                    message: "Email already registered",
                    data: null,
                };
            }
            const user = await prisma_1.prisma.user.create({
                data: {
                    email: data.email,
                    password: await bcryptjs_1.default.hash(data.password, 10),
                    name: data.name || null,
                },
            });
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email,
                role: user.role,
            }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                status: true,
                message: "Registration successful",
                data: {
                    user: userWithoutPassword,
                    token,
                },
            };
        }
        catch (error) {
            console.error("Registration error:", error);
            return {
                status: false,
                message: error instanceof Error ? error.message : "Registration failed",
                data: null,
            };
        }
    }
    async login(data) {
        try {
            const user = await prisma_1.prisma.user.findUnique({
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
            const validPassword = await bcryptjs_1.default.compare(data.password, user.password);
            if (!validPassword) {
                return {
                    status: false,
                    message: "Invalid credentials",
                    reason: "Password",
                    data: null,
                };
            }
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                email: user.email,
                role: user.role,
            }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                status: true,
                message: "Login successful",
                data: {
                    user: userWithoutPassword,
                    token,
                },
            };
        }
        catch (error) {
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
exports.AuthService = AuthService;

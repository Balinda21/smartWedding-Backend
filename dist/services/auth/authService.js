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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const prisma = new client_1.PrismaClient();
class AuthService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield prisma.user.findUnique({
                    where: { email: data.email },
                });
                if (existingUser) {
                    return {
                        status: false,
                        message: "Email already registered",
                        data: null,
                    };
                }
                const user = yield prisma.user.create({
                    data: {
                        email: data.email,
                        // @ts-ignore
                        password: yield bcryptjs_1.default.hash(data.password, 10),
                        name: data.name || null,
                    },
                });
                const token = jsonwebtoken_1.default.sign({
                    userId: user.id,
                    email: user.email,
                    // @ts-ignore
                    role: user.role,
                }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
                // @ts-ignore
                const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
                return {
                    status: true,
                    message: "Registration successful",
                    data: {
                        // @ts-ignore
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
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({
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
                const validPassword = yield bcryptjs_1.default.compare(data.password, user.password);
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
                    // @ts-ignore
                    role: user.role,
                }, config_1.config.jwt.secret, { expiresIn: config_1.config.jwt.expiresIn });
                // @ts-ignore
                const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
                return {
                    status: true,
                    message: "Login successful",
                    data: {
                        // @ts-ignore
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
        });
    }
}
exports.AuthService = AuthService;

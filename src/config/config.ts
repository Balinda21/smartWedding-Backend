// src/config/config.ts
import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "1d",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  },
};

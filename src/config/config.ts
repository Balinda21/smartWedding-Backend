// src/config/config.ts
import { CorsOptions } from "cors";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: "1d",
  },
  cors: {
    origin: [
      "http://localhost:3000", // React dev server
      "https://yourfrontend.com", // Your production frontend
      // Add any other allowed origins
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
    ],
    exposedHeaders: ["set-cookie"],
  } as CorsOptions,
};

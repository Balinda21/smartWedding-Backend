// src/routes/index.ts
import { Express, Request, Response } from "express";
import authRoutes from "./auth/authRoutes";
import venueRoutes from "./venue/venueRoutes";
import photographerRoutes from "./photographer/photographerRoutes";

const registerRoutes = (app: Express) => {
  // Auth routes
  app.use("/api/auth", authRoutes);

  // Venue routes
  app.use("/api/venues", venueRoutes);

  // Photographer routes
  app.use("/api/photographers", photographerRoutes);

  // Health check
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
  });
};

export default registerRoutes;

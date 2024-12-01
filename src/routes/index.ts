// src/routes/index.ts
import { Express, Request, Response } from "express";
import authRoutes from "./auth/authRoutes";
import venueRoutes from "./venue/venueRoutes";
import photographerRoutes from "./photographer/photographerRoutes";
import cakeRoutes from "./cake/cakeRoutes";
import djRoutes from "./dj/djRoutes";
import giftRoutes from "./gift/giftRoutes"; // Make sure this path is correct

const registerRoutes = (app: Express) => {
  app.use("/api/gifts", giftRoutes); // Move this up
  app.use("/api/auth", authRoutes);
  app.use("/api/venues", venueRoutes);
  app.use("/api/photographers", photographerRoutes);
  app.use("/api/cakes", cakeRoutes);
  app.use("/api/djs", djRoutes); // Move this down

  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
  });
};
export default registerRoutes;

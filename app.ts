// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { config } from "./src/config/config";
import swaggerDocument from "./src/config/swagger";
import registerRoutes from "./src/routes";

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(cookieParser());

// Register routes
registerRoutes(app);

// Swagger setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .opblock.opblock-post { background: rgba(73, 204, 144, .1) }
      .swagger-ui .opblock.opblock-post .opblock-summary-method { background: #49cc90 }
      .swagger-ui .opblock.opblock-get { background: rgba(97, 175, 254, .1) }
      .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #61affe }
      .swagger-ui .btn.execute { background-color: #4990e2 }
      .swagger-ui .btn.execute:hover { background-color: #357abd }
      .swagger-ui .opblock-description-wrapper p { color: #3b4151 }
      .swagger-ui .markdown p { color: #3b4151 }
    `,
  })
);

export default app;

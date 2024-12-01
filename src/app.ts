// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { config } from "./config/config";
import swaggerDocument from "./config/swagger";
import registerRoutes from "./routes";

const app = express();

app.use(cors(config.cors));

app.options("*", cors(config.cors));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(cookieParser());
registerRoutes(app);

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

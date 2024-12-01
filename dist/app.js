"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config/config");
const swagger_1 = __importDefault(require("./config/swagger"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)(config_1.config.cors));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Register routes
(0, routes_1.default)(app);
// Swagger setup
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, {
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
}));
exports.default = app;

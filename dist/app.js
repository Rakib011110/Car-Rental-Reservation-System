"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//  application routes
// app.use('/api/v1/);
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// app.get("/", getTest);
// Error handlers (to be created)
const errorHandler_1 = __importDefault(require("../src/app/middlewares/errorHandler"));
const notFoundHandler_1 = __importDefault(require("../src/app/middlewares/notFoundHandler"));
app.use(errorHandler_1.default);
app.use(notFoundHandler_1.default);
// app.use(globalErrorHandler);
// app.use(notFoundError);
exports.default = app;

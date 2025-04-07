"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helpers_1 = require("../utils/helpers");
const authRoutes_1 = require("./routes/authRoutes");
const listRoutes_1 = require("./routes/listRoutes");
const emailTemplateRoutes_1 = require("./routes/emailTemplateRoutes");
const sequenceRoutes_1 = require("./routes/sequenceRoutes");
const agendaService_1 = require("./services/agendaService");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)(), express_1.default.json());
// initiating agena jobs
(0, agendaService_1.initiateAdendaJob)();
// starting agenda 
(0, agendaService_1.startAgenda)();
// 
exports.app.use("/api/auth", authRoutes_1.authRouter);
exports.app.use("/api/lead", listRoutes_1.leadListRouter);
exports.app.use("/api/email-template", emailTemplateRoutes_1.emailTemplateRouter);
exports.app.use("/api/sequence", sequenceRoutes_1.sequenceRouter);
// health Checkup
exports.app.get("/health", (req, res) => {
    res.json((0, helpers_1.createResponse)(true, "server running fine"));
});

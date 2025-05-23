import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "../utils/helpers";
import { authRouter } from "./routes/authRoutes";
import { leadListRouter } from "./routes/listRoutes";
import { emailTemplateRouter } from "./routes/emailTemplateRoutes";
import { sequenceRouter } from "./routes/sequenceRoutes";
import { initiateAdendaJob, startAgenda } from "./services/agendaService";

export const app: Express = express();

app.use(cors(), express.json());

// initiating agena jobs
initiateAdendaJob()
// starting agenda 
startAgenda()
// 
app.use("/api/auth", authRouter)
app.use("/api/lead", leadListRouter)
app.use("/api/email-template", emailTemplateRouter)
app.use("/api/sequence", sequenceRouter)

// health Checkup
app.get("/health", (req, res) => {
   res.json(createResponse(true, "server running fine"));
});
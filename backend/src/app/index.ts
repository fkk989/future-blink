import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "@/utils/helpers";
import { authRouter } from "./routes/authRoutes";
import { leadListRouter } from "./routes/listRoutes";
import { emailTemplateRouter } from "./routes/emailTemplateRoutes";

export const app: Express = express();

app.use(cors(), express.json());


app.use("/api/auth", authRouter)
app.use("/api/lead", leadListRouter)
app.use("/api/email-template", emailTemplateRouter)
// health Checkup
app.get("/health", (req, res) => {
   res.json(createResponse(true, "server running fine"));
});
import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "@/utils/helpers";
import { authRouter } from "./routes/authRoutes";

export const app: Express = express();

app.use(cors(), express.json());


app.use("/api/auth", authRouter)

// health Checkup
app.get("/health", (req, res) => {
   res.json(createResponse(true, "server running fine"));
});
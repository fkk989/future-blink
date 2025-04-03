import express, { Express } from "express";
import cors from "cors";
import { createResponse } from "@/utils/helpers";
import userRouter from "./routes/auth";

export const app: Express = express();

app.use(cors(), express.json());

app.use("/api/auth", userRouter)

// health Checkup
app.get("/health", (req, res) => {
   res.json(createResponse(true, "server running fine"));
});
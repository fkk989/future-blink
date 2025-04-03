import "module-alias/register";
import dotenv from "dotenv";
import { app } from "./app";
import {connectDatabase} from "./config/db"
dotenv.config();; // Load env variables

connectDatabase();
function init() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}

init();
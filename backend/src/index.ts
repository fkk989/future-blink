import "module-alias/register";
import dotenv from "dotenv";
import { app } from "./app";
import { connectDatabase } from "./config/db"
import { verifyMailConnection } from "./config/nodemailer";
import { createDefaultEmailTemplate } from "./utils/helpers";
dotenv.config();; // Load env variables

// verifying db and mail connection
connectDatabase();
verifyMailConnection()
// creating default email templates
createDefaultEmailTemplate()
// 
function init() {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
}

init();
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const db_1 = require("./config/db");
const nodemailer_1 = require("./config/nodemailer");
// import { createDefaultEmailTemplate } from "./utils/helpers";
dotenv_1.default.config();
; // Load env variables
// verifying db and mail connection
(0, db_1.connectDatabase)();
(0, nodemailer_1.verifyMailConnection)();
// creating default email templates
// createDefaultEmailTemplate()
// 
function init() {
    const PORT = process.env.PORT;
    app_1.app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`);
    });
}
init();

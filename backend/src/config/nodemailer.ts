import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()


export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const verifyMailConnection = () => {
    transporter.verify((error, success) => {
        if (error) {
            console.error("Mail server connection failed:", error);
        } else {
            console.log("Mail server is ready to send messages");
        }
    });
}


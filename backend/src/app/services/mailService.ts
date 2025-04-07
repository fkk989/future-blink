import { transporter } from "../../config/nodemailer";
import { SendMailOptions } from "nodemailer";

export const sendMail = async (options: SendMailOptions) => {
    return transporter.sendMail(options);
};

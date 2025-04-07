import { Router } from "express";
import { validate } from "../middleware/validate";
import { verifyUserMiddleware } from "../middleware/verifyUser";
import { createEmailTemplate, deleteEmailTemplate, getEmailTemplate, getEmailTemplateById, updateEmailTemplate } from "../controllers/emailTemplateController";
import { emailTemplateSchema, updateEmailTemplateSchema } from "../../utils/validation/emailTemplate";

export const emailTemplateRouter = Router()

// get user email template
emailTemplateRouter.get("/", verifyUserMiddleware(["USER", "EMPLOYEE"]), getEmailTemplate)
emailTemplateRouter.get("/:id", verifyUserMiddleware(["USER", "EMPLOYEE"]), getEmailTemplateById)

// create email template
emailTemplateRouter.post("/", verifyUserMiddleware(["USER", "EMPLOYEE"]), validate(emailTemplateSchema), createEmailTemplate)
emailTemplateRouter.post("/:id", verifyUserMiddleware(["USER", "EMPLOYEE"]), validate(updateEmailTemplateSchema), updateEmailTemplate)

emailTemplateRouter.delete("/:id", verifyUserMiddleware(["USER", "EMPLOYEE"]), deleteEmailTemplate)
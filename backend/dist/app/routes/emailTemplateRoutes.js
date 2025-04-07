"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplateRouter = void 0;
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const verifyUser_1 = require("../middleware/verifyUser");
const emailTemplateController_1 = require("../controllers/emailTemplateController");
const emailTemplate_1 = require("../../utils/validation/emailTemplate");
exports.emailTemplateRouter = (0, express_1.Router)();
// get user email template
exports.emailTemplateRouter.get("/", (0, verifyUser_1.verifyUserMiddleware)(["USER", "EMPLOYEE"]), emailTemplateController_1.getEmailTemplate);
exports.emailTemplateRouter.get("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER", "EMPLOYEE"]), emailTemplateController_1.getEmailTemplateById);
// create email template
exports.emailTemplateRouter.post("/", (0, verifyUser_1.verifyUserMiddleware)(["USER", "EMPLOYEE"]), (0, validate_1.validate)(emailTemplate_1.emailTemplateSchema), emailTemplateController_1.createEmailTemplate);
exports.emailTemplateRouter.post("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER", "EMPLOYEE"]), (0, validate_1.validate)(emailTemplate_1.updateEmailTemplateSchema), emailTemplateController_1.updateEmailTemplate);
exports.emailTemplateRouter.delete("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER", "EMPLOYEE"]), emailTemplateController_1.deleteEmailTemplate);

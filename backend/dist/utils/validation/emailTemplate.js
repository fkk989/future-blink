"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailTemplateSchema = exports.emailTemplateSchema = void 0;
const zod_1 = require("zod");
exports.emailTemplateSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }).min(1, "name is required"),
    subject: zod_1.z.string({ required_error: "subject is required" }).min(1, "Subject is required").optional(),
    html: zod_1.z.string({ required_error: "html body is required" }).min(1, "HTML content is required").optional(),
    isCompanyTemplate: zod_1.z.boolean().optional(), // since it has a default
});
exports.updateEmailTemplateSchema = exports.emailTemplateSchema.partial();

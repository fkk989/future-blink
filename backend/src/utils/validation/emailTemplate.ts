import { z } from "zod";

export const emailTemplateSchema = z.object({
  name: z.string({ required_error: "name is required" }).min(1, "name is required"),
  subject: z.string({ required_error: "subject is required" }).min(1, "Subject is required"),
  html: z.string({ required_error: "html body is required" }).min(1, "HTML content is required"),
  isCompanyTemplate: z.boolean().optional(), // since it has a default
});

export const updateEmailTemplateSchema = emailTemplateSchema.optional()

export type EmailSchemaType = z.infer<typeof emailTemplateSchema>
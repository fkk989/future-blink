import { User } from "@/models/user";

export type RateLimitPrefix = "email-verification"


export interface EmailTemplateType {
    name: string;
    subject: string;
    html: string;
    mergeTags?: { tag: string, placeholder: string, description: string }[];
}

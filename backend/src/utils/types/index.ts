import { User } from "@/models/user";
import { Request, } from "express";
export type RateLimitPrefix = "email-verification"


export type ROLES = "ADMIN" | "USER" | "EMPLOYEE"


export interface UserTokenType { userId: string, name: string, email: string, role: ROLES }

export interface AuthenticatedRequest<
    Params = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user?: UserTokenType;
}
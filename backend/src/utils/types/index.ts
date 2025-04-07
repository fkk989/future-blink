import { User } from "../../models/user";
import { Request, } from "express";
export type RateLimitPrefix = "email-verification"


export type ROLES = "ADMIN" | "USER" | "EMPLOYEE" | "ALL"


export interface UserTokenType { userId: string, name: string, email: string, role: ROLES }

export interface AuthenticatedRequest<
    Params = {},
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user?: UserTokenType;
}


export type NodeType = "EMAIL" | "DELAY";

export interface SequenceNode {
    type: NodeType;
    order: number;
    emailTemplate?: string; // Optional for DELAY nodes
    delayTimeInMilleseconds?: number;        // Optional for EMAIL nodes
}

export interface Sequence {
    _id?: string;
    scheduledAt: Date;
    leadsList: [string];
    name: string;
    user: string;
    nodes: SequenceNode[];
    createdAt?: Date;
    updatedAt?: Date;
}

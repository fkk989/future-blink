"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceBodySchema = exports.NodeBodySchema = void 0;
const zod_1 = require("zod");
exports.NodeBodySchema = zod_1.z.object({
    leadsList: zod_1.z.array(zod_1.z.string()).min(1, { message: "Please attach a lead list to create a sequence" }),
    scheduledAt: zod_1.z.preprocess((val) => new Date(val), zod_1.z.date()),
    nodes: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.enum(["EMAIL", "DELAY"]),
        emailTemplate: zod_1.z.string().optional(),
        delayTimeInMilleseconds: zod_1.z.number().optional(),
    }), { required_error: "required: { type: EMAIL | DELAY, order: number , emailTemplate: string, delayInMinutes:number }" })
});
exports.SequenceBodySchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }),
});

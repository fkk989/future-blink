"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listInputSchema = exports.leadInputSchema = void 0;
const zod_1 = require("zod");
exports.leadInputSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }).min(1),
});
exports.listInputSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.record(zod_1.z.string()), { required_error: "lead data is required" }),
});

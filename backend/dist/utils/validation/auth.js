"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationSchema = exports.otpSchema = exports.userLoginSchema = exports.userSignupSchema = void 0;
const zod_1 = require("zod");
exports.userSignupSchema = zod_1.z.object({
    name: zod_1.z.string({ "required_error": "Name is required" }).min(2, "Name must be at least 3 characters").max(60),
    email: zod_1.z.string({ "required_error": "Email is required" }).email({ message: "Invalid email syntax" }),
    password: zod_1.z.string({ "required_error": "Password is required" }).min(6, "Password must be at least 6 characters"),
    role: zod_1.z.string().optional()
});
// 
exports.userLoginSchema = exports.userSignupSchema.pick({ email: true, password: true });
exports.otpSchema = exports.userSignupSchema.omit({ password: true });
exports.emailVerificationSchema = zod_1.z.object({
    email: zod_1.z.string({ "required_error": "Email is required" }).email({ message: "Invalid email syntax" }),
    otp: zod_1.z.string({ "required_error": "OTP is required" }).min(6, { message: "OTP should be of 6 digits" }).max(6, { message: "OTP should be of 6 digits" })
});

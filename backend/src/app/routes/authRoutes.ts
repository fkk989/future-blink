import { Router } from "express";
import { login, sendOtp, signup ,verifyEmail} from "../controllers/authController";
import { validate } from "../middleware/validate";
import { emailVerificationSchema, otpSchema, userLoginSchema, userSignupSchema } from "@/utils/validation/auth";

export const authRouter = Router()

authRouter.post("/send-otp", validate(otpSchema), sendOtp)

authRouter.post("/verify-email", validate(emailVerificationSchema), verifyEmail)

authRouter.post("/signup", validate(userSignupSchema), signup)

authRouter.post("/login", validate(userLoginSchema), login)


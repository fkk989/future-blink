import { Router } from "express";
import { login, sendOtp, signup, verifyEmail } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { emailVerificationSchema, otpSchema, userLoginSchema, userSignupSchema } from "../../utils/validation/auth";
import { verifyUserMiddleware } from "../middleware/verifyUser";
import { AuthenticatedRequest } from "../../utils/types";
import { createResponse } from "../../utils/helpers";
import { User } from "../../models/user";

export const authRouter = Router()

authRouter.get("/", verifyUserMiddleware(["ALL"]), async (req: AuthenticatedRequest, res) => {
  const logedUserId = req.user?.userId!
  const user = await User.findById(logedUserId)
  if (!user) {
    res.status(400).json(createResponse(false, "User not found"))
    return
  }

  user.password = ""

  res.status(200).json(createResponse(true, "User Is logedIn", { data: user }))
})

authRouter.post("/send-otp", validate(otpSchema), sendOtp)

authRouter.post("/verify-email", validate(emailVerificationSchema), verifyEmail)

authRouter.post("/signup", validate(userSignupSchema), signup)

authRouter.post("/login", validate(userLoginSchema), login)


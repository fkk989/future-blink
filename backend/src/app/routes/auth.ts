import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { validate } from "../middleware/validate";
import { userLoginSchema, userSignupSchema } from "@/utils/validation/user";

const userRouter = Router()


userRouter.post("/signup", validate(userSignupSchema), signup)

userRouter.post("/login", validate(userLoginSchema), login)

export default userRouter
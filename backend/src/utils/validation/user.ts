import { z } from "zod";

export const userSignupSchema = z.object({
  name: z.string({"required_error":"Name is required"}).min(2, "Name must be at least 3 characters").max(60),
  email: z.string({"required_error":"Email is required"}).email("Invalid email syntax"),
  password: z.string({"required_error":"Password is required"}).min(6, "Password must be at least 6 characters"),
});

export const userLoginSchema = userSignupSchema.pick({email:true,password:true})

export type UserSignupInput = z.infer<typeof userSignupSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
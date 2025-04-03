import { User } from "@/models/user";
import { createResponse, generateToken } from "@/utils/helpers";
import { UserLoginInput, UserSignupInput } from "@/utils/validation/user";
import { Request, Response } from "express";

// 
export const signup = async (req: Request<{}, {}, UserSignupInput>, res: Response) => {
  try {

    const { name, email, password } = req.body

    const userAlreadyExist = await User.findOne({ email })

    if (userAlreadyExist) {
      res.status(400).json(createResponse(false, "User exists with this email"))
      return;
    }

    await User.create({
      name,
      email,
      password,
    })

    res.status(200).json(createResponse(true, "User registered successfully"))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }

}

// 
export const login = async (req: Request<{}, {}, UserLoginInput>, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.status(400).json(createResponse(false, "Incorrect Email", { email: "Incorrect Email" }))
      return
    }
    const isCorrectPassword = await user.comparePassword(password)

    if (!isCorrectPassword) {
      res.status(400).json(createResponse(false, "Incorrect Password", { password: "Incorrect Password" }))
    }

    // @ts-ignore
    delete user.password

    // generating user token for authentication
    const token = generateToken({ userId: user.id, name: user.name, email: user.email })

    res.status(200).json(createResponse(true, "logged in successfully", {}, { data: user, token }))
    return;
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}
import { OTP } from "../../models/otp";
import { User } from "../../models/user";
import { createResponse, generateOTP, generateToken, isOTPExpired } from "../../utils/helpers";
import { EmailVerification, UserLoginInput, UserSignupInput } from "../../utils/validation/auth";
import { Request, Response } from "express";
import { sendMail } from "../services/mailService";
import { rateLimiter } from "../services/rateLimeter";
import { EmailTemplateModel } from "../../models/emailTemplate";
import { injectVariables } from "../../utils/helpers/emailVriableInjector";
import { ROLES } from "../../utils/types";
import { emailTemplates } from "../../utils/constants";

// 
export const sendOtp = async (req: Request<{}, {}, Omit<UserSignupInput, "password">>, res: Response) => {
  try {
    // 
    const { email, name } = req.body


    // checking if rate limit is exceded
    const otpRateLimit = await rateLimiter.isRateLimited(email, "email-verification", 2)

    if (otpRateLimit.limiteExceded) {
      const minutesLeft = otpRateLimit.expiresIn.minutes
      const secondsLeft = otpRateLimit.expiresIn.seconds

      res.status(400).json(createResponse(false, `Please wait for ${minutesLeft > 0 && minutesLeft + " Minutes"} and ${secondsLeft} seconds `))
      return
    }

    //setting rate limit on user, this will either set or increment rateLimit
    const rateLimitTime = 60 * 5 // user will be rateLimited for 5 minutes afte exceding the limit
    await rateLimiter.increment(email, "email-verification", rateLimitTime)

    const user = await User.findOne({ email })

    if (!user) {
      res.status(400).json(createResponse(false, "No user found with this email"))
      return
    }
    if (user.isVerified) {
      res.status(400).json(createResponse(false, "User already verified", { email: "User already verified" }))
      return;
    }
    //
    const optExpiryTime = new Date(Date.now() + Number(process.env.OTP_EXPIRY) * 60 * 1000);
    const otp = generateOTP()

    await OTP.findOneAndUpdate(
      { email },
      { otp, expiresAt: optExpiryTime },
      { upsert: true, new: true }
    );



    await sendMail(emailTemplates.user_verification(email, user.name, `${otp}`, process.env.OTP_EXPIRY))


    res.status(200).json(createResponse(true, "OTP sent successfully"))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}
// 
export const verifyEmail = async (req: Request<{}, {}, EmailVerification>, res: Response) => {
  try {
    const { email, otp: OtpReceivedFromUser } = req.body

    const otpSentToUser = await OTP.findOne({ email });

    if (!otpSentToUser) {
      res.status(400).json(createResponse(false, "Please send an OTP first"))
      return;
    }

    const user = await User.findOne({ email })

    if (!user) {
      res.status(400).json(createResponse(false, "User not found"))
      return
    }

    if (user.isVerified) {
      res.status(400).json(createResponse(false, "User already verified"))
      return
    }

    if (isOTPExpired(otpSentToUser.expiresAt)) {
      res.status(400).json(createResponse(false, "OTP has expired"))
      return;
    }

    if (otpSentToUser.otp !== OtpReceivedFromUser) {
      res.status(400).json(createResponse(false, "Incorrect OTP"))
      return
    }

    await User.findByIdAndUpdate(user._id, {
      isVerified: true
    })

    res.status(200).json(createResponse(true, "Email verifcation successfull"))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}
// 
export const signup = async (req: Request<{}, {}, UserSignupInput>, res: Response) => {
  try {

    const { name, email, password } = req.body

    const userAlreadyExist = await User.findOne({ email: email.trim() })

    if (userAlreadyExist) {
      res.status(400).json(createResponse(false, "User exists with this email", { errors: { email: "User exists with this email" } }))
      return;
    }

    const user = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    })

    user.password = ""

    res.status(200).json(createResponse(true, "User registered successfully", {
      data: {
        user
      }
    }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }

}

// 
export const login = async (req: Request<{}, {}, UserLoginInput>, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email.trim() })
    if (!user) {
      res.status(400).json(createResponse(false, "User Not found with this email", { errors: { email: "User Not found with this email" } }))
      return
    }

    // 
    if (!user.isVerified) {
      const tempUser = user
      tempUser.password = ""
      // here I am sending true and user details so that user would know that he should verity him first
      res.status(200).json(createResponse(true, "Email not verified", { data: { tempUser }, errors: { email: "User not verified" } }))
      return
    }

    // Comparing passowrd
    const isCorrectPassword = await user.comparePassword(password.trim(), user.password)

    if (!isCorrectPassword) {
      res.status(400).json(createResponse(false, "Incorrect Password", { errors: { password: "Incorrect Password" } }))
      return
    }


    // generating user token for authentication
    const token = generateToken({ userId: user.id, name: user.name, email: user.email, role: (user.role as ROLES) })

    // deleting user sensitive data
    user.password = ""

    res.status(200).json(createResponse(true, "logged in successfully", { data: { user }, token }))
    return;
  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}
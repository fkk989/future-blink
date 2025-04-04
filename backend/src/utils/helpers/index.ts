import { User } from "@/models/user";
import jwt from "jsonwebtoken";
import { emailTemplates } from "../constants";
import mongoose, { ObjectId } from "mongoose";
import { EmailTemplate } from "@/models/EmailTemplate";
import { name } from "agenda/dist/agenda/name";
import { EmailTemplateType } from "../types";

export function createResponse(
  success: boolean,
  message: string,
  error?: { [key: string]: any },
  props?: Object
) {
  return { success, message, error, ...props };
}

export const generateToken = (user: { userId: string, name: string, email: string, role: string }) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    return jwt.sign({ ...user }, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Unexpected error")
  }
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded as { userId: string; name: string; email: string, role: string };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

// this function will ensure the otp should be a 6 digit number it will always be a number between 100000 to 900000
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
// 
export const isOTPExpired = (expiresAt: Date): boolean => {
  return new Date() > new Date(expiresAt);
};

//function to create default platform email
export const createDefaultEmailTemplate = async () => {
  try {
    const admin = await User.findOne({ role: "ADMIN" });

    if (!admin) {
      throw Error("Please create a admin first to create default Email templates")
    }

    emailTemplates.map(async (data) => {
      const emailTemplatedata: EmailTemplateType & { isCompanyTemplate: boolean, user: any } = {
        name: data.name.trim(),
        subject: data.subject.trim(),
        html: data.html.trim(),
        mergeTags: data.mergeTags,
        isCompanyTemplate: true,
        user: admin._id
      }
      await EmailTemplate.findOneAndUpdate(
        { name: data.name, user: admin.id },
        { $setOnInsert: { ...emailTemplatedata, user: admin.id } },
        { upsert: true, new: true }
      );

    })

    console.log("Default Email create Successfully")

  } catch (e: any) {
    console.log("error creatind default email templates", e?.message)
  }
}



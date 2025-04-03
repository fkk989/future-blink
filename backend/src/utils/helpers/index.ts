import jwt from "jsonwebtoken";

export function createResponse(
  success: boolean,
  message: string,
  error?: { [key: string]: any },
  props?: Object
) {
  return { success, message, error, ...props };
}

export const generateToken = (user: { userId: string, name: string, email: string }): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ ...user }, process.env.JWT_SECRET);
};

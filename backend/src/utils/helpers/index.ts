import jwt from "jsonwebtoken";

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

export const isOTPExpired = (expiresAt: Date): boolean => {
  return new Date() > new Date(expiresAt);
};

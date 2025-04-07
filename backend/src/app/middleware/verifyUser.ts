import { createResponse } from "../../utils/helpers";
import { AuthenticatedRequest, ROLES } from "../../utils/types";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";




export const verifyUserMiddleware = (allowedRoles: ROLES[]) => ((
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const tokne = req.headers.authorization;

  if (!tokne || !tokne.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authorization token missing or invalid" });
    return
  }

  const token = tokne.split(" ")[1];

  try {
    const userInfo = jwt.verify(token, JWT_SECRET) as AuthenticatedRequest["user"]

    if (!userInfo) {
      res.status(400).json(createResponse(false, "Invalid or expired token"))
      return
    }
    // adding user info to the req to use in the next function
    req.user = userInfo;


    // ADMIN is always allowed
    const hasAccess = allowedRoles.includes(userInfo.role);

    if (hasAccess || userInfo.role === "ADMIN" || allowedRoles.includes("ALL")) {
      next();
      return;
    }
    res.status(403).json(createResponse(false, "NOT AUTHORIZED"));


  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
})

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserMiddleware = void 0;
const helpers_1 = require("../../utils/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const verifyUserMiddleware = (allowedRoles) => ((req, res, next) => {
    const tokne = req.headers.authorization;
    if (!tokne || !tokne.startsWith("Bearer ")) {
        res.status(401).json({ message: "Authorization token missing or invalid" });
        return;
    }
    const token = tokne.split(" ")[1];
    try {
        const userInfo = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!userInfo) {
            res.status(400).json((0, helpers_1.createResponse)(false, "Invalid or expired token"));
            return;
        }
        // adding user info to the req to use in the next function
        req.user = userInfo;
        // ADMIN is always allowed
        const hasAccess = allowedRoles.includes(userInfo.role);
        if (hasAccess || userInfo.role === "ADMIN" || allowedRoles.includes("ALL")) {
            next();
            return;
        }
        res.status(403).json((0, helpers_1.createResponse)(false, "NOT AUTHORIZED"));
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.verifyUserMiddleware = verifyUserMiddleware;

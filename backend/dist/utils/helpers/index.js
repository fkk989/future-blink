"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOTPExpired = exports.verifyToken = exports.generateToken = void 0;
exports.createResponse = createResponse;
exports.generateOTP = generateOTP;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createResponse(success, message, props) {
    return Object.assign({ success, message }, props);
}
const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
        return jsonwebtoken_1.default.sign(Object.assign({}, user), process.env.JWT_SECRET);
    }
    catch (error) {
        throw new Error("Unexpected error");
    }
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (err) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
// this function will ensure the otp should be a 6 digit number it will always be a number between 100000 to 900000
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
// 
const isOTPExpired = (expiresAt) => {
    return new Date() > new Date(expiresAt);
};
exports.isOTPExpired = isOTPExpired;
// //function to create default platform email
// export const createDefaultEmailTemplate = async () => {
//   try {
//     const admin = await User.findOne({ role: "ADMIN" });
//     if (!admin) {
//       throw Error("Please create a admin first to create default Email templates")
//     }
//     emailTemplates.map(async (data) => {
//       const emailTemplatedata: EmailSchemaType & { user: any } = {
//         name: data.name.trim(),
//         subject: data.subject!.trim(),
//         html: data.html!.trim(),
//         isCompanyTemplate: true,
//         user: admin._id
//       }
//       await EmailTemplateModel.findOneAndUpdate(
//         { name: data.name, user: admin.id },
//         { $setOnInsert: { ...emailTemplatedata, user: admin.id } },
//         { upsert: true, new: true }
//       );
//     })
//     console.log("Default Email create Successfully")
//   } catch (e: any) {
//     console.log("error creatind default email templates", e?.message)
//   }
// }

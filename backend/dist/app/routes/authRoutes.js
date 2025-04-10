"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const auth_1 = require("../../utils/validation/auth");
const verifyUser_1 = require("../middleware/verifyUser");
const helpers_1 = require("../../utils/helpers");
const user_1 = require("../../models/user");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get("/", (0, verifyUser_1.verifyUserMiddleware)(["ALL"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const logedUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const user = yield user_1.User.findById(logedUserId);
    if (!user) {
        res.status(400).json((0, helpers_1.createResponse)(false, "User not found"));
        return;
    }
    user.password = "";
    res.status(200).json((0, helpers_1.createResponse)(true, "User Is logedIn", { data: { user } }));
}));
exports.authRouter.post("/send-otp", (0, validate_1.validate)(auth_1.otpSchema), authController_1.sendOtp);
exports.authRouter.post("/verify-email", (0, validate_1.validate)(auth_1.emailVerificationSchema), authController_1.verifyEmail);
exports.authRouter.post("/signup", (0, validate_1.validate)(auth_1.userSignupSchema), authController_1.signup);
exports.authRouter.post("/login", (0, validate_1.validate)(auth_1.userLoginSchema), authController_1.login);

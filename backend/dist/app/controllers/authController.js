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
exports.login = exports.signup = exports.verifyEmail = exports.sendOtp = void 0;
const otp_1 = require("../../models/otp");
const user_1 = require("../../models/user");
const helpers_1 = require("../../utils/helpers");
const mailService_1 = require("../services/mailService");
const rateLimeter_1 = require("../services/rateLimeter");
const constants_1 = require("../../utils/constants");
// 
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 
        const { email, name } = req.body;
        // checking if rate limit is exceded
        const otpRateLimit = yield rateLimeter_1.rateLimiter.isRateLimited(email, "email-verification", 2);
        if (otpRateLimit.limiteExceded) {
            const minutesLeft = otpRateLimit.expiresIn.minutes;
            const secondsLeft = otpRateLimit.expiresIn.seconds;
            res.status(400).json((0, helpers_1.createResponse)(false, `Please wait for ${minutesLeft > 0 && minutesLeft + " Minutes"} and ${secondsLeft} seconds to send otp again`));
            return;
        }
        //setting rate limit on user, this will either set or increment rateLimit
        const rateLimitTime = 60 * 5; // user will be rateLimited for 5 minutes afte exceding the limit
        yield rateLimeter_1.rateLimiter.increment(email, "email-verification", rateLimitTime);
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(400).json((0, helpers_1.createResponse)(false, "No user found with this email"));
            return;
        }
        if (user.isVerified) {
            res.status(400).json((0, helpers_1.createResponse)(false, "User already verified", { email: "User already verified" }));
            return;
        }
        //
        const optExpiryTime = new Date(Date.now() + Number(process.env.OTP_EXPIRY) * 60 * 1000);
        const otp = (0, helpers_1.generateOTP)();
        yield otp_1.OTP.findOneAndUpdate({ email }, { otp, expiresAt: optExpiryTime }, { upsert: true, new: true });
        yield (0, mailService_1.sendMail)(constants_1.emailTemplates.user_verification(email, user.name, `${otp}`, process.env.OTP_EXPIRY));
        res.status(200).json((0, helpers_1.createResponse)(true, "OTP sent successfully"));
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
    }
});
exports.sendOtp = sendOtp;
// 
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp: OtpReceivedFromUser } = req.body;
        const otpSentToUser = yield otp_1.OTP.findOne({ email });
        if (!otpSentToUser) {
            res.status(400).json((0, helpers_1.createResponse)(false, "Please send an OTP first"));
            return;
        }
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            res.status(400).json((0, helpers_1.createResponse)(false, "User not found"));
            return;
        }
        if (user.isVerified) {
            res.status(400).json((0, helpers_1.createResponse)(false, "User already verified"));
            return;
        }
        if ((0, helpers_1.isOTPExpired)(otpSentToUser.expiresAt)) {
            res.status(400).json((0, helpers_1.createResponse)(false, "OTP has expired"));
            return;
        }
        if (otpSentToUser.otp !== OtpReceivedFromUser) {
            res.status(400).json((0, helpers_1.createResponse)(false, "Incorrect OTP"));
            return;
        }
        yield user_1.User.findByIdAndUpdate(user._id, {
            isVerified: true
        });
        res.status(200).json((0, helpers_1.createResponse)(true, "Email verifcation successfull"));
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
    }
});
exports.verifyEmail = verifyEmail;
// 
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userAlreadyExist = yield user_1.User.findOne({ email: email.trim() });
        if (userAlreadyExist) {
            res.status(400).json((0, helpers_1.createResponse)(false, "User exists with this email", { errors: { email: "User exists with this email" } }));
            return;
        }
        const user = yield user_1.User.create({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        });
        user.password = "";
        res.status(200).json((0, helpers_1.createResponse)(true, "User registered successfully", {
            data: {
                user
            }
        }));
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
    }
});
exports.signup = signup;
// 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email: email.trim() });
        if (!user) {
            res.status(400).json((0, helpers_1.createResponse)(false, "User Not found with this email", { errors: { email: "User Not found with this email" } }));
            return;
        }
        // 
        if (!user.isVerified) {
            const tempUser = user;
            tempUser.password = "";
            // here I am sending true and user details so that user would know that he should verity him first
            res.status(200).json((0, helpers_1.createResponse)(true, "Email not verified", { data: { user: tempUser }, errors: { email: "User not verified" } }));
            return;
        }
        // Comparing passowrd
        const isCorrectPassword = yield user.comparePassword(password.trim(), user.password);
        if (!isCorrectPassword) {
            res.status(400).json((0, helpers_1.createResponse)(false, "Incorrect Password", { errors: { password: "Incorrect Password" } }));
            return;
        }
        // generating user token for authentication
        const token = (0, helpers_1.generateToken)({ userId: user.id, name: user.name, email: user.email, role: user.role });
        // deleting user sensitive data
        user.password = "";
        res.status(200).json((0, helpers_1.createResponse)(true, "logged in successfully", { data: { user }, token }));
        return;
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
    }
});
exports.login = login;

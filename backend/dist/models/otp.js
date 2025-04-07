"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false }, // we only want createdAt
});
exports.OTP = (0, mongoose_1.model)("OTP", otpSchema);

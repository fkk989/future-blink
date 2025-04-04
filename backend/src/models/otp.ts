import { Schema, model, Document, Types } from "mongoose";

export interface IOTP extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    createdAt: Date;
}

const otpSchema = new Schema<IOTP>(
    {
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
    },
    {
        timestamps: { createdAt: true, updatedAt: false }, // we only want createdAt
    }
);

export const OTP = model<IOTP>("OTP", otpSchema);


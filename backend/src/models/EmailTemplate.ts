import { Schema, model, Types } from "mongoose";


const EmailTemplateSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        subject: { type: String, },
        html: { type: String, },
        isCompanyTemplate: { type: Boolean, default: false },
        user: { type: Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const EmailTemplateModel = model("EmailTemplate", EmailTemplateSchema);

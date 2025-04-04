import { Schema, model, Types } from "mongoose";

const EmailTemplateSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    mergeTags: [{ type: String }],
    isCompanyTemplate: { type: Boolean, default: false },
    user: { type: Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

EmailTemplateSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export const EmailTemplate = model("EmailTemplate", EmailTemplateSchema);

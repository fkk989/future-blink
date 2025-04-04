import { unique } from "agenda/dist/job/unique";
import { Schema, model, Types } from "mongoose";

const MergeTagSchema = new Schema(
    {
        tag: { type: String, required: true },
        placeholder: { type: String, required: true }, // e.g., "{{name}}"
        description: { type: String }, // optional for UI/display help
    },
    { _id: false } // prevent creating _id for each mergeTag
);

const EmailTemplateSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        subject: { type: String, required: true },
        html: { type: String, required: true },
        mergeTags: [MergeTagSchema],
        isCompanyTemplate: { type: Boolean, default: false },
        user: { type: Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

// Ensures user can't create templates with duplicate names
EmailTemplateSchema.index({ name: 1, user: 1 }, { unique: true });

export const EmailTemplate = model("EmailTemplate", EmailTemplateSchema);

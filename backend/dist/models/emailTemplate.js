"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateModel = void 0;
const mongoose_1 = require("mongoose");
const EmailTemplateSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    subject: { type: String, },
    html: { type: String, },
    isCompanyTemplate: { type: Boolean, default: false },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.EmailTemplateModel = (0, mongoose_1.model)("EmailTemplate", EmailTemplateSchema);

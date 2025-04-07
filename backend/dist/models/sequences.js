"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceModel = void 0;
const mongoose_1 = require("mongoose");
const NodeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["EMAIL", "DELAY"],
        required: true,
    },
    emailTemplate: {
        type: mongoose_1.Types.ObjectId,
        ref: "EmailTemplate",
    },
    delayTimeInMilleseconds: {
        type: Number,
    },
}, { _id: false });
const SequenceSchema = new mongoose_1.Schema({
    scheduledAt: { type: Date },
    leadsList: [{ type: mongoose_1.Types.ObjectId, ref: "List" }],
    name: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    nodes: [NodeSchema],
}, { timestamps: true });
exports.SequenceModel = (0, mongoose_1.model)("Sequence", SequenceSchema);

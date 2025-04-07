import { Schema, Types, model } from "mongoose"

const NodeSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["EMAIL", "DELAY"],
      required: true,
    },
    emailTemplate: {
      type: Types.ObjectId,
      ref: "EmailTemplate",
    },
    delayTimeInMilleseconds: {
      type: Number,
    },
  },
  { _id: false }
);

const SequenceSchema = new Schema(
  {
    scheduledAt: { type: Date },
    leadsList: [{ type: Types.ObjectId, ref: "List" }],
    name: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    nodes: [NodeSchema],
  },
  { timestamps: true }
);

export const SequenceModel = model("Sequence", SequenceSchema);
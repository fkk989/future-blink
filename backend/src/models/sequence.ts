import { Schema, model, Types } from "mongoose";


const NodeSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["EMAIL", "DELAY"],
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
    emailTemplate: {
      type: Types.ObjectId,
      ref: "EmailTemplate",
    },
    delayInMinutes: {
      type: Number,
    },
  },
  { _id: false }
);

const SequenceSchema = new Schema(
  {
    leadLists: [{ type: Types.ObjectId, ref: "List" }],
    name: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    nodes: [NodeSchema],
  },
  { timestamps: true }
);

export const SequenceModel = model("Sequence", SequenceSchema);

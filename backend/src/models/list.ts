import { Schema, Types, model } from "mongoose";

const LeadListSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
  listData: { type: Types.ObjectId, ref: "ListData" },
}, { timestamps: true });

const LeadSchema = new Schema({
  list: { type: Types.ObjectId, ref: "List", required: true },
  data: [{
    type: Map,
    of: String
  }],
}, { timestamps: true });

// Models
export const ListModel = model("List", LeadListSchema);
export const ListDataModel = model("ListData", LeadSchema);
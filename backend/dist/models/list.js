"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDataModel = exports.ListModel = void 0;
const mongoose_1 = require("mongoose");
const LeadListSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    listData: { type: mongoose_1.Types.ObjectId, ref: "ListData" },
}, { timestamps: true });
const LeadSchema = new mongoose_1.Schema({
    list: { type: mongoose_1.Types.ObjectId, ref: "List", required: true },
    data: [{
            type: Map,
            of: String,
        }],
}, { timestamps: true });
// Models
exports.ListModel = (0, mongoose_1.model)("List", LeadListSchema);
exports.ListDataModel = (0, mongoose_1.model)("ListData", LeadSchema);

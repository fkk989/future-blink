"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getList = getList;
exports.getListById = getListById;
exports.createLeadList = createLeadList;
exports.updateListData = updateListData;
exports.deleteList = deleteList;
const list_1 = require("../../models/list");
const helpers_1 = require("../../utils/helpers");
function getList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const usersList = yield list_1.ListModel.find({ user: logedInUser.userId }).populate("listData").select("_id name data");
            res.status(200).json((0, helpers_1.createResponse)(true, "list fetched successfully", { data: { lists: usersList } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function getListById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const listId = req.params.id;
            const usersList = yield list_1.ListModel.findById(listId).populate("listData");
            if (!usersList) {
                res.status(400).json((0, helpers_1.createResponse)(false, "No list found"));
                return;
            }
            res.status(200).json((0, helpers_1.createResponse)(true, "list fetched successfully", { data: { lists: usersList } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function createLeadList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const { name } = req.body;
            const lead = yield list_1.ListModel.create({ name, user: logedInUser.userId });
            res.status(200).json((0, helpers_1.createResponse)(true, "List created Successfully", { data: { list: lead.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
        }
    });
}
function updateListData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listId = req.params.id;
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const { data } = req.body;
            const list = yield list_1.ListModel.findOne({ _id: listId, user: logedInUser.userId });
            if (!list) {
                res.status(400).json((0, helpers_1.createResponse)(false, "No List Found"));
                return;
            }
            const leadData = yield list_1.ListDataModel.findOneAndUpdate({ list: listId }, { data }, { new: true, upsert: true });
            yield list_1.ListModel.findByIdAndUpdate(listId, {
                listData: leadData.id
            });
            res.status(200).json((0, helpers_1.createResponse)(true, "List created Successfully", { data: { list: leadData.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
        }
    });
}
function deleteList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const listId = req.params.id;
            if (!listId) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Please provide a id parameter for List id"));
                return;
            }
            const listInDb = yield list_1.ListModel.findOne({ _id: listId, user: logedInUser.userId });
            if (!listInDb) {
                res.status(400).json((0, helpers_1.createResponse)(false, "List not found"));
                return;
            }
            yield list_1.ListModel.findByIdAndDelete(listInDb.id);
            yield list_1.ListDataModel.deleteMany({ list: listInDb.id });
            res.status(200).json((0, helpers_1.createResponse)(true, "List deleted Successfully"));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
        }
    });
}

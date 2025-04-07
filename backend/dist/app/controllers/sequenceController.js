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
exports.getSequenceById = getSequenceById;
exports.getSequences = getSequences;
exports.createSequence = createSequence;
exports.updateSequenceName = updateSequenceName;
exports.createOrUpdateNodes = createOrUpdateNodes;
exports.deleteSequence = deleteSequence;
const helpers_1 = require("../../utils/helpers");
const sequences_1 = require("../../models/sequences");
const list_1 = require("../../models/list");
const agendaService_1 = require("../services/agendaService");
// 
function getSequenceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const sequenceId = req.params.id;
            const sequence = yield sequences_1.SequenceModel.findById(sequenceId);
            res.status(200).json((0, helpers_1.createResponse)(true, "sequences fetched successfully", { data: { sequence } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function getSequences(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const sequences = yield sequences_1.SequenceModel.find({ user: logedInUser.userId });
            res.status(200).json((0, helpers_1.createResponse)(true, "sequences fetched successfully", { data: { sequences } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function createSequence(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const { name } = req.body;
            const sequence = yield sequences_1.SequenceModel.create({ user: logedInUser.userId, name });
            res.status(200).json((0, helpers_1.createResponse)(true, "sequences fetched successfully", { data: { sequenceId: sequence.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function updateSequenceName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const sequenceId = req.params.id;
            const { name } = req.body;
            const sequence = yield sequences_1.SequenceModel.findByIdAndUpdate(sequenceId, { name });
            res.status(200).json((0, helpers_1.createResponse)(true, "sequences fetched successfully", { data: { sequenceId: sequence === null || sequence === void 0 ? void 0 : sequence.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function createOrUpdateNodes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const sequenceId = req.params.id;
            const { nodes, leadsList, scheduledAt } = req.body;
            const leadListInDb = yield list_1.ListModel.findOne({ _id: leadsList, user: logedInUser.userId });
            if (!leadListInDb) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Leads List Not Found"));
                return;
            }
            const sequenceInDb = yield sequences_1.SequenceModel.findById(sequenceId);
            if (!sequenceInDb) {
                res.status(400).json((0, helpers_1.createResponse)(false, "sequence not found"));
                return;
            }
            const scheduledAtDate = new Date(scheduledAt);
            if (scheduledAtDate.getTime() <= Date.now()) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Please schedule at a future date or time"));
                return;
            }
            const sequence = yield sequences_1.SequenceModel.findOneAndUpdate({ _id: sequenceId, user: logedInUser.userId }, { nodes, leadsList, scheduledAt: scheduledAtDate }, { new: true }).populate("nodes.emailTemplate");
            // @ts-ignore
            yield (0, agendaService_1.scheduleASequence)((sequence));
            res.status(200).json((0, helpers_1.createResponse)(true, "Sequences Updated successfully", { data: { sequenceId: sequence === null || sequence === void 0 ? void 0 : sequence.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function deleteSequence(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const sequenceId = req.params.id;
            yield sequences_1.SequenceModel.deleteOne({ _id: sequenceId, user: logedInUser.userId, });
            res.status(200).json((0, helpers_1.createResponse)(true, "sequence deleted successfully"));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}

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
exports.getEmailTemplate = getEmailTemplate;
exports.getEmailTemplateById = getEmailTemplateById;
exports.createEmailTemplate = createEmailTemplate;
exports.updateEmailTemplate = updateEmailTemplate;
exports.deleteEmailTemplate = deleteEmailTemplate;
const emailTemplate_1 = require("../../models/emailTemplate");
const helpers_1 = require("../../utils/helpers");
function getEmailTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const templates = yield emailTemplate_1.EmailTemplateModel.find({ user: logedInUser.userId });
            res.status(200).json((0, helpers_1.createResponse)(true, "email template fetched", { data: { templates } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function getEmailTemplateById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const emailId = req.params.id;
            const template = yield emailTemplate_1.EmailTemplateModel.findById(emailId);
            if (!template) {
                res.status(400).json((0, helpers_1.createResponse)(false, "No template found"));
                return;
            }
            res.status(200).json((0, helpers_1.createResponse)(true, "email template fetched", { data: { template } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function createEmailTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logedInUser = req === null || req === void 0 ? void 0 : req.user;
            const template = yield emailTemplate_1.EmailTemplateModel.create(Object.assign({ user: logedInUser.userId }, req.body));
            res.status(200).json((0, helpers_1.createResponse)(true, "Template created", { data: { templateId: template.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function updateEmailTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const templateId = req.params.id;
            const { userId } = req === null || req === void 0 ? void 0 : req.user;
            const template = yield emailTemplate_1.EmailTemplateModel.findOneAndUpdate({ _id: templateId, user: userId }, req.body, { new: true });
            if (!template) {
                res.status(400).json((0, helpers_1.createResponse)(false, "Template not found"));
                return;
            }
            res.status(200).json((0, helpers_1.createResponse)(true, "Template updated", { data: { templateId: template.id } }));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}
function deleteEmailTemplate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req === null || req === void 0 ? void 0 : req.user;
            const templateId = req.params.id;
            yield emailTemplate_1.EmailTemplateModel.deleteOne({ _id: templateId, user: userId });
            res.status(200).json((0, helpers_1.createResponse)(true, "Template deleted successfully"));
        }
        catch (e) {
            res.status(400).json((0, helpers_1.createResponse)(false, e === null || e === void 0 ? void 0 : e.message));
        }
    });
}

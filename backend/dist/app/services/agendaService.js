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
exports.scheduleASequence = scheduleASequence;
exports.initiateAdendaJob = initiateAdendaJob;
exports.startAgenda = startAgenda;
const agenda_1 = require("../../config/agenda");
const list_1 = require("../../models/list");
const emailVriableInjector_1 = require("../../utils/helpers/emailVriableInjector");
const mailService_1 = require("./mailService");
function scheduleASequence(sequence_1) {
    return __awaiter(this, arguments, void 0, function* (sequence, attempt = 1, maxRetries = 5) {
        try {
            let delay = 0;
            sequence.nodes.forEach((node) => {
                if (node.type === "EMAIL") {
                }
                else {
                    delay += node.delayTimeInMilleseconds;
                }
            });
            const lists = yield list_1.ListModel.find({
                _id: { $in: sequence.leadsList }
            }).populate("listData");
            // making a single list of all lead from different list
            const allLeads = lists
                // @ts-ignore
                .map(list => list.listData.data || [])
                .flat();
            const plainLeads = allLeads.map(leadMap => Object.fromEntries(leadMap));
            console.log("allLeads: ", plainLeads);
            for (const lead of allLeads) {
                let delay = 0;
                for (const node of sequence.nodes) {
                    if (node.type === "DELAY") {
                        delay += node.delayTimeInMilleseconds;
                    }
                    console.log("dalay: ", delay);
                    if (node.type === "EMAIL" && node.emailTemplate) {
                        const jobTime = new Date(sequence.scheduledAt.getTime() + delay);
                        console.log("Node: ", node, "jobTime:", jobTime);
                        agenda_1.agenda.schedule(jobTime, "send-email", {
                            emailTemplate: node.emailTemplate,
                            lead
                        });
                    }
                }
            }
        }
        catch (error) {
            console.error(`Error scheduling sequence on attempt ${attempt}:`, error);
            if (attempt < maxRetries) {
                setTimeout(() => {
                    scheduleASequence(sequence, attempt + 1, maxRetries);
                }, 1000 * attempt);
            }
            else {
                console.error("Max retry attempts reached. Failed to schedule sequence.");
            }
        }
    });
}
function initiateAdendaJob() {
    agenda_1.agenda.define("send-email", (job) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { emailTemplate, lead } = job.attrs.data;
            if (!lead.email && !lead.Email) {
                console.log("Lead data does not contain email");
                return;
            }
            const finalTemplateWithMergeTags = (0, emailVriableInjector_1.injectVariables)({
                body: emailTemplate.html,
                values: lead
            });
            yield (0, mailService_1.sendMail)({ to: (lead === null || lead === void 0 ? void 0 : lead.email) || (lead === null || lead === void 0 ? void 0 : lead.Email), subject: emailTemplate.subject, html: finalTemplateWithMergeTags });
            // Add your email sending logic here
            console.log("Sending email to:", lead.email);
        }
        catch (e) {
            yield job.remove();
            console.log("error:", e.message);
        }
    }));
    console.log("agenda jobs initiated");
}
function startAgenda() {
    return __awaiter(this, void 0, void 0, function* () {
        yield agenda_1.agenda.start();
        console.log("agenda started");
    });
}

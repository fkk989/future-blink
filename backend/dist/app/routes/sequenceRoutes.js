"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequenceRouter = void 0;
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const verifyUser_1 = require("../middleware/verifyUser");
const sequence_1 = require("../../utils/validation/sequence");
const sequenceController_1 = require("../controllers/sequenceController");
exports.sequenceRouter = (0, express_1.Router)();
exports.sequenceRouter.get("/", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), sequenceController_1.getSequences);
exports.sequenceRouter.get("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), sequenceController_1.getSequenceById);
// create sequece
exports.sequenceRouter.post("/", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), (0, validate_1.validate)(sequence_1.SequenceBodySchema), sequenceController_1.createSequence);
// create or upate sequence Nodes
exports.sequenceRouter.post("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), (0, validate_1.validate)(sequence_1.NodeBodySchema), sequenceController_1.createOrUpdateNodes);
//
exports.sequenceRouter.delete("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), sequenceController_1.deleteSequence);

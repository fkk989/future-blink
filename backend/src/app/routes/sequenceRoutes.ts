import { Router } from "express";
import { validate } from "../middleware/validate";
import { verifyUserMiddleware } from "../middleware/verifyUser";
import { SequenceBodySchema, NodeBodySchema } from "../../utils/validation/sequence";
import { createOrUpdateNodes, createSequence, deleteSequence, getSequenceById, getSequences } from "../controllers/sequenceController";

export const sequenceRouter = Router()

sequenceRouter.get("/", verifyUserMiddleware(["USER"]), getSequences)
sequenceRouter.get("/:id", verifyUserMiddleware(["USER"]), getSequenceById)

// create sequece
sequenceRouter.post("/", verifyUserMiddleware(["USER"]), validate(SequenceBodySchema), createSequence)

// create or upate sequence Nodes
sequenceRouter.post("/:id", verifyUserMiddleware(["USER"]), validate(NodeBodySchema), createOrUpdateNodes)
//
sequenceRouter.delete("/:id", verifyUserMiddleware(["USER"]), deleteSequence)
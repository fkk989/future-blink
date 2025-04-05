import { Response } from "express";
import { AuthenticatedRequest } from "@/utils/types";
import { createResponse } from "@/utils/helpers";
import { SequenceModel } from "@/models/sequence";
import { SequenceType, NodeBodyType } from "@/utils/validation/sequence";
// 


export async function getSequences(req: AuthenticatedRequest, res: Response) {
  try {
    const logedInUser = req?.user!

    const sequences = await SequenceModel.find({ user: logedInUser.userId })

    res.status(200).json(createResponse(true, "sequences fetched successfully", { data: { sequences } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}


export async function createSequence(req: AuthenticatedRequest<{}, {}, SequenceType>, res: Response) {
  try {
    const logedInUser = req?.user!
    const { name } = req.body
    const sequence = await SequenceModel.create({ user: logedInUser.userId, name })

    res.status(200).json(createResponse(true, "sequences fetched successfully", { data: { sequenceId: sequence.id } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function updateSequenceName(req: AuthenticatedRequest<{ id: string }, {}, SequenceType>, res: Response) {
  try {
    const logedInUser = req?.user!
    const sequenceId = req.params.id
    const { name } = req.body

    const sequence = await SequenceModel.findByIdAndUpdate(sequenceId, { name })

    res.status(200).json(createResponse(true, "sequences fetched successfully", { data: { sequenceId: sequence?.id } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function createOrUpdateNodes(req: AuthenticatedRequest<{ id: string }, {}, NodeBodyType>, res: Response) {
  try {
    const logedInUser = req?.user!
    const sequenceId = req.params.id
    const nodes = req.body.nodes
    const sequence = await SequenceModel.findOneAndUpdate({ _id: sequenceId, user: logedInUser.userId }, { nodes })

    res.status(200).json(createResponse(true, "sequences fetched successfully", { data: { sequenceId: sequence?.id } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}


export async function deleteSequence(req: AuthenticatedRequest<{ id: string }, {}, NodeBodyType>, res: Response) {
  try {
    const logedInUser = req?.user!
    const sequenceId = req.params.id

    await SequenceModel.deleteOne({ _id: sequenceId, user: logedInUser.userId, })

    res.status(200).json(createResponse(true, "sequence deleted successfully"))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}
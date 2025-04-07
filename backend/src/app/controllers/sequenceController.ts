import { Response } from "express";
import { AuthenticatedRequest, Sequence } from "../../utils/types";
import { createResponse } from "../../utils/helpers";
import { SequenceModel } from "../../models/sequences";
import { SequenceType, NodeBodyType } from "../../utils/validation/sequence";
import { ListDataModel, ListModel } from "../../models/list";
import mongoose from "mongoose";
import { scheduleASequence } from "../services/agendaService";
// 

export async function getSequenceById(req: AuthenticatedRequest<{ id: string }>, res: Response) {
  try {
    const logedInUser = req?.user!
    const sequenceId = req.params.id

    const sequence = await SequenceModel.findById(sequenceId)

    res.status(200).json(createResponse(true, "sequences fetched successfully", { data: { sequence } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

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
    const { nodes, leadsList, scheduledAt } = req.body


    const leadListInDb = await ListModel.findOne({ _id: leadsList, user: logedInUser.userId })

    if (!leadListInDb) {
      res.status(400).json(createResponse(false, "Leads List Not Found"))
      return
    }

    const sequenceInDb = await SequenceModel.findById(sequenceId)


    if (!sequenceInDb) {
      res.status(400).json(createResponse(false, "sequence not found"))
      return
    }

    const scheduledAtDate = new Date(scheduledAt);

    if (scheduledAtDate.getTime() <= Date.now()) {
      res.status(400).json(createResponse(false, "Please schedule at a future date or time"))
      return
    }

    const sequence = await SequenceModel.findOneAndUpdate({ _id: sequenceId, user: logedInUser.userId }, { nodes, leadsList, scheduledAt: scheduledAtDate }, { new: true }).populate("nodes.emailTemplate")


    // @ts-ignore
    await scheduleASequence((sequence))

    res.status(200).json(createResponse(true, "Sequences Updated successfully", { data: { sequenceId: sequence?.id } }))
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
import { ListModel, ListDataModel } from "../../models/list";
import { createResponse } from "../../utils/helpers";
import { AuthenticatedRequest } from "../../utils/types";
import { LeadType, ListType } from "../../utils/validation/list";
import { Response } from "express";


export async function getList(req: AuthenticatedRequest<{}, {}, LeadType>, res: Response) {
  try {
    const logedInUser = req?.user!

    const usersList = await ListModel.find({ user: logedInUser.userId }).populate("listData").select("_id name data")


    res.status(200).json(createResponse(true, "list fetched successfully", { data: { lists: usersList } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}
export async function getListById(req: AuthenticatedRequest<{ id: string }, {}, LeadType>, res: Response) {
  try {
    const logedInUser = req?.user!
    const listId = req.params.id

    const usersList = await ListModel.findById(listId).populate("listData")
    if (!usersList) {
      res.status(400).json(createResponse(false, "No list found"))
      return
    }

    res.status(200).json(createResponse(true, "list fetched successfully", { data: { lists: usersList } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function createLeadList(req: AuthenticatedRequest<{}, {}, LeadType>, res: Response) {
  try {
    const logedInUser = req?.user!

    const { name } = req.body

    const lead = await ListModel.create({ name, user: logedInUser.userId })

    res.status(200).json(createResponse(true, "List created Successfully", { data: { list: lead.id } }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

export async function updateListData(req: AuthenticatedRequest<{ id: string }, {}, ListType>, res: Response) {
  try {
    const listId = req.params.id
    const logedInUser = req?.user!
    const { data } = req.body

    const list = await ListModel.findOne({ _id: listId, user: logedInUser.userId })

    if (!list) {
      res.status(400).json(createResponse(false, "No List Found"))
      return
    }

    const leadData = await ListDataModel.findOneAndUpdate(
      { list: listId },
      { data },
      { new: true, upsert: true }
    );


    await ListModel.findByIdAndUpdate(listId, {
      listData: leadData.id
    })


    res.status(200).json(createResponse(true, "List created Successfully", { data: { list: leadData.id } }))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

export async function deleteList(req: AuthenticatedRequest<{ id: string }, {}, ListType>, res: Response) {
  try {
    const logedInUser = req?.user!

    const listId = req.params.id

    if (!listId) {
      res.status(400).json(createResponse(false, "Please provide a id parameter for List id"))
      return
    }

    const listInDb = await ListModel.findOne({ _id: listId, user: logedInUser.userId });

    if (!listInDb) {
      res.status(400).json(createResponse(false, "List not found"))
      return
    }

    await ListModel.findByIdAndDelete(listInDb.id)

    await ListDataModel.deleteMany({ list: listInDb.id })

    res.status(200).json(createResponse(true, "List deleted Successfully"))

  } catch (e: any) {
    res.status(400).json(createResponse(false, `${e?.message}`))
  }
}

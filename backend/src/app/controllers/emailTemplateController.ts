import { EmailTemplateModel } from "@/models/emailTemplate";
import { createResponse } from "@/utils/helpers";
import { AuthenticatedRequest, } from "@/utils/types";
import { EmailSchemaType } from "@/utils/validation/emailTemplate";
import { Response } from "express";

export async function getEmailTemplate(req: AuthenticatedRequest<{}, {}, EmailSchemaType>, res: Response) {
  try {
    const logedInUser = req?.user!

    const templates = await EmailTemplateModel.find({ user: logedInUser.userId })

    res.status(200).json(createResponse(true, "email template fetched", { data: { templates } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function createEmailTemplate(req: AuthenticatedRequest<{}, {}, EmailSchemaType>, res: Response) {
  try {
    const logedInUser = req?.user!

    const template = await EmailTemplateModel.create({ user: logedInUser.userId, ...req.body })

    res.status(200).json(createResponse(true, "Template created", { data: { templateId: template.id } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function updateEmailTemplate(req: AuthenticatedRequest<{ id: string }, {}, EmailSchemaType>, res: Response) {
  try {
    const templateId = req.params.id
    const { userId } = req?.user!

    const template = await EmailTemplateModel.findOneAndUpdate({ _id: templateId, user: userId }, req.body, { new: true })

    if (!template) {
      res.status(400).json(createResponse(false, "Template not found"))
      return
    }

    res.status(200).json(createResponse(true, "Template updated", { data: { templateId: template.id } }))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}

export async function deleteEmailTemplate(req: AuthenticatedRequest<{ id: string }, {}, EmailSchemaType>, res: Response) {
  try {
    const { userId } = req?.user!
    const templateId = req.params.id

    await EmailTemplateModel.deleteOne({ _id: templateId, user: userId })

    res.status(200).json(createResponse(true, "Template deleted successfully"))
  } catch (e: any) {
    res.status(400).json(createResponse(false, e?.message))
  }
}
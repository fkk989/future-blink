import { z } from "zod";


export const NodeBodySchema = z.object({
  leadsList: z.array(z.string()).min(1, { message: "Please attach a lead list to create a sequence" }),
  scheduledAt: z.preprocess((val) => new Date(val as string), z.date()),
  nodes: z.array(z.object({
    type: z.enum(["EMAIL", "DELAY"]),
    emailTemplate: z.string().optional(),
    delayTimeInMilleseconds: z.number().optional(),
  }), { required_error: "required: { type: EMAIL | DELAY, order: number , emailTemplate: string, delayInMinutes:number }" })
})

export const SequenceBodySchema = z.object({
  name: z.string({ required_error: "name is required" }),
});


export type SequenceType = z.infer<typeof SequenceBodySchema>
export type NodeBodyType = z.infer<typeof NodeBodySchema>
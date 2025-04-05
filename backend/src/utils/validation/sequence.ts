import { z } from "zod";


export const NodeBodySchema = z.object({
  nodes: z.array(z.object({
    type: z.enum(["EMAIL", "DELAY"]),
    order: z.number(),
    emailTemplate: z.string().optional(),
    delayInMinutes: z.number().optional(),
  }), { required_error: "required: { type: EMAIL | DELAY, order: number , emailTemplate: string, delayInMinutes:number }" })
})

export const SequenceBodySchema = z.object({
  name: z.string({ required_error: "name is required" }),
});


export type SequenceType = z.infer<typeof SequenceBodySchema>
export type NodeBodyType = z.infer<typeof NodeBodySchema>
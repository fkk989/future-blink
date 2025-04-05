import { z } from "zod";

export const leadInputSchema = z.object({
  name: z.string({ required_error: "name is required" }).min(1),
});
export const listInputSchema = z.object({
  data: z.array(
    z.record(z.string()),
    { required_error: "lead data is required" },// Each map has string keys and string values
  ),
});



export type LeadType = z.infer<typeof leadInputSchema>
export type ListType = z.infer<typeof listInputSchema>
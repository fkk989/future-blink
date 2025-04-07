import { createResponse } from "../../utils/helpers";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {

        const fieldsErrors = result.error.flatten().fieldErrors
        const fieldNameWithError = Object.keys(fieldsErrors) || []

        // A custom error object which we will create form the zod error object
        const errors: { [key: string]: string } = {}

        fieldNameWithError.forEach((fieldName) => {
          errors[fieldName] = fieldsErrors[fieldName] && fieldsErrors[fieldName][0] || ""
        })

        res.status(400).json(createResponse(false, "Invalid Input", { errors }));
        return;
      }
      next();
    } catch (e: any) {
      res.status(400).json(createResponse(false, `${e?.message}`));
    }
  };

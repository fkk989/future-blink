import { Router } from "express";
import { validate } from "../middleware/validate";
import { verifyUserMiddleware } from "../middleware/verifyUser";
import { leadInputSchema, listInputSchema } from "@/utils/validation/list";
import { createLeadList, deleteList, getList, updateListData } from "../controllers/listController";

export const leadListRouter = Router()

leadListRouter.get("/", verifyUserMiddleware(["USER"]), getList)

// create List 
leadListRouter.post("/", verifyUserMiddleware(["USER"]), validate(leadInputSchema), createLeadList)
// create or upate list data
leadListRouter.post("/:id", verifyUserMiddleware(["USER"]), validate(listInputSchema), updateListData)

//
leadListRouter.delete("/:id", verifyUserMiddleware(["USER"]), deleteList)
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadListRouter = void 0;
const express_1 = require("express");
const validate_1 = require("../middleware/validate");
const verifyUser_1 = require("../middleware/verifyUser");
const list_1 = require("../../utils/validation/list");
const listController_1 = require("../controllers/listController");
exports.leadListRouter = (0, express_1.Router)();
exports.leadListRouter.get("/", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), listController_1.getList);
exports.leadListRouter.get("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), listController_1.getListById);
// create List 
exports.leadListRouter.post("/", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), (0, validate_1.validate)(list_1.leadInputSchema), listController_1.createLeadList);
// create or upate list data
exports.leadListRouter.post("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), (0, validate_1.validate)(list_1.listInputSchema), listController_1.updateListData);
//
exports.leadListRouter.delete("/:id", (0, verifyUser_1.verifyUserMiddleware)(["USER"]), listController_1.deleteList);

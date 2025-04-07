"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const helpers_1 = require("../../utils/helpers");
const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const fieldsErrors = result.error.flatten().fieldErrors;
            const fieldNameWithError = Object.keys(fieldsErrors) || [];
            // A custom error object which we will create form the zod error object
            const errors = {};
            fieldNameWithError.forEach((fieldName) => {
                errors[fieldName] = fieldsErrors[fieldName] && fieldsErrors[fieldName][0] || "";
            });
            res.status(400).json((0, helpers_1.createResponse)(false, "Invalid Input", { errors }));
            return;
        }
        next();
    }
    catch (e) {
        res.status(400).json((0, helpers_1.createResponse)(false, `${e === null || e === void 0 ? void 0 : e.message}`));
    }
};
exports.validate = validate;

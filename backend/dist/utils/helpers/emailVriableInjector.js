"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectVariables = injectVariables;
function injectVariables({ body, values, }) {
    let finalBody = body;
    for (const [key, value] of Object.entries(values)) {
        const placeholderRegex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        finalBody = finalBody.replace(placeholderRegex, value);
    }
    return finalBody;
}

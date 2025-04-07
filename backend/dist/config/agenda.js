"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agenda = void 0;
const agenda_1 = require("agenda");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoConnectionString = process.env.DATABASE_URL;
exports.agenda = new agenda_1.Agenda({
    db: { address: mongoConnectionString, collection: "agenda-jobs" },
    processEvery: "1 minute",
    defaultConcurrency: 5,
    defaultLockLifetime: 10000,
});

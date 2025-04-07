"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRedisClient = createRedisClient;
const ioredis_1 = require("ioredis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const host = process.env.REDIS_HOST;
const port = parseInt(process.env.REDIS_PORT);
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;
function createRedisClient() {
    const options = {
        host,
        port,
        username,
    };
    if (password) {
        options.password = password;
    }
    return new ioredis_1.Redis(options);
}

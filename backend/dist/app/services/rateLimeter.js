"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.RateLimiter = void 0;
const redis_1 = require("../../config/redis");
class RateLimiter {
    constructor() {
        this.client = (0, redis_1.createRedisClient)();
    }
    getKey(email, prefix) {
        return `${prefix}:${email}`;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RateLimiter();
        }
        return this.instance;
    }
    isRateLimited(email, prefix, maxLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.getKey(email, prefix);
            const count = yield this.client.get(key);
            if (!count) {
                return {
                    limiteExceded: false, expiresIn: {
                        minutes: 0,
                        seconds: 0
                    }
                };
            }
            const countNumber = parseInt(count, 10);
            const ttl = yield this.client.ttl(key);
            const expiresIn = {
                minutes: Math.floor(ttl / 60), // 5
                seconds: ttl % 60 // 50
            };
            return {
                limiteExceded: countNumber >= maxLimit,
                expiresIn
            };
        });
    }
    increment(email, prefix, expiersInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.getKey(email, prefix);
            const exists = yield this.client.exists(key);
            const count = yield this.client.incr(key);
            if (!exists) {
                yield this.client.expire(key, expiersInSeconds);
            }
            return count;
        });
    }
    removeRateLimit(email, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = this.getKey(email, prefix);
            yield this.client.del(key);
        });
    }
}
exports.RateLimiter = RateLimiter;
exports.rateLimiter = RateLimiter.getInstance();

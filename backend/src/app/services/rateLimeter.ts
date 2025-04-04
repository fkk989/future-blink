import { createRedisClient } from "@/config/redis";
import { Redis } from "ioredis";
import { RateLimitPrefix } from "@/utils/types"

export class RateLimiter {
    private client: Redis;
    private static instance: RateLimiter | null;
    private constructor() {
        this.client = createRedisClient();
    }

    private getKey(email: string, prefix: RateLimitPrefix) {
        return `${prefix}:${email}`;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RateLimiter()
        }
        return this.instance
    }

    async isRateLimited(
        email: string,
        prefix: RateLimitPrefix,
        maxLimit: number
    ) {
        const key = this.getKey(email, prefix);
        const count = await this.client.get(key);

        if (!count) {
            return {
                limiteExceded: false, expiresIn: {
                    minutes: 0,
                    seconds: 0
                }
            };
        }

        const countNumber = parseInt(count, 10);
        const ttl = await this.client.ttl(key);

        const expiresIn = {
            minutes: Math.floor(ttl / 60), // 5
            seconds: ttl % 60              // 50
        };

        return {
            limiteExceded: countNumber >= maxLimit,
            expiresIn
        };
    }


    async increment(email: string, prefix: RateLimitPrefix, expiersInSeconds: number): Promise<number> {
        const key = this.getKey(email, prefix);
        const exists = await this.client.exists(key);

        const count = await this.client.incr(key);
        if (!exists) {
            await this.client.expire(key, expiersInSeconds);
        }

        return count;
    }

    async removeRateLimit(email: string, prefix: RateLimitPrefix): Promise<void> {
        const key = this.getKey(email, prefix);
        await this.client.del(key);
    }
}


export const rateLimiter = RateLimiter.getInstance()
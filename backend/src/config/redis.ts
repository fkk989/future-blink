import { Redis, RedisOptions } from "ioredis";

const host = process.env.REDIS_HOST;
const port = parseInt(process.env.REDIS_PORT);
const username = process.env.REDIS_USERNAME;
const password = process.env.REDIS_PASSWORD;



export function createRedisClient() {
    const options: RedisOptions = {
        host,
        port,
        username,
    };

    if (password) {
        options.password = password;
    }


    return new Redis(options);
}




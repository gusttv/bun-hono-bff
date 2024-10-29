import Redis from "ioredis";
import { env } from "../types/env";

const redis = new Redis({
	host: env.REDIS_HOST, // substitua pelo seu host Redis
	port: env.REDIS_PORT, // substitua pela porta do seu Redis
	password: env.REDIS_PASSWORD,
});

export default redis;

import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number(),
	JWT_SECRET: z.string(),
	REDIS_HOST: z.string(),
	REDIS_PORT: z.coerce.number(),
	REDIS_PASSWORD: z.string(),
	USER_SERVICE_URL: z.string().url(),
	ORDER_SERVICE_URL: z.string().url(),
});

const env = envSchema.parse(Bun.env);

export { env };

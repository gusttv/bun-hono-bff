import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { env } from "../types/env";

export const authMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header("Authorization");
	if (!authHeader)
		return c.json({ error: "Authorization header is required" }, 401);
	const token = authHeader.split(" ")[1];

	try {
		const decoded = await verify(token, env.JWT_SECRET);

		c.set("userId", decoded.userId);
		c.set("token", token);
		await next();
	} catch (error) {
		return c.json({ error: "Invalid token" }, 401);
	}
};

import type { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const jwtMiddleware = async (c: Context, next: Next) => {
	const authHeader = c.req.header("Authorization");
	const token = authHeader?.replace("Bearer ", "");

	if (!token) {
		return c.json({ message: "Token is required" }, 401);
	}

	try {
		const decoded = await verify(token, c.env.JWT_SECRET);
		c.set("user", decoded);
		await next();
	} catch (err) {
		return c.json({ message: `Invalid or expired token: ${err}` }, 401);
	}
};

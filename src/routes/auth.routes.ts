import type { Hono, Context } from "hono";

import { registerHandler } from "../controller/auth.controller";

const authRoutes = (app: Hono) => {
	app.get("/ping", (c: Context) => {
		return c.json({ message: "Pong!" });
	});
	app.post("/auth/register", registerHandler);
};

export default authRoutes;

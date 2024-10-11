import type { Hono, Context } from "hono";
import {
	loginHandler,
	registerHandler,
	getUserProfileHandler,
} from "../controller/auth.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const authRoutes = (app: Hono) => {
	app.get("/ping", (c: Context) => {
		return c.json({ message: "Pong!" });
	});

	app.post("/auth/login", loginHandler);
	app.post("/auth/register", registerHandler);
	app.get("/user/profile", jwtMiddleware, getUserProfileHandler);
};

export default authRoutes;

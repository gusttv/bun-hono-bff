// src/controllers/authController.ts
import type { Context } from "hono";
import { login, register } from "../service/auth.service";

export const loginHandler = async (c: Context) => {
	const { email, password } = await c.req.json();

	try {
		const data = await login(email, password);
		return c.json(data);
	} catch (err) {
		return c.json({ message: err }, 401);
	}
};

export const registerHandler = async (c: Context) => {
	const { name, email, password } = await c.req.json();
	try {
		const data = await register(name, email, password);
		return c.json(data);
	} catch (err) {
		return c.json({ message: err }, 400);
	}
};

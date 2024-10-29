import { fetch } from "bun";
import { env } from "../types/env";

export class UserService {
	async registerUser(name: string, email: string, password: string) {
		const response = await fetch(`${env.USER_SERVICE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password }),
		});
		return await response.json();
	}

	async loginUser(email: string, password: string) {
		const response = await fetch(`${env.USER_SERVICE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		return await response.json();
	}

	async getUserById(userId: string, token: string) {
		console.log(`token :${token}`);
		console.log(userId);

		const response = await fetch(`${env.USER_SERVICE_URL}/users/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 404) {
			return null;
		}
		return await response.json();
	}
}

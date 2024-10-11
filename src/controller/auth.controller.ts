// src/controllers/authController.ts
import type { Context } from "hono";
import {
	login,
	register,
	getUserProfile,
} from "../service/auth.service";

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

export const getUserProfileHandler = async (c: Context) => {
	try {
		const user = c.get("user"); // Obtém o usuário decodificado pelo middleware de autenticação
		const token = c.req
			.header("Authorization")
			?.replace("Bearer ", ""); // Obtém o token do cabeçalho

		if (!user || !token) {
			return c.json({ message: "User not authenticated" }, 401); // Garante que o usuário e token estão presentes
		}

		const userId = c.req.param("id"); // Obtém o ID do usuário dos parâmetros da URL

		// Verifica se o ID da rota corresponde ao ID do usuário autenticado
		if (userId !== user.id) {
			return c.json({ message: "Unauthorized access" }, 403); // Erro 403 se o usuário tentar acessar outro perfil
		}

		// Chama o service passando o userId e o token
		const userProfile = await getUserProfile(userId, token); // O serviço recebe o userId e o token

		return c.json(userProfile); // Retorna o perfil do usuário em formato JSON
	} catch (err) {
		return c.json(
			{
				message:
					err instanceof Error ? err.message : "An error occurred",
			},
			400,
		); // Tratamento de erros
	}
};

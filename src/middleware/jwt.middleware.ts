import type { Context, Next } from "hono";
import { verify } from "hono/jwt";

// Função auxiliar para extrair o token do cabeçalho Authorization
const extractToken = (authHeader?: string): string | null => {
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}
	return authHeader.replace("Bearer ", "");
};

export const jwtMiddleware = async (c: Context, next: Next) => {
	const token = extractToken(c.req.header("Authorization"));

	if (!token) {
		return c.json({ message: "Token is required" }, 401);
	}

	try {
		const decoded = await verify(token, c.env.JWT_SECRET);
		c.set("user", decoded); // Define o usuário decodificado no contexto
		await next(); // Prossegue para o próximo middleware/handler
	} catch (err) {
		return c.json(
			{
				message:
					err instanceof Error ? err.message : "An error occurred",
			},
			400,
		); 
	}
};

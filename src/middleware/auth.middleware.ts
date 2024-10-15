import type { Context, Next } from 'hono';
import { verify } from 'hono/jwt'

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Authorization header is required' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, 'secret'); // Substituir 'secret-key' pela chave secreta correta
    c.set('userId', decoded);
    await next();
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401);
  }
};

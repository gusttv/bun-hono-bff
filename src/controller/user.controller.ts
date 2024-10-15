import type { Context } from 'hono';
import { UserService } from '../service/user.service';

const userService = new UserService();

export const registerUser = async (c: Context) => {
  const { name, email, password } = await c.req.json();
  const newUser = await userService.registerUser(name, email, password);
  return c.json(newUser, 201);
};

export const loginUser = async (c: Context) => {
  const { email, password } = c.req.query();
  const loginData = await userService.loginUser(email, password);
  return c.json(loginData);
};



import { Hono } from "hono";
import { registerUser, loginUser } from "../controller/user.controller";

const userRoutes = new Hono();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

export { userRoutes };

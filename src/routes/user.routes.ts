import { Hono } from "hono";
import { registerUser, loginUser } from "../controller/user.controller";
import { getUserProfile } from "../controller/profile.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRoutes = new Hono();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", authMiddleware, getUserProfile);

export { userRoutes };

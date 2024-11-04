import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUserProfile } from "../controller/profile.controller";

const profileRoutes = new Hono();

profileRoutes.get("/", authMiddleware, getUserProfile);

export { profileRoutes };

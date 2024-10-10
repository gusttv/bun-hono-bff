import { Hono } from "hono";
import authRoutes from "./routes/auth.routes";

const app = new Hono();

authRoutes(app);

export default app;

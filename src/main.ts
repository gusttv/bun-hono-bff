import { Hono } from "hono";
import { userRoutes } from "./routes/user.routes";
import { orderRoutes } from "./routes/order.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";

const app = new Hono();

app.use(logger());

app.get("/ui", swaggerUI({ url: "/doc" }))
app.route("/api/users", userRoutes);
app.route("/api/orders", orderRoutes);

app.get("/teste", authMiddleware, (c) => c.json("autorizado"));

export default app;

import { Hono } from "hono";
import { userRoutes } from "./routes/user.routes";
import { orderRoutes } from "./routes/order.routes";
import { logger } from "hono/logger";
import { swaggerUI } from "@hono/swagger-ui";
import { profileRoutes } from "./routes/profile.routes";

const app = new Hono();

app.use(logger());
app.get("/ui", swaggerUI({ url: "/doc" }));

app.route("/api/users", userRoutes);
app.route("/api/orders", orderRoutes);
app.route("/api/profile", profileRoutes);

export default app;

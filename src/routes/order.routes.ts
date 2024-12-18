import { Context, Hono } from "hono";
import {
	createOrder,
	listOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
} from "../controller/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const orderRoutes = new Hono();

orderRoutes.use("*", authMiddleware);

orderRoutes.post("/", createOrder);
orderRoutes.get("/", listOrders);
orderRoutes.get("/:id", getOrderById);
orderRoutes.patch("/:id", updateOrder);
orderRoutes.delete("/:id", deleteOrder);

export { orderRoutes };

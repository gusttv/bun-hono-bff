import type { Context } from "hono";
import { OrderService } from "../service/order.service";
import type { UpdateOrderData } from "../types/types";

const orderService = new OrderService();

export const createOrder = async (c: Context) => {
	// OK
	const userId: string = c.get("userId");
	const { product, quantity, price } = await c.req.json();
	const newOrder = await orderService.createOrder(userId, product, quantity, price);
	return c.json(newOrder, 201);
};

export const listOrders = async (c: Context) => {
	const userId = c.get("userId");
	const orders = await orderService.listOrders();
	return c.json(orders);
};

export const getOrderById = async (c: Context) => {
	const orderId = c.req.param("id");
	const order = await orderService.getOrderById(orderId);
	return c.json(order);
};

export const updateOrder = async (c: Context) => {
	try {
		const orderId = c.req.param("id");
		const statusQuery = String(c.req.query("status") || "");
		const updatedData: UpdateOrderData = await c.req.json();
		const updatedOrder = await orderService.updateOrder(
			orderId,
			updatedData,
			statusQuery,
		);
		return c.json(updatedOrder);
	} catch (e) {
		return c.json({ error: "failed to update order" }, 500);
	}
};

export const deleteOrder = async (c: Context) => {
	const orderId = c.req.param("id");
	await orderService.deleteOrder(orderId);
	return c.json({ message: "Order deleted successfully" }, 204);
};

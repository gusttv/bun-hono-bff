import { fetch } from "bun";
import type { Order, UpdateOrderData } from "../types/types";
import { env } from "../types/env";
import redis from "../db/redis";

export class OrderService {
	async createOrder(
		userId: string,
		product: string,
		quantity: number,
		price: number,
	): Promise<Order> {
		try {
			const response = await fetch(`${env.ORDER_SERVICE_URL}/orders`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId, product, quantity, price }),
			});
			if (!response.ok) {
				throw new Error(`Failed to create order: ${response.statusText}`);
			}
			const order = (await response.json()) as Order;
			// Limpar cache relevante
			await redis.del("orders_list");
			await redis.del(`order_${order.id}`);
			return order;
		} catch (error) {
			console.error(`Error: ${error}`);
			throw new Error("Order Creation failed");
		}
	}

	async listOrders(): Promise<Order[]> {
		try {
			const cachedOrders = await redis.get("orders_list");
			if (cachedOrders) return JSON.parse(cachedOrders) as Order[];

			const response = await fetch(`${env.ORDER_SERVICE_URL}/orders`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				throw new Error(`Failed to list orders: ${response.statusText}`);
			}
			const orders = (await response.json()) as Order[];
			await redis.set("orders_list", JSON.stringify(orders), "EX", 3600);
			return orders;
		} catch (error) {
			console.error(`Error listing orders: ${error}`);
			throw new Error("Failed to retrieve orders");
		}
	}

	async getOrderById(orderId: string): Promise<Order> {
		try {
			const response = await fetch(`${env.ORDER_SERVICE_URL}/orders/${orderId}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			if (!response.ok) {
				if (response.status === 404) throw new Error("Order Not found");
				throw new Error(`Failed to get order: ${response.statusText}`);
			}

			return (await response.json()) as Order;
		} catch (error) {
			console.error(`Error getting order ${error}`);
			throw new Error("Failed to get order");
		}
	}

	// TODO: adicionar try catch e testar
	async updateOrder(
		orderId: string,
		updatedData: UpdateOrderData,
		status: string,
	): Promise<Order> {
		const response = await fetch(
			`
			${env.ORDER_SERVICE_URL}/orders/${orderId}/status?status=${status}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedData),
			},
		);
		return (await response.json()) as Order;
	}

	// TODO: adicionar try catch e testar
	async deleteOrder(orderId: string): Promise<void> {
		await fetch(`${env.ORDER_SERVICE_URL}/orders/${orderId}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});
	}
}

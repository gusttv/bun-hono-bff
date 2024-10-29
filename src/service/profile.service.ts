import type { OrderService } from "./order.service";
import type { UserService } from "./user.service";
import redis from "../db/redis";

export class ProfileService {
	private userService: UserService;
	private orderService: OrderService;

	constructor(userService: UserService, orderService: OrderService) {
		this.userService = userService;
		this.orderService = orderService;
	}

	public async getUserProfile(userId: string, token: string) {
		const cacheKey = `profile_${userId}`;
		const cachedProfile = await redis.get(cacheKey);
		if (cachedProfile) return JSON.parse(cachedProfile);

		const user = await this.userService.getUserById(userId, token);
		if (!user) return null;

		const orders = await this.orderService.listOrders();

		const response = {
			usuario: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			orders: orders.map((order) => ({
				id: order.id,
				product: order.product,
				quantity: order.quantity,
				price: order.price,
				orderDate: order.orderDate,
				status: order.orderStatus,
			})),
		};

		await redis.set(cacheKey, JSON.stringify(response), "EX", 3600);
		return response;
	}
}

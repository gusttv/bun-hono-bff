import type { Context } from "hono";
import { ProfileService } from "../service/profile.service";
import { UserService } from "../service/user.service";
import { OrderService } from "../service/order.service";

const userService = new UserService();
const orderService = new OrderService();
const profileService = new ProfileService(userService, orderService);

export const getUserProfile = async (c: Context) => {
	const userId = c.get("userId");
	const token = c.get("token");

	const response = await profileService.getUserProfile(userId, token);
	if (!response) return c.json({ error: "user not found" }, 404);

	return c.json(response);
};

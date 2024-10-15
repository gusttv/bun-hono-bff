import type { Context } from 'hono';
import { UserService } from '../service/user.service';
import { OrderService } from '../service/order.service';

const userService = new UserService();
const orderService = new OrderService();

export const getUserProfile = async (c: Context) => {
  const userId = c.get('userId'); // Obtém o userId do contexto, inserido pelo middleware de autenticação

  // Busca os dados do usuário no microserviço de usuários
  const user = await userService.getUserById(userId);
  if (!user) {
    return c.json({ error: 'User not found' }, 404);
  }

  // Busca os pedidos do usuário no microserviço de pedidos
  const orders = await orderService.listOrders(userId);

  // Formata a resposta
  const response = {
    usuario: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    orders: orders.map(order => ({
      id: order.id,
      product: order.product,
      quantity: order.quantity,
      price: order.price,
      orderDate: order.orderDate,
      status: order.orderStatus,
    })),
  };

  // Envia a resposta formatada
  return c.json(response);
};

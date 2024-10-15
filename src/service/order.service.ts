import { fetch } from 'bun';
import type { Order, UpdateOrderData } from '../types/types';

export class OrderService {
  async createOrder(userId: string, product: string, quantity: number, price: number): Promise<Order> {
    const response = await fetch('http://orders-microservice/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userId}` },
      body: JSON.stringify({ userId, product, quantity, price }),
    });
    return await response.json() as Order;
  }

  async listOrders(userId: string): Promise<Order[]> {
    const response = await fetch('http://orders-microservice/api/v1/orders', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${userId}` },
    });
    return await response.json() as Order[];
  }

  async getOrderById(userId: string, orderId: string): Promise<Order> {
    const response = await fetch(`http://orders-microservice/api/v1/orders/${orderId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${userId}` },
    });
    return await response.json() as Order;
  }

  async updateOrder(userId: string, orderId: string, updatedData: UpdateOrderData): Promise<Order> {
    const response = await fetch(`http://orders-microservice/api/v1/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userId}` },
      body: JSON.stringify(updatedData),
    });
    return await response.json() as Order;
  }

  async deleteOrder(userId: string, orderId: string): Promise<void> {
    await fetch(`http://orders-microservice/api/v1/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${userId}` },
    });
  }
}

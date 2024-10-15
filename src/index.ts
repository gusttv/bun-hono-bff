import { Hono } from 'hono';
import { userRoutes } from './routes/user.routes';
import { orderRoutes } from './routes/order.routes';

const app = new Hono();

// Configuração das rotas
app.route('/api/v1/users', userRoutes);
app.route('/api/v1/orders', orderRoutes);

export default app;

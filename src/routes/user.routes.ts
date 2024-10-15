import { Hono } from 'hono';
import { registerUser, loginUser } from '../controller/user.controller';
import { getUserProfile } from '../controller/profile.controller';

const userRoutes = new Hono();

userRoutes.post('/register', registerUser);
userRoutes.get('/auth/login', loginUser);
userRoutes.get('/profile', getUserProfile)

export { userRoutes };

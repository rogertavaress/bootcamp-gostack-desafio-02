import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

import authMiddleware from './app/middlewares/auth';

routes.get('/teste', (req, res) => {
    return res.json({ message: 'App Gympoint' });
});

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

export default routes;

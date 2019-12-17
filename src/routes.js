import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

import authMiddleware from './app/middlewares/auth';

routes.get('/teste', (req, res) => {
    return res.json({ message: 'App Gympoint' });
});

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.post('/students', authMiddleware, StudentController.store);

export default routes;

import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';
import checkStudentExists from './app/middlewares/checkStudentExists';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:id', checkStudentExists, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', checkStudentExists, StudentController.update);
routes.delete('/students/:id', checkStudentExists, StudentController.delete);

export default routes;
